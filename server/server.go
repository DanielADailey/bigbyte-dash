package server

import (
	"net/http"
	"sync"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

type RestServer struct {
	sub           *chi.Mux
	mutex         *sync.Mutex
	tokenList     map[string]*TokenPacket
	lastCleanTime time.Time
}

const (
	AuthEndpoint     = "/auth"
	UsersEndpoint    = "/user"
	RegisterEndpoint = "/register"
	AdminEndpoint    = "/admin"
	TasksEndpoint    = "/tasks"
	GamesEndpoint    = "/games"
	LoginEndpoint    = "/login"
)

var rs = &RestServer{}

func Init() *RestServer {
	return rs
}

func (rs *RestServer) getMux() *chi.Mux {
	if rs.sub != nil {
		return rs.sub
	}
	return nil
}

func (rs *RestServer) group(base string, middleware func(next http.Handler) http.Handler, route func(r chi.Router)) {
	rs.getMux().Group(func(r chi.Router) {
		var sub chi.Router
		if base == "" {
			sub = r
		} else {
			sub = chi.NewRouter()
			r.Mount(base, sub)
		}
		if middleware != nil {
			sub.Use(middleware)
		}
		route(sub)
	})
}

func (rs *RestServer) Public(base string, route func(r chi.Router)) {
	rs.group(base, nil, route)
}

func (rs *RestServer) Token(base string, route func(r chi.Router)) {
	rs.group(base, rs.basicAuth, route)
}

// BasicAuth implements a simple middleware handler for adding basic http auth to a route.
func (rs *RestServer) basicAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if len(r.Cookies()) > 0 {
			token := r.Cookies()[0].Value
			if rs.tokenList[token].Valid {
				next.ServeHTTP(w, r)
				return
			}
		}
		w.Header().Set("WWW-Authenticate", `xBasic realm="restricted", charset="UTF-8"`)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
	})
}

func (rs *RestServer) Run() {
	rs.tokenList = make(map[string]*TokenPacket)
	rs.lastCleanTime = time.Now()
	rs.sub = chi.NewRouter()
	rs.sub.Use(middleware.Logger)
	rs.sub.Use()
	rs.sub.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))
	rs.sub.Get("/", rs.testEndpoint)
	rs.Token(AuthEndpoint, func(r chi.Router) {
		r.Get("/", rs.authUser)
	})
	rs.Public(UsersEndpoint, func(r chi.Router) {
		r.Post("/", rs.registerUser)
		r.Get("/{id}", rs.getUserById)
	})
	rs.Public(AdminEndpoint, func(r chi.Router) {
		r.Post("/{id}", rs.updateUser)
		r.Delete("/{id}", rs.deleteUser)
		r.Get("/", rs.getUsers)
	})
	rs.Public(GamesEndpoint, func(r chi.Router) {
		r.Get("/", rs.getGames)
		r.Get("/{id}", rs.getGameById)
		r.Post("/", rs.addGame)
	})
	rs.Public(LoginEndpoint, func(r chi.Router) {
		r.Post("/", rs.login)
	})
	rs.Token(TasksEndpoint, func(r chi.Router) {
		r.Get("/", rs.getTasks)
	})
	go rs.monitorTokens()
	http.ListenAndServe(":3001", rs.sub)
}

func (rs *RestServer) monitorTokens() {
	for {
		// rs.mutex.Lock()
		if len(rs.tokenList) > 0 {
			for _, t := range rs.tokenList {
				if time.Now().After(t.expires) {
					t.Valid = false
				}
			}
		}
		if time.Now().Local().Sub(rs.lastCleanTime) > 60*time.Minute {
			rs.lastCleanTime = time.Now()
			for uuid, t := range rs.tokenList {
				if !t.Valid {
					delete(rs.tokenList, uuid)
				}
			}
		}
		// rs.mutex.Unlock()
		time.Sleep(10 * time.Second)
	}
}
