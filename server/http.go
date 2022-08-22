package server

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/ddailey/bigbyte-dash/db"
	"github.com/ddailey/bigbyte-dash/server/auth"
)

type AuthPacket struct {
	Username string `json:"uname"`
	Password string `json:"pword"`
}

type RegistrationPacket struct {
	Username  string `json:"uname"`
	Password  string `json:"pword"`
	FirstName string `json:"fname"`
	LastName  string `json:"lname"`
	Email     string `json:"email"`
	Age       string `json:"age"`
	Phone     string `json:"phone"`
}

func (rs *RestServer) authUser(w http.ResponseWriter, r *http.Request) {
	pkt := &AuthPacket{}
	if err := json.NewDecoder(r.Body).Decode(&pkt); err != nil {
		w.Write([]byte("Error decoding post body"))
		return
	}

	hash, err := rs.getDbUserHash(pkt.Username)
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
	if !auth.CheckPasswordHash(pkt.Password, hash) {
		w.Write([]byte("Hash check failure"))
		return
	}

	w.Write([]byte("OK"))
}

func (rs *RestServer) registerUser(w http.ResponseWriter, r *http.Request) {
	userRegistrationObject := &RegistrationPacket{}
	if err := json.NewDecoder(r.Body).Decode(&userRegistrationObject); err != nil {
		w.Write([]byte("Error decoding post body"))
		return
	}
	if rs.userExists(userRegistrationObject.Username) {
		w.Write([]byte("Username already exists!"))
		return
	}
	pwHash, err := auth.HashPassword(userRegistrationObject.Password)
	if err != nil {
		return
	}
	ageConv, err := strconv.Atoi(userRegistrationObject.Age)
	if err != nil {
		w.Write([]byte("Error converting age"))
		return
	}
	userDbTransform := &db.User{
		Username:        userRegistrationObject.Username,
		PasswordHash:    pwHash,
		FirstName:       userRegistrationObject.FirstName,
		LastName:        userRegistrationObject.LastName,
		Age:             ageConv,
		Email:           userRegistrationObject.Email,
		PhoneNumber:     userRegistrationObject.Phone,
		PermissionLevel: 0,
	}
	err = rs.addUser(userDbTransform)
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
	buf, err := json.Marshal(userDbTransform)
	if err != nil {
		w.Write([]byte("Nope"))
		return
	}
	w.Write(buf)
}

func (rs *RestServer) deleteUser(w http.ResponseWriter, r *http.Request) {

}

func (rs *RestServer) updateUser(w http.ResponseWriter, r *http.Request) {

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

func (rs *RestServer) testEndpoint(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("OK"))
}
