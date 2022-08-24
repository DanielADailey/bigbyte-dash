package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/ddailey/bigbyte-dash/db"
	"github.com/ddailey/bigbyte-dash/server/auth"
	"github.com/google/uuid"
	"github.com/lib/pq"
)

func (rs *RestServer) authUser(w http.ResponseWriter, r *http.Request) {
	if r.Cookies()[0] != nil {
		if rs.tokenList[r.Cookies()[0].Value].Valid {
			buf, err := json.Marshal(rs.tokenList[r.Cookies()[0].Value])
			if err == nil {
				w.Write(buf)
				return
			}
			w.Write([]byte("No valid cookie"))
		}
	}
	w.Write([]byte("no cookies"))
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
		Username:             userRegistrationObject.Username,
		PasswordHash:         pwHash,
		FirstName:            userRegistrationObject.FirstName,
		LastName:             userRegistrationObject.LastName,
		Age:                  ageConv,
		Organization:         uuid.New().String(),
		OrganizationReadable: userRegistrationObject.Organization,
		Email:                userRegistrationObject.Email,
		LikedGames:           make(pq.StringArray, 0),
		PermissionLevel:      0,
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

func (rs *RestServer) login(w http.ResponseWriter, r *http.Request) {
	pkt := &AuthPacket{}
	if err := json.NewDecoder(r.Body).Decode(&pkt); err != nil {
		w.Write([]byte("Error decoding post body"))
		return
	}
	fmt.Println(pkt)
	hash, err := rs.getDbUserHash(pkt.Username)
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
	if !auth.CheckPasswordHash(pkt.Password, hash) {
		w.Write([]byte("Hash check failure"))
		return
	}

	user, err := rs.getDbUserByColumn("username", pkt.Username, false)
	if err == nil {
		tp := &TokenPacket{
			Token:   auth.GenTokenString(pkt.Username),
			ID:      int(user.ID),
			Valid:   true,
			expires: time.Now().Local().Add(time.Minute * 15),
		}
		rs.tokenList[tp.Token] = tp
		buf, err := json.Marshal(tp)
		if err == nil {
			w.WriteHeader(200)
			fmt.Println(tp)
			w.Write([]byte(buf))
		}
	}
}
