/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import auth from '../services/authService';

class Navbar extends Component {
  state = {
    toggleDropdown: false,
  };

  handleToggle = (e) => {
    e.preventDefault();
    this.setState({ toggleDropdown: !this.state.toggleDropdown });
  };

  handleLogout = (e) => {
    e.preventDefault();
    auth.logout();
    window.location = '/';
  };

  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-light fixed-top bg-light">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            Vidly
          </NavLink>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <NavLink
                className="nav-item nav-link"
                activeClassName="active"
                to="/movies"
                exact
              >
                Movies
              </NavLink>
              <NavLink
                className="nav-item nav-link"
                activeClassName="active"
                to="/customers"
              >
                Customers
              </NavLink>
              <NavLink
                className="nav-item nav-link"
                activeClassName="active"
                to="/rentals"
              >
                Rentals
              </NavLink>
            </ul>
            {!user && (
              <ul className="navbar-nav">
                <NavLink
                  className="nav-item nav-link"
                  activeClassName="active"
                  to="/login"
                  exact
                >
                  Login
                </NavLink>
                <NavLink
                  className="nav-item nav-link"
                  activeClassName="active"
                  to="/register"
                  exact
                >
                  Register
                </NavLink>
              </ul>
            )}
            {user && (
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onClick={this.handleToggle}
                  >
                    {user.name}
                  </a>
                  <div
                    className={
                      this.state.toggleDropdown
                        ? 'dropdown-menu navbar-dropdown show'
                        : 'dropdown-menu navbar-dropdown'
                    }
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={this.handleLogout}
                    >
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
