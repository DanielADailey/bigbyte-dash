package server

import (
	"net/http"
	"sync"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type RestServer struct {
	router chi.Router
	mutex *sync.Mutex
	once *sync.Once
}

var rs = &RestServer{}

func Init() *RestServer {
	rs.once.Do(func(){
		rs.router = chi.NewRouter()
	})
	return rs
}

func (r *RestServer) Run() {
	r.router.Use(middleware.Logger)
	r.router.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})
	http.ListenAndServe(":3000", r.router)
}
