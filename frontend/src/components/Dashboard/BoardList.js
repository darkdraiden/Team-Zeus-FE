import React from "react";
import { Link } from "react-router-dom";
import dashboard_img from "../../imgs/home_bg.svg";


function BoardList(props) {
  const user_name = props.user_name;
  const boards_list = props.boardData;

  const board = boards_list.map((ele) => {
    const boardDetailsUrl = `/${user_name}/${ele.board_id}/board_details`;
    return (
      <tr id="board-row" key={ele.board_id}>

        <td className="w-100 text-center d-block">
          <Link
            to={boardDetailsUrl}
            state= { { user_name: user_name, board_id:ele.board_id,boardData: boards_list }}
            className="btn-link"
          >
            <button className="btn w-100 h-100">{ele.board_name}</button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div id="dashboard-body" className="row mx-0 p-0">
        <div className="col-lg-5 d-flex justify-content-center align-items-center">
          <img srcSet={dashboard_img} id="dashboard_img" alt="" />
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
  );
}

export default BoardList;
