package db

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Game struct {
	gorm.Model

	Title       string         `gorm:"column:title"`
	CoverArt    string         `gorm:"column:cover_art"`
	ReleaseDate string         `gorm:"column:release_date"`
	Rating      int            `gorm:"column:rating"`
	Description string         `gorm:"column:description"`
	Tags        pq.StringArray `gorm:"column:title;type:string[]"`
}
