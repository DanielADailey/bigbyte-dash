package db

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model

	Username        string `gorm:"username"`
	PasswordHash    string `gorm:"password_hash"`
	Email           string `gorm:"email"`
	FirstName       string `gorm:"first_name"`
	LastName        string `gorm:"last_name"`
	PhoneNumber     string `gorm:"phone"`
	PermissionLevel int    `gorm:"permission_level"`
	Age             int    `gorm:"age"`
}
