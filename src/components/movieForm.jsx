import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { toast } from 'react-toastify';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate'),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === 'new') return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (err) {
      if (err.response && err.response.status === 404)
        return this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    this.populateGenres();
    this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    toast.success('Movie saved successfully.');
    this.props.history.push('/movies');
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">{this.renderInput('title', 'Title')}</div>
          <div className="form-group">
            {this.renderSelect('genreId', 'Genre', this.state.genres)}
          </div>
          <div className="form-group">
            {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          </div>
          <div className="form-group">
            {this.renderInput('dailyRentalRate', 'Rate')}
          </div>
          <div className="form-group">{this.renderButton('Save Movie')}</div>
        </form>
      </div>
    );
  }
}

export default MovieForm;
