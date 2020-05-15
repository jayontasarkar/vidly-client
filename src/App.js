import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import Rentals from './components/rentals';
import Customers from './components/customers';
import Login from './components/login';
import Register from './components/register';
import NotFound from './components/notFound';
import ProtectedRoute from './components/common/protectedRoute';
import { Switch, Redirect, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import * as auth from './services/authService';
class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch (error) {}
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <div className="row">
            <div className="col">
              <Switch>
                <ProtectedRoute path="/movies/:id" component={MovieForm} />
                <Route
                  path="/movies"
                  exact
                  render={(props) => <Movies {...props} user={user} />}
                />
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
}

export default App;
