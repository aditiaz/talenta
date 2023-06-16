package userdto

type UserResponse struct {
	Nama   string `json:"name"`
	Gender string `json:"gender"`
	Usia   string `json:"age"`
}
