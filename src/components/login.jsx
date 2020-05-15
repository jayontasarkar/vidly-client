import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import { Redirect } from 'react-router-dom';

class Login extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label('Email address'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = async () => {
    try {
      await auth.login(this.state.data);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-7">
          <h1 className="legend">Login</h1>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              {this.renderInput('email', 'Email Address')}
            </div>
            <div className="form-group">
              {this.renderInput('password', 'Password', 'password')}
            </div>
            <div className="form-group">{this.renderButton('Login')}</div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
