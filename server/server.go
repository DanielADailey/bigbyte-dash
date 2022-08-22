package server

import (
	"net/http"
	"sync"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/jwtauth/v5"
	"gorm.io/gorm"
)

var tokenAuth *jwtauth.JWTAuth

type RestServer struct {
	sub   *chi.Mux
	mutex *sync.Mutex
	once  *sync.Once
	db    *gorm.DB
}

const (
	AuthEndpoint     = "/auth"
	UsersEndpoint    = "/user"
	RegisterEndpoint = "/register"
	AdminEndpoint    = "/admin"
)

var rs = &RestServer{}

func Init() *RestServer {
	// rs.once.Do(func() {

	// })

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
			sub.Use(jwtauth.Verifier(tokenAuth))
			sub.Use(middleware)
		}
		route(sub)
	})
}

func (rs *RestServer) Public(base string, route func(r chi.Router)) {
	rs.group(base, nil, route)
}

func (rs *RestServer) Token(base string, route func(r chi.Router)) {
	rs.group(base, jwtauth.Authenticator, route)
}

func (rs *RestServer) Run() {
	rs.sub = chi.NewRouter()
	rs.sub.Use(middleware.Logger)
	rs.sub.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))
	rs.sub.Get("/", rs.testEndpoint)
	rs.Public(AuthEndpoint, func(r chi.Router) {
		r.Get("/", rs.testEndpoint)
		r.Post("/", rs.authUser)
	})
	rs.Public(UsersEndpoint, func(r chi.Router) {
		r.Post("/", rs.registerUser)
	})
	rs.Token(AdminEndpoint, func(r chi.Router) {
		r.Post("/{id}", rs.updateUser)
		r.Delete("/{id}", rs.deleteUser)
		r.Get("/", rs.getUsers)
	})
	http.ListenAndServe(":3001", rs.sub)
}
