import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import * as authService from '../services/authService';

class Register extends Form {
  state = {
    data: { name: '', email: '', password: '' },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label('Email address'),
    password: Joi.string().required().label('Password'),
    name: Joi.string().required().label('Name'),
  };

  doSubmit = async () => {
    try {
      await authService.register(this.state.data);
      window.location = '/';
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-7">
          <h1 className="legend">Register</h1>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              {this.renderInput('name', 'Full Name')}
            </div>
            <div className="form-group">
              {this.renderInput('email', 'Email Address')}
            </div>
            <div className="form-group">
              {this.renderInput('password', 'Password', 'password')}
            </div>
            <div className="form-group">{this.renderButton('Register')}</div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
