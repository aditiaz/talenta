package userdto

type UserRequest struct {
	ID     int    `json:"id"`
	Nama   string `json:"name"`
	Gender string `json:"gender"`
	Usia   string `json:"age"`
}
