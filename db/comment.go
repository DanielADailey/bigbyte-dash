package db

import "gorm.io/gorm"

type Comment struct {
	gorm.Model

	UserId      string `gorm:"column:user_id"`
	CommentText string `gorm:"column:comment_text"`
	Likes       int    `gorm:"column:likes"`
}
