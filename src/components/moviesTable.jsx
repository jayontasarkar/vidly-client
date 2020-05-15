import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table/table';
import { Link } from 'react-router-dom';
import auth from '../services/authService';

class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      sortable: true,
      content: (movie) =>
        this.state.user ? (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ) : (
          movie.title
        ),
    },
    { path: 'genre.name', label: 'Genre', sortable: true },
    { path: 'numberInStock', label: 'Stock', sortable: true },
    { path: 'dailyRentalRate', label: 'Rate', sortable: true },
    {
      path: 'like',
      sortable: false,
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteColumn = {
    path: 'delete',
    sortable: false,
    content: (movie) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.onDelete(movie._id)}
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    this.state = { user: null };
    const user = auth.getCurrentUser();
    if (user) this.state.user = user;
    if (user && user.isAdmin === true) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
