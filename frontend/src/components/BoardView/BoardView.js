import React, { useEffect, useState } from "react";
import "./Boardview.css";
import { useLocation, useNavigate } from "react-router";
import TitleBar from "../Dashboard/TitleBar";
import "font-awesome/css/font-awesome.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskShowModal from "./TaskShowModal";

const BoardView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const board_id = location.state.board_id;
  const board_name = location.state.board_name;
  const [boardData, setBoardData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [taskShow, setTaskShow] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [task_id_store,setTaskID]=useState("");
  const [task_name_store,setTaskName]=useState("");
  const [task_desc_store,setTaskDesc]=useState("");
  const [time_stamp_store,setTimeStamp]=useState("");
  const [assigned_to_store,setAssignedTo]=useState("");
  const [task_status_store,setTaskStatus]=useState("");
  const statusList = ["To Do", "In Progress", "Done", "Cancelled"];
  let session = document.cookie.match(/user_name=([^;]*)/);


  useEffect(() => {
    async function fetchData() {
      if (session === null) {
        navigate("/");
      }
    }
    fetchData();
  }, []);
  let user_name = document.cookie.match(/user_name=([^;]*)/)[1];
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
          toast.error(res.data.message);
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

    const status = statusList.map((status_str, index) => {
      return (
        <>
          <li className="btn-link" key={index}>
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
        toast.error("Can't Assign. You Have not joined the Board !");
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
    const handleShowTask =(task_id,task_name,task_desc,time_stamp,assigned_to,task_status)=> {
      setTaskID(task_id);
      setTaskName(task_name);
      setTaskDesc(task_desc);
      setTimeStamp(time_stamp);
      setAssignedTo(assigned_to);
      setTaskStatus(task_status);
      setTaskShow(true);
    };
    let taskHide = () => setTaskShow(false);

    return (
      <tr className="p-0 m-0" key={ele.task_id}>
        <td className="table-cell tr-first-child" key="1">
          {ele.task_status === "To Do" ? (
            <div className="task-box w-100 position-relative">
            <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1 btn-group dropend">
              <button
                key="1"
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
            <i
              className="fa fa-plus-circle"
              onClick={() => assignTask(ele.task_id)}
            ></i>
            <p>Assigned to : {ele.assigned_to}</p>
            <button type="button" className="btn circle-btn" onClick={(e)=>handleShowTask(ele.task_id,ele.task_name,ele.task_desc,ele.time_stamp,ele.assigned_to,ele.task_status)}>
              <i className="fa fa-circle"></i>
            </button>
            <TaskShowModal
              task_id={task_id_store}
              task_name={task_name_store}
              task_desc={task_desc_store}
              time_stamp={time_stamp_store}
              assigned_to={assigned_to_store}
              task_status={task_status_store}
              board_id={board_id}
              show={taskShow}
              onHide={taskHide}
              setupdated={setIsUpdated}
            ></TaskShowModal>
          </div>
          ) : (
            <div></div>
          )}
        </td>

        <td className="table-cell tr-second-child" key="2">
          {ele.task_status === "In Progress" ? (
            <div className="task-box w-100 position-relative">
            <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1 btn-group dropend">
              <button
                key="2"
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
            <i
              className="fa fa-plus-circle"
              onClick={() => assignTask(ele.task_id)}
            ></i>
            <p>Assigned to : {ele.assigned_to}</p>
            <button type="button" className="btn circle-btn" onClick={(e)=>handleShowTask(ele.task_id,ele.task_name,ele.task_desc,ele.time_stamp,ele.assigned_to,ele.task_status)}>
              <i className="fa fa-circle"></i>
            </button>
            <TaskShowModal
              task_id={task_id_store}
              task_name={task_name_store}
              task_desc={task_desc_store}
              time_stamp={time_stamp_store}
              assigned_to={assigned_to_store}
              task_status={task_status_store}
              board_id={board_id}
              show={taskShow}
              onHide={taskHide}
              setupdated={setIsUpdated}
            ></TaskShowModal>
          </div>
          ) : (
            <div></div>
          )}
        </td>

        <td className="table-cell tr-third-child" key="3">
          {ele.task_status === "Done" ? (
            <div className="task-box w-100 position-relative">
            <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1 btn-group dropend">
              <button
                key="3"
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
            <i
              className="fa fa-plus-circle"
              onClick={() => assignTask(ele.task_id)}
            ></i>
            <p>Assigned to : {ele.assigned_to}</p>
            <button type="button" className="btn circle-btn" onClick={(e)=>handleShowTask(ele.task_id,ele.task_name,ele.task_desc,ele.time_stamp,ele.assigned_to,ele.task_status)}>
              <i className="fa fa-circle"></i>
            </button>
            <TaskShowModal
              task_id={task_id_store}
              task_name={task_name_store}
              task_desc={task_desc_store}
              time_stamp={time_stamp_store}
              assigned_to={assigned_to_store}
              task_status={task_status_store}
              board_id={board_id}
              show={taskShow}
              onHide={taskHide}
              setupdated={setIsUpdated}
            ></TaskShowModal>
          </div>
          ) : (
            <div></div>
          )}
        </td>

        <td className="table-cell tr-fourth-child" key="4">
          {ele.task_status === "Cancelled" ? (
            <div className="task-box w-100 position-relative">
              <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1 btn-group dropend">
                <button
                  key="4"
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
              <i
                className="fa fa-plus-circle"
                onClick={() => assignTask(ele.task_id)}
              ></i>
              <p>Assigned to : {ele.assigned_to}</p>
              <button type="button" className="btn circle-btn" onClick={(e)=>handleShowTask(ele.task_id,ele.task_name,ele.task_desc,ele.time_stamp,ele.assigned_to,ele.task_status)}>
                <i className="fa fa-circle"></i>
              </button>
              <TaskShowModal
              task_id={task_id_store}
              task_name={task_name_store}
              task_desc={task_desc_store}
              time_stamp={time_stamp_store}
              assigned_to={assigned_to_store}
              board_id={board_id}
              task_status={task_status_store}
              show={taskShow}
              onHide={taskHide}
              setupdated={setIsUpdated}
            ></TaskShowModal>
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
            <div
              id="tasktable_div"
              className="center-block scroll-inner fix-width"
            >
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

          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};

export default BoardView;
