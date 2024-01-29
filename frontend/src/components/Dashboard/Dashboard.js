import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import "font-awesome/css/font-awesome.css";
import { useNavigate} from "react-router";
import BoardList from "./BoardList";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        let session_key = document.cookie.match(/session_id=([^;]*)/);
        let session = document.cookie.match(/user_name=([^;]*)/);
        if (session==null){
          navigate("/")
        }
        let user_name=session[1];
        let res = await axios.post(
          `http://127.0.0.1:8000/${user_name}/dashboard`,
          {
            session_key: session_key[1]
          } 
        );
        if (!res.data.success) {
          toast(res.data.message);
          navigate("/");
        }

        setBoardData(res.data.data.board_list);
      } catch (e) {
        navigate("/");
      }
    }
    fetchData();
  });
  let user_name=document.cookie.match(/user_name=([^;]*)/)[1];
  return (
    <div id="body_dashboard">
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
      <div id="dashboard">
        <BoardList user_name={user_name} boardData={boardData} />
      </div>
    </div>
  );
}

export default Dashboard;
