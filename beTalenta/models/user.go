package models

type User struct {
	ID     int    `json:"id"`
	Nama   string `json:"name"`
	Gender string `json:"gender"`
	Usia   string `json:"age"`
}

func (User) TableName() string {
	return "users"
}
