import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.min.js";
import AddBoardModal from "./AddBoardModal";
import { Link } from "react-router-dom";

function TitleBar(props) {
  const [addModalShow, setAddModalShow] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

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
  let AddModalClose = () => setAddModalShow(false);
  return (
    <div id="title-bar">
      <div id="title">
        <div className="float-left d-flex me-auto">
          <button className="btn">People</button>
          <button className="btn">Add Task</button>
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
          <button className="btn mx-3">Join Board</button>
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
