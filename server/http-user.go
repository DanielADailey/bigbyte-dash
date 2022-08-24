package server

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func (rs *RestServer) deleteUser(w http.ResponseWriter, r *http.Request) {

}

func (rs *RestServer) updateUser(w http.ResponseWriter, r *http.Request) {

}

func (rs RestServer) getUserById(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id != "" {
		user, err := rs.getDbUserByColumn("id", id, false)
		if err != nil {
			return
		}
		if user != nil {
			buf, err := json.Marshal(user)
			if err != nil {
				w.Write([]byte(err.Error()))
			}
			w.Write(buf)
		}
	}
}

func (rs *RestServer) getUsers(w http.ResponseWriter, r *http.Request) {
	users := rs.getDbUsers()
	buf, err := json.Marshal(users)
	if err != nil {
		w.Write([]byte("Nope"))
		return
	}
	w.Write(buf)
}
