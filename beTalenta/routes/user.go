package routes

import (
	"talenta/handlers"
	"talenta/mysql"
	"talenta/repositories"

	"github.com/gorilla/mux"
)

func UserRoutes(r *mux.Router) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	r.HandleFunc("/users", h.AllUsers).Methods("GET")
	r.HandleFunc("/adduser", h.AddUser).Methods("POST")
}
