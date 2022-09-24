const express = require('express');

const { getMovies, createMovie, deleteMovie } = require('../controller/movie');

const { createMovieValidator, deleteMovieValidator } = require('../middlewares/validators');

const movieRoutes = express.Router();

movieRoutes.get('/', getMovies);

movieRoutes.post('/', createMovieValidator, createMovie);

movieRoutes.delete('/:id', deleteMovieValidator, deleteMovie);

module.exports = {
  movieRoutes,
};
