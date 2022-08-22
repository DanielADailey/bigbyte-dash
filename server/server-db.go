package server

import (
	"fmt"

	"github.com/ddailey/bigbyte-dash/db"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Db struct {
}

func (rs *RestServer) connect() (*gorm.DB, error) {
	dsn := "root:1234@tcp(127.0.0.1:3306)/bigbytedash?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return db, nil
}

func (rs *RestServer) addUser(user *db.User) error {
	db, err := rs.connect()
	if err != nil {
		fmt.Println("err connecting to db")
	}
	if err := db.Transaction(func(tx *gorm.DB) error {
		tx.Create(user)
		return tx.Error
	}); err != nil {
		return fmt.Errorf("transaction error")
	}
	return nil
}

func (rs *RestServer) getDbUsers() []*db.User {
	gdb, err := rs.connect()
	if err != nil {
		fmt.Println("err connecting to db")
	}
	var users []*db.User
	gdb.Find(&users)
	if len(users) == 0 {
		fmt.Println("no db users")
		return nil
	}
	return users
}

func (rs *RestServer) getDbUserByColumn(col, val string, delete bool) (*db.User, error) {
	gdb, err := rs.connect()
	if err != nil {
		fmt.Println("err connecting to db")
	}
	var user *db.User
	gdb.First(&user, fmt.Sprintf("%s = ?", col), val)
	if user.Username == "" {
		return nil, fmt.Errorf("not found")
	}
	if delete {
		gdb.Delete(&user)
		return nil, nil
	}
	return user, nil
}

func (rs *RestServer) userExists(uname string) bool {
	user, _ := rs.getDbUserByColumn("username", uname, false)
	return user != nil
}

func (rs *RestServer) getDbUserHash(uname string) (string, error) {
	user, err := rs.getDbUserByColumn("username", uname, false)
	if err != nil {
		return "", err
	}
	if user != nil {
		return user.PasswordHash, nil
	}
	return "", fmt.Errorf("no user found")
}

/*

unc GetSessionByColumn(columnName, columnValue string, delete bool) (*db.Session, error) {
	gdb, err := singlestore.DB()
	if err != nil {
		return nil, err
	}
	var session *db.Session
	gdb.First(&session, fmt.Sprintf("%s = ?", columnName), columnValue)
	if session.UUID == "" {
		return nil, fmt.Errorf("not found")
	}
	if delete {
		gdb.Delete(&session)
		return nil, nil
	}
	return session, nil
}

func (em *StreamMonitor) SavePayoutRecord(pr *db.Payout) error {
	pr.Offsets = pq.Int64Array(em.sessionWinOffsets)
	gdb, err := singlestore.DB()
	if err != nil {
		log.Info().Caller().Msg("Err getting db")
		return err
	}
	if err := gdb.Transaction(func(tx *gorm.DB) error {
		if pr.ID == 0 {
			tx.Create(pr)
		} else {
			tx.Save(pr)
		}
		return tx.Error
	}); err != nil {
		log.Info().Caller().Msg("Transaction error")
		return err
	}
	return nil
}

*/
