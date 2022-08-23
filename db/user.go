package db

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model

	Username        string         `gorm:"column:username"`
	PasswordHash    string         `gorm:"column:password_hash"`
	Email           string         `gorm:"column:email"`
	FirstName       string         `gorm:"column:first_name"`
	LastName        string         `gorm:"column:last_name"`
	AvatarLocation  string         `gorm:"column:avatar_location"`
	PermissionLevel int            `gorm:"column:permission_level"`
	Age             int            `gorm:"column:age"`
	LikedGames      pq.StringArray `gorm:"column:assigned_tasks;type:string[]"`
}
