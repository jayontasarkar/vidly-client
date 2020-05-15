import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class Register extends Form {
  state = {
    data: { username: "", password: "", confirm_password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    confirm_password: Joi.string().required().label("Confirm Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-7">
          <h1 className="legend">Register</h1>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              {this.renderInput("name", "Full Name")}
            </div>
            <div className="form-group">
              {this.renderInput("username", "Username")}
            </div>
            <div className="form-group">
              {this.renderInput("password", "Password", "password")}
            </div>
            <div className="form-group">
              {this.renderInput(
                "confirm_password",
                "Confirm Password",
                "password"
              )}
            </div>
            <div className="form-group">{this.renderButton("Register")}</div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
