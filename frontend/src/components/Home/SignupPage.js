import React from "react";

function SignupPage() {
  return (
    <div className="inner-wrapper">
        <h2 className="text-center">Sign Up</h2>
        <form className="p-3" method="post">
        <div className="form-field d-flex align-items-center">
            <i className="fa fa-user"></i>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="First Name"
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <i className="fa fa-user"></i>
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Last Name"
            />
          </div>
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
            <i className="fa fa-envelope"></i>
            <input
              type="text"
              name="user_email"
              id="user_email"
              placeholder="Email Address"
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
          <button className="btn mt-3">Register</button>
        </form>
    </div>
  );
}

export default SignupPage;
