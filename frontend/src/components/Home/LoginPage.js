import React from "react";
import "./login_signup_style.css";
import "font-awesome/css/font-awesome.css";

function LoginPage() {
  return (
    <div className="inner-wrapper">
        <h2 className="text-center mt-4">Login</h2>
        <form className="p-3 mt-3" method="post" action="backend.php">
          <div className="form-field d-flex align-items-center">
            <i className="fa fa-user-circle"></i>
            <input
              type="text"
              name="user_name"
              id="user_name"
              placeholder="Username"
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <i className="fa fa-key"></i>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <a href="/dashboard" className="btn mt-3">Login</a>
        </form>

    </div>
  );
}

export default LoginPage;
