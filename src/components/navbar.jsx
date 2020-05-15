import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
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
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
