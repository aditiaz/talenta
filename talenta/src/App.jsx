import React, { useReducer, useState, useEffect } from "react";
import Form from "./forms";
import { INITIAL_STATE, reducer } from "./reducer";
import "./App.css";
import { useQuery } from "react-query";
import { API } from "./api/api";
import { Pie } from "react-chartjs-2";
import PieChart from "./PieChart";
// import PieChart from "./PieChart";

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  // console.log(typeof state.users);
  console.log(state.users);
  const toggleModal = () => {
    dispatch({ type: "MODAL_HIT" });
  };

  const { data: users } = useQuery("usersCache", async () => {
    try {
      const response = await API.get("users");
      const usersData = response.data.data;

      dispatch({ type: "SET_USERS", payload: usersData });

      return usersData;
    } catch (error) {
      console.log("Error fetching data:", error);
      throw error;
    }
  });

  return (
    <>
      <div className="flex justify-around mt-24">
        <div>
          {/* <p>{JSON.stringify(users)}</p> */}
          <div className="flex justify-center">
            <button
              onClick={toggleModal}
              className="bg-blue-300 w-full font-semibold text-lg text-white h-11 rounded-lg mb-1"
            >
              Tambah Biodata
            </button>
          </div>
          <table className="h-5 table-auto">
            <thead className="text-white text-lg">
              <tr>
                <th className="border-[2px] border-white w-64">Nama Teman</th>
                <th className="border-[2px] border-white w-36">Jenis Kelamin</th>
                <th className="border-[2px] border-white w-28">Usia</th>
              </tr>
            </thead>
            <tbody className="max-h-10 overflow-y-scroll">
              {users ? (
                users?.map((e) => {
                  return (
                    <tr key={e.name} className="text-white text-lg text-center">
                      <td className="border-[2px] border-white">{e.name}</td>
                      <td className="border-[2px] border-white">{e.gender}</td>
                      <td className="border-[2px] border-white">{e.age}</td>
                    </tr>
                  );
                })
              ) : (
                <p>Loading</p>
              )}
            </tbody>
          </table>

          {state.modal && <Form modal={state.modal} />}
        </div>
        <PieChart users={state.users} />
      </div>
    </>
  );
}

export default App;
