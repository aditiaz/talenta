import React, { useReducer, useState } from "react";
import { INITIAL_STATE, reducer } from "./reducer";
import { useMutation } from "react-query";
import { API } from "./api/api";
const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [formAdd, setFormAdd] = useState({
    name: "",
    gender: "",
    age: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormAdd({ ...formAdd, [name]: value });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", formAdd.name);
      formData.append("gender", formAdd.gender);
      formData.append("age", formAdd.age);

      const reponse = await API.post("/adduser", formData);
      alert("Sukses menambahkan teman");
      console.log("Sukses menambahkan teman", reponse);
      dispatch({ type: "MODAL_HIT" });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  });
  return (
    <div
      hidden={state.modal}
      className=" bg-[#468dd9] border border-white  absolute top-20 right-[40%]  rounded-lg w-[25rem] space-y-5 h-[27rem] "
    >
      <button onClick={() => dispatch({ type: "MODAL_HIT" })} className="text-white text-2xl ml-2">
        X
      </button>
      <div className="mt-10 space-y-11">
        <h2 className=" text-white text-center  text-4xl pt-3">Form Pengisian</h2>
        <form
          onSubmit={(e) => handleSubmit.mutate(e)}
          className="font-semibold mt-4 space-y-3  text-white"
          action=""
        >
          <div className="flex gap-2 justify-center w-full ">
            <label htmlFor="name">Nama Teman : </label>
            <input
              name="name"
              value={formAdd.name}
              onChange={handleChange}
              className="text-black"
              type="text"
            />
          </div>
          <div className="flex gap-20 justify-center w-full ">
            <label htmlFor="password">Usia : </label>
            <input
              name="age"
              value={formAdd.age}
              onChange={handleChange}
              className="text-black"
              type="text"
            />
          </div>
          <div className="flex gap-2 justify-center w-full">
            <label htmlFor="password">Jenis Kelamin : </label>
            <select
              onChange={handleChange}
              value={formAdd.gender}
              className="text-black"
              name="gender"
              id=""
            >
              <option value=" "> ------</option>
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            {/* <input
              className="text-black"
              name="gender"
              value={formAdd.gender}
              onChange={handleChange}
              type="text"
            /> */}
          </div>
          <div className="flex mt-10 text-white justify-center">
            <button type="submit" className="bg-blue-300 w-36 h-10 rounded-lg my-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
