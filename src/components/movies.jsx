import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { paginate } from './../utils/paginate';
import { sort } from './../utils/sort';
import MoviesTable from './moviesTable';
import SearchBox from './common/searchBox';
import { Link } from 'react-router-dom';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 5,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: '',
    sortColumn: { path: 'title', order: 'asc' },
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data: genresFromDb } = await getGenres();
    const genres = [{ name: 'All Genre' }, ...genresFromDb];
    this.setState({ movies, genres });
  }

  handleDelete = async (movieId) => {
    try {
      await deleteMovie(movieId);
      const movies = this.state.movies.filter((movie) => movie._id !== movieId);
      this.setState({ movies });
      toast.success('Movie deleted successfully');
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error('Movie with the ID was not found.');
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (event, page) => {
    event.preventDefault();
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (event, item) => {
    event.preventDefault();
    this.setState({ selectedGenre: item, currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      selectedGenre,
      sortColumn,
      movies,
      currentPage,
      pageSize,
      searchQuery,
    } = this.state;
    let filtered = movies;

    if (searchQuery)
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = movies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = sort(filtered, sortColumn.path, sortColumn.order);
    const paginatedMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginatedMovies };
  };

  render() {
    const {
      movies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    const length = movies.length;
    if (length === 0) return <p>There are no movies in the database</p>;

    const { totalCount, data } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          {this.props.user && (
            <div className="mb-3">
              <Link to={`/movies/new`} className="btn btn-primary">
                New Movie
              </Link>
            </div>
          )}

          <p>Showing {totalCount} movies in the database.</p>

          <div className="form-group">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>

          <MoviesTable
            movies={data}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />

          <Pagination
            itemsCount={totalCount}
            position="center"
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
