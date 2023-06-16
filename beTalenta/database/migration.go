package database

import (
	"fmt"
	"talenta/models"
	"talenta/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
	)
	if err != nil {
		fmt.Print(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
