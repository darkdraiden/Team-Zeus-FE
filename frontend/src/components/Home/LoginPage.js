import React from "react";
import "./login_signup_style.css";
import "font-awesome/css/font-awesome.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");


  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(`http://127.0.0.1:8000/${user_name}`, {
        user_name: user_name,
        password: password,
      });
      setUserName("");
      setPassword("");

      if (res.data.success) {
        navigate(`/${user_name}/dashboard`, {
          state: { user_name: user_name },
        });
      } else {
        alert("Invalid Credentials !");
        navigate("/");
      }
    } catch (e) {
      alert("Invalid Credentials !");
      navigate("/");
    }
  };

  const password_show_hide=() =>{
    var x = document.getElementById("password");
    var show_eye = document.getElementById("show_eye");
    var hide_eye = document.getElementById("hide_eye");
    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
      x.type = "text";
      show_eye.style.display = "none";
      hide_eye.style.display = "block";
    } else {
      x.type = "password";
      show_eye.style.display = "block";
      hide_eye.style.display = "none";
    }
  };
  return (
    <div className="inner-wrapper">
      <h2 className="text-center mt-4">Login</h2>
      <form className="p-3 mt-3" onSubmit={handleSubmit}>
        <div className="form-field d-flex align-items-center">
          <i className="fa fa-user-circle"></i>
          <input
            value={user_name}
            type="text"
            name="user_name"
            id="user_name"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <i className="fa fa-key"></i>
          <input
            value={password}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="d-flex justify-content-center">
            <span className="pe-2" onClick={password_show_hide}>
              <i className="fa fa-eye" id="show_eye"></i>
              <i className="fa fa-solid fa-eye-slash d-none" id="hide_eye"></i>
            </span>
          </div>
        </div>
        <button className="btn mt-3" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
