package repositories

import (
	"talenta/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	AllUsers() ([]models.User, error)
	AddUser(user models.User) (models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) AllUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Find(&users).Error
	return users, err
}

func (r *repository) AddUser(user models.User) (models.User, error) {
	err := r.db.Create(&user).Error

	return user, err
}
