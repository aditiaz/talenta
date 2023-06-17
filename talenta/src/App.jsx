import React, { useReducer, useState, useEffect } from "react";
import Form from "./forms";
import { INITIAL_STATE, reducer } from "./reducer";
import "./App.css";
import { useQuery } from "react-query";
import { API } from "./api/api";
import PieChart from "./PieChart";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { PDFTable } from "./PDFDownloader";

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

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

  const handleDownloadPDF = () => {
    const blob = new Blob([<PDFTable users={users} />], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.pdf";
    link.click();
  };

  return (
    <>
      <div className="flex justify-around mt-24">
        <div>
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
                <th className="border-2 border-white w-64">Nama Teman</th>
                <th className="border-2 border-white w-36">Jenis Kelamin</th>
                <th className="border-2 border-white w-28">Usia</th>
              </tr>
            </thead>
            <tbody className="max-h-10 overflow-y-scroll">
              {users ? (
                users.map((e) => {
                  return (
                    <tr key={e.name} className="text-white text-lg text-center">
                      <td className="border-2 border-white">{e.name}</td>
                      <td className="border-2 border-white">{e.gender}</td>
                      <td className="border-2 border-white">{e.age}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="text-white text-lg text-center">
                    Loading
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {state.modal && <Form modal={state.modal} />}

          {users && users.length > 0 && (
            <div className="flex justify-center mt-4">
              <PDFDownloadLink document={<PDFTable users={users} />} fileName="data.pdf">
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download PDF"
                }
              </PDFDownloadLink>
            </div>
          )}
        </div>
        <PieChart users={state.users} />
      </div>
      <PDFTable users={state.users} />
    </>
  );
}

export default App;
