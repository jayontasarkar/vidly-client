import React from "react";
import "./App.css";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import Login from "./components/login";
import Register from "./components/register";
import NotFound from "./components/notFound";
import { Switch, Redirect, Route } from "react-router-dom";
import Navbar from "./components/navbar";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <div className="row">
          <div className="col">
            <Switch>
              <Route path="/movies/:id" component={MovieForm} />
              <Route path="/movies" exact component={Movies} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/customers" component={Customers} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/not-found" component={NotFound} />
              <Redirect exact from="/" to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;
