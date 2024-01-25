import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./Boardview.css";
import { useLocation} from "react-router";
import TitleBar from "../Dashboard/TitleBar";
import "font-awesome/css/font-awesome.css";
import axios from "axios";

const BoardView = () => {
  const location = useLocation();
  const user_name = location.state.user_name;
  const board_id = location.state.board_id;
  const [boardData,setBoardData]=useState([]);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get(
          `http://127.0.0.1:8000/${user_name}/${board_id}/board_details`
        );
        setTaskData(res.data.data.task_list);
        setBoardData(res.data.data.board_list);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  });

  


  const TaskBoard = taskData.map((ele) => {
    return (
      <tr className="row m-0" key={ele.task_id}>
        <td className="table-cell tr-first-child col-3">
          {ele.task_status === "To Do" ? (
            <div className="task-box w-100 position-relative">
              <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1">
                <i class="fa fa-arrow-right"></i>
              </span>
              <h4>{ele.task_name}</h4>
              <p>{ele.task_desc}</p>
              <p className="time">Created at: {ele.time_stamp}</p>
              <i className="fa fa-check-circle"></i>
            </div>
          ) : (
            <div></div>
          )}
        </td>

        <td className="table-cell tr-second-child col-3">
          {ele.task_status === "In Progress" ? (
            <div className="task-box w-100 position-relative">
              <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1">
                <i class="fa fa-arrow-right"></i>
              </span>
              <h4>{ele.task_name}</h4>
              <p>{ele.task_desc}</p>
              <p className="time">Created at: {ele.time_stamp}</p>
              <i className="fa fa-check-circle"></i>
            </div>
          ) : (
            <div></div>
          )}
        </td>

        <td className="table-cell tr-third-child col-3">
          {ele.task_status === "Done" ? (
            <div className="task-box w-100 position-relative">
              <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1">
                <i class="fa fa-arrow-right"></i>
              </span>
              <h4>{ele.task_name}</h4>
              <p>{ele.task_desc}</p>
              <p className="time">Created at: {ele.time_stamp}</p>
              <i className="fa fa-check-circle"></i>
            </div>
          ) : (
            <div></div>
          )}
        </td>

        <td className="table-cell tr-fourth-child col-3">
          {ele.task_status === "Cancelled" ? (
            <div className="task-box w-100 position-relative">
              <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1">
                <i class="fa fa-arrow-right"></i>
              </span>
              <h4>{ele.task_name}</h4>
              <p>{ele.task_desc}</p>
              <p className="time">Created at: {ele.time_stamp}</p>
              <i className="fa fa-check-circle"></i>
            </div>
          ) : (
            <div></div>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="m-0">
      <TitleBar user_name={user_name} board_id={board_id} boardData={boardData} />
      
      <div className="board_view_body mx-5">
        <Table>
          <thead>
            <tr className="row">
              <th className="table-header col-3">To Do</th>
              <th className="table-header col-3">In Progress</th>
              <th className="table-header col-3">Done</th>
              <th className="table-header col-3">Cancelled</th>
            </tr>
          </thead>
        </Table>

        <div id="tasktable_div">
          <Table striped bordered responsive>
            <tbody>{TaskBoard}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
