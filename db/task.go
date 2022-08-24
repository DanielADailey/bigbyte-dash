package db

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Task struct {
	gorm.Model

	Title           string         `gorm:"column:title"`
	TaskDescription string         `gorm:"column:task_description"`
	StartTime       int64          `gorm:"column:start_time"`
	EndTime         int64          `gorm:"column:end_time"`
	Status          int            `gorm:"column:status"`
	Priority        int            `gorm:"column:priority"`
	CreatedBy       int            `gorm:"column:created_by"`
	AssignedTo      int            `gorm:"column:assigned_to"`
	GroupId         string         `gorm:"column:group_id"`
	Comments        pq.StringArray `gorm:"column:comments;type:string[]"`
}
