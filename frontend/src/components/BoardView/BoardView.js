import React, { useEffect, useState } from "react";
import "./Boardview.css";
import { useLocation, useNavigate } from "react-router";
import TitleBar from "../Dashboard/TitleBar";
import "font-awesome/css/font-awesome.css";
import axios from "axios";

const BoardView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const board_id = location.state.board_id;
  const board_name = location.state.board_name;
  const [boardData, setBoardData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const statusList = ["To Do", "In Progress", "Done", "Cancelled"];
  let session = document.cookie.match(/user_name=([^;]*)/);
  useEffect(() => {
    async function fetchData() {
      if (session===null){
        console.log("hello")
        console.log(session)
        navigate("/");
      }
    }
    fetchData();
  },[]);
  let user_name=document.cookie.match(/user_name=([^;]*)/)[1];
  useEffect(() => {
    async function fetchData() {
      try {
        let session_key = document.cookie.match(/session_id=([^;]*)/);
        let res = await axios.post(
          `http://127.0.0.1:8000/${user_name}/${board_id}/board_details`,
          {
            session_key: session_key[1],
          }
        );
        if (!res.data.success) {
          alert(res.data.message);
          navigate("/");
        }
        setTaskData(res.data.data.task_list);
        setBoardData(res.data.data.board_list);
        setIsJoined(res.data.data.bool);
      } catch (e) {
        navigate("/");
      }
    }
    fetchData();
  });

  const TaskBoard = taskData.map((ele) => {
    let onClickStatusDropdown = async (task_id, task_status) => {
      try {
        let res = await axios.put(
          `http://127.0.0.1:8000/${user_name}/${board_id}/${task_id}/setstatus`,
          {
            task_status: task_status,
          }
        );
      } catch (e) {
        console.log(e);
      }
      return;
    };

    const status = statusList.map((status_str,index) => {
      return (
        <>
          <li className="btn-link" key= {index}>
            <button
              className="btn w-100 h-100 p-0"
              onClick={() => onClickStatusDropdown(ele.task_id, status_str)}
            >
              {status_str}
            </button>
          </li>
        </>
      );
    });

    const assignTask = async (task_id) => {
      if (!isJoined) {
        alert("Can't Assign. You Have not joined the Board !");
        return;
      }
      try {
        let res = await axios.put(
          `http://127.0.0.1:8000/${user_name}/${board_id}/${task_id}/assign`
        );
      } catch (e) {
        console.log(e);
      }
      return;
    };

    return (
      <tr className="p-0 m-0" key={ele.task_id}>
        <td className="table-cell tr-first-child">
          {ele.task_status === "To Do" ? (
            <div className="task-box w-100 position-relative">
              <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1 btn-group dropend">
                <button
                  key= {ele.task_id}
                  type="button"
                  className="btn dropdown-toggle p-0 ps-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul className="dropdown-menu">{status}</ul>
              </span>
              <h4>{ele.task_name}</h4>
              <p>{ele.task_desc}</p>
              <p className="time">Created at: {ele.time_stamp}</p>
              {ele.assigned_to !== "Not assigned" ? (
                <>
                  <i className="fa fa-check-circle disabled"></i>
                  <p>Assigned to : {ele.assigned_to}</p>
                </>
              ) : (
                <i
                  className="fa fa-plus-circle"
                  onClick={() => assignTask(ele.task_id)}
                ></i>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </td>

        <td className="table-cell tr-second-child">
          {ele.task_status === "In Progress" ? (
            <div className="task-box w-100 position-relative">
              <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1 btn-group dropend">
                <button
                  key= "2"
                  type="button"
                  className="btn dropdown-toggle p-0 ps-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul className="dropdown-menu">{status}</ul>
              </span>
              <h4>{ele.task_name}</h4>
              <p>{ele.task_desc}</p>
              <p className="time">Created at: {ele.time_stamp}</p>
              {ele.assigned_to !== "Not assigned" ? (
                <>
                  <i className="fa fa-check-circle disabled"></i>
                  <p>Assigned to : {ele.assigned_to}</p>
                </>
              ) : (
                <i
                  className="fa fa-plus-circle"
                  onClick={() => assignTask(ele.task_id)}
                ></i>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </td>

        <td className="table-cell tr-third-child">
          {ele.task_status === "Done" ? (
            <div className="task-box w-100 position-relative">
              <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1 btn-group dropend">
                <button 
                  key= "3"
                  type="button"
                  className="btn dropdown-toggle p-0 ps-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul className="dropdown-menu">{status}</ul>
              </span>
              <h4>{ele.task_name}</h4>
              <p>{ele.task_desc}</p>
              <p className="time">Created at: {ele.time_stamp}</p>
              {ele.assigned_to !== "Not assigned" ? (
                <>
                  <i className="fa fa-check-circle disabled"></i>
                  <p>Assigned to : {ele.assigned_to}</p>
                </>
              ) : (
                <i
                  className="fa fa-plus-circle"
                  onClick={() => assignTask(ele.task_id)}
                ></i>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </td>

        <td className="table-cell tr-fourth-child">
          {ele.task_status === "Cancelled" ? (
            <div className="task-box w-100 position-relative">
              <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1 btn-group dropend">
                <button
                key= "4"
                  type="button"
                  className="btn dropdown-toggle p-0 ps-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul className="dropdown-menu">{status}</ul>
              </span>
              <h4>{ele.task_name}</h4>
              <p>{ele.task_desc}</p>
              <p className="time">Created at: {ele.time_stamp}</p>
              {ele.assigned_to !== "Not assigned" ? (
                <>
                  <i className="fa fa-check-circle disabled"></i>
                  <p>Assigned to : {ele.assigned_to}</p>
                </>
              ) : (
                <i
                  className="fa fa-plus-circle"
                  onClick={() => assignTask(ele.task_id)}
                ></i>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="board_view_outer">
      <div className="board_view">
        <TitleBar
          user_name={user_name}
          board_id={board_id}
          boardData={boardData}
        />

        <div className="board_view_body mx-5">
          <h4 className="mb-2 mt-3 text-center">{board_name}</h4>
          <div className="d-flex mt-4 justify-content-center">
            <div id="tasktable_div" className="center-block scroll-inner fix-width">
              <table
                className="table m-0 table-bordered table-striped"
                id="task-table"
              >
                <thead>
                  <tr className="m-0">
                    <th className="table-cell">To Do</th>
                    <th className="table-cell">In Progress</th>
                    <th className="table-cell">Done</th>
                    <th className="table-cell">Cancelled</th>
                  </tr>
                </thead>
                <tbody>{TaskBoard}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
