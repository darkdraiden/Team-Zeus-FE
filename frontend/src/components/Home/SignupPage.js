import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SignupPage() {
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post("http://127.0.0.1:8000/", {
        first_name: first_name,
        last_name: last_name,
        user_email: user_email,
        user_name: user_name,
        password: password,
      });
      setFirstName("");
      setLastName("");
      setUserEmail("");
      setUserName("");
      setPassword("");
      alert("Successfully Registered ! ");
    } catch (e) {
      navigate("/");
    }
  };

  const password_show_hide = () => {
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
    <div className="inner-wrapper" onLoad="document.form.user_email.focus()">
      <h2 className="text-center">Sign Up</h2>
      <form className="p-3" name="form" onSubmit={handleSubmit}>
        <div className="form-field d-flex align-items-center">
          <i className="fa fa-user"></i>
          <input
            value={first_name}
            type="text"
            name="first_name"
            id="first_name"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <i className="fa fa-user"></i>
          <input
            value={last_name}
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
          <i className="fa fa-envelope"></i>
          <input
            value={user_email}
            type="email"
            name="user_email"
            id="user_email"
            placeholder="Email Address"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            onChange={(e) => setUserEmail(e.target.value)}
            title="Enter a valid E-mail address"
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
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            title="should contain minimum 8 characters, atleast 1 letter, 1 number and 1 special character"
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
          Register
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
