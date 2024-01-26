import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import "font-awesome/css/font-awesome.css";
import { useLocation , useNavigate} from "react-router";
import BoardList from "./BoardList";

function Dashboard(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const user_name = location.state.user_name;
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let session_key = document.cookie.match(/session_id=([^;]*)/);
        let res = await axios.post(
          `http://127.0.0.1:8000/${user_name}/dashboard`,
          {
            session_key: session_key[1],
          }
        );

        if (!res.data.success) {
          alert(res.data.message);
          navigate("/");
        }

        setBoardData(res.data.data.board_list);
      } catch (e) {
        navigate("/");
      }
    }
    fetchData();
  });

  return (
    <div id="body_dashboard">
      <div id="dashboard">
        <BoardList user_name={user_name} boardData={boardData} />
      </div>
    </div>
  );
}

export default Dashboard;
