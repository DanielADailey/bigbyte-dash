package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/ddailey/bigbyte-dash/db"
	"github.com/ddailey/bigbyte-dash/server/auth"
	"github.com/lib/pq"
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
}

type TaskPacket struct {
	Title           string   `json:"title"`
	TaskDescription string   `json:"task_description"`
	StartTime       int64    `json:"start_time"`
	EndTime         int64    `json:"end_time"`
	Status          int      `json:"status"`
	GroupId         string   `json:"group_id"`
	CreatedBy       string   `json:"created_by"`
	AssignedTo      string   `json:"assigned_to"`
	Comments        []string `json:"offsets"`
}
type GameAddPacket struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

func (rs *RestServer) authUser(w http.ResponseWriter, r *http.Request) {
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

	atCookie := auth.GenJWT(pkt.Username)
	if atCookie == nil {
		return
	}

	http.SetCookie(w, atCookie)
	w.WriteHeader(200)
	w.Write([]byte("OK, cookie?"))
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
		LikedGames:      make(pq.StringArray, 0),
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

func (rs *RestServer) addTask(w http.ResponseWriter, r *http.Request) {
	taskObject := &TaskPacket{}
	if err := json.NewDecoder(r.Body).Decode(&taskObject); err != nil {
		w.Write([]byte("Error decoding post body"))
		return
	}

}

func (rs *RestServer) deleteUser(w http.ResponseWriter, r *http.Request) {

}

func (rs *RestServer) updateUser(w http.ResponseWriter, r *http.Request) {

}

func (rs *RestServer) getGames(w http.ResponseWriter, r *http.Request) {
	games, err := rs.getDbGames()
	if err != nil {
		return
	}
	if games == nil {
		return
	}
	if len(games) == 0 {
		return
	}
	buf, err := json.Marshal(games)
	if err != nil {
		return
	}
	w.Write(buf)
}

func (rs *RestServer) addGame(w http.ResponseWriter, r *http.Request) {
	game := &GameAddPacket{}
	if err := json.NewDecoder(r.Body).Decode(&game); err != nil {
		w.Write([]byte("Error decoding post body"))
		return
	}
	g := &db.Game{
		Title:       game.Title,
		Description: game.Description,
		Tags:        make(pq.StringArray, 0),
	}
	rs.addDbGame(g)
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
