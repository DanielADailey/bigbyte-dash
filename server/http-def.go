package server

import "time"

type AuthPacket struct {
	Organization string `json:"org"`
	Username     string `json:"uname"`
	Password     string `json:"pword"`
}

type RegistrationPacket struct {
	Username     string `json:"uname"`
	Password     string `json:"pword"`
	FirstName    string `json:"fname"`
	LastName     string `json:"lname"`
	Email        string `json:"email"`
	Age          string `json:"age"`
	Organization string `json:"organization"`
}

type TaskPacket struct {
	Title           string   `json:"title"`
	TaskDescription string   `json:"task_description"`
	StartTime       int64    `json:"start_time"`
	EndTime         int64    `json:"end_time"`
	Status          int      `json:"status"`
	GroupId         string   `json:"group_id"`
	CreatedBy       int      `json:"created_by"`
	AssignedTo      int      `json:"assigned_to"`
	Comments        []string `json:"offsets"`
}

type TokenPacket struct {
	Token   string `json:"token"`
	ID      int    `json:"id"`
	Valid   bool   `json:"valid"`
	expires time.Time
}
