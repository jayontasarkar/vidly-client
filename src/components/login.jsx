import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-7">
          <h1 className="legend">Login</h1>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              {this.renderInput("username", "Username")}
            </div>
            <div className="form-group">
              {this.renderInput("password", "Password", "password")}
            </div>
            <div className="form-group">{this.renderButton("Login")}</div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
