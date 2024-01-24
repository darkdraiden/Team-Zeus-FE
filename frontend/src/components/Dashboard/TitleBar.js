import React, { useState , useEffect} from "react";
import "bootstrap/dist/js/bootstrap.min.js";
import AddBoardModal from "./AddBoardModal";
import { Link } from "react-router-dom";
import AddTaskModal from "./AddTaskModal";
import axios from "axios";

function TitleBar(props) {
  const [addModalShow, setAddModalShow] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [addTaskModalShow, setAddTaskModalShow] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [board_id, setBoardId] = useState(props.board_id);
  const [peopleList, setPeopleList] = useState([]);

  useEffect(() => {
    // Fetch list of people when the component mounts
    const fetchPeopleList = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/${props.user_name}/${props.board_id}/people`
        );
        setPeopleList(response.data.data.user_list);
      } catch (error) {
        console.error("Error fetching people list:", error);
      }
    };

    fetchPeopleList();
  }, [props.user_name, props.board_id]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get(
          `http://127.0.0.1:8000/${props.user_name}/${board_id}/board_details`
        );
        setIsJoined(res.data.data.bool);
        setBoardId(res.data.data.board_id);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  });

  let handleJoinBoard = async () => {
    try {
      // Make API call to join the board
      let res = await axios.get(
        `http://127.0.0.1:8000/${props.user_name}/${board_id}`
      );
      // Update the join status in the state
      Location.reload(true);
      // console.log(res.data.data.bool);
      // Show an alert after joining the board
      alert(res.data.message);
    } catch (error) {
      console.error("Error joining board:", error);
    }
  };

  const board = props.boardData.map((ele) => {
    const boardDetailsUrl = `/${props.user_name}/${ele.board_id}/board_details`;
    return (
      <Link
        to={boardDetailsUrl}
        state={{
          user_name: props.user_name,
          board_id: ele.board_id,
          boardData: props.boardData,
        }}
        className="btn-link"
        key={ele.board_id}
      >
        <li>
          <button className="btn w-100 h-100 p-0">{ele.board_name}</button>
        </li>
      </Link>
    );
  });
  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };
  const handleAddTask = (e) => {
    e.preventDefault();
    setAddTaskModalShow(true);
  };

  let AddTaskModalClose = () => setAddTaskModalShow(false);
  let AddModalClose = () => setAddModalShow(false);

  return (
    <div id="title-bar">
      <div id="title">
        <div className="btn-group float-left d-flex me-auto">
        <button
            type="button"
            className="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            People
          </button>
          <ul className="dropdown-menu p-1">
            {peopleList.map((person) => (
              <Link
              to={'/'}
              className="btn-link"
              key={person.user_name}
            >
              <li>
                <button className="btn w-100 h-100 p-0">{person.user_name}</button>
              </li>
            </Link>
            ))}
          </ul>
          <button className="btn" onClick={handleAddTask}>
            Add Task
          </button>
          <AddTaskModal
            {...props}
            show={addTaskModalShow}
            onHide={AddTaskModalClose}
            setupdated={setIsUpdated}
          ></AddTaskModal>
        </div>
        <div className="text-center">
          {/* <!-- Default dropstart button --> */}
          <div className="btn-group dropstart">
            <button
              type="button"
              className="btn dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Board
            </button>
            <ul className="dropdown-menu">{board}</ul>
          </div>
          <button className="btn btn-i" onClick={handleAdd}>
            <i className="fa fa-plus"></i>
          </button>

          {/* Conditionally render Join Board or Joined based on the join status */}
          {isJoined ? (
            <button className="btn mx-3" disabled>
              Joined
            </button>
          ) : (
            <button className="btn mx-3" onClick={handleJoinBoard}>
              Join Board
            </button>
          )}
          <AddBoardModal
            show={addModalShow}
            onHide={AddModalClose}
            setupdated={setIsUpdated}
          ></AddBoardModal>
        </div>

        <div className="float-right">
          <button className="btn btn-i">
            <i className="fa fa-user"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TitleBar;
