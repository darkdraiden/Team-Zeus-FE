import React, { useState, useEffect } from "react";
import TitleBar from "./TitleBar";
import axios from "axios";
import "./dashboard.css";
import "font-awesome/css/font-awesome.css";
import dashboard_img from "../../imgs/home_bg.svg";
import { useLocation } from "react-router";

function Dashboard() {
  const location = useLocation();
  const user_name = location.state.user_name;
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get(
          `http://127.0.0.1:8000/${user_name}/dashboard`
        );
        setBoardData(res.data.data.boards);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  });

  const board = boardData.map((ele) => {
    return (
      <tr id="board-row" key={ele.board_id}>
        <td className="w-100 text-center d-block">
          <button className="btn w-100 h-100">{ele.board_name}</button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div id="dashboard">
        <TitleBar boardData={boardData} />

        <div id="dashboard-body" className="row mx-0 p-0">
          <div className="col-lg-5 d-flex justify-content-center align-items-center">
            <img src={dashboard_img} id="dashboard_img" alt="" srcset="" />
          </div>
          <div className="col-lg-7 d-flex justify-content-center align-items-center">
            <div className="col-lg-7 my-2">
              <h3 className="text-center mb-4">List of Existing Boards</h3>
              <table className="table table-borderless text-center">
                <tbody>{board}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
