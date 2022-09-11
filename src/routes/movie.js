const express = require('express');

const validator = require('validator');

const { celebrate, Joi } = require('celebrate');

const movieControllers = require('../controller/movie');

const movieRoutes = express.Router();

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation error');
};

movieRoutes.get('/', movieControllers.getMovies);

movieRoutes.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(method),
    trailerLink: Joi.string().required().custom(method),
    thumbnail: Joi.string().required().custom(method),
    movieId: Joi.string().length(24).hex().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), movieControllers.createMovie);

movieRoutes.delete('/:id', celebrate({
  // валидируем параметры id
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), movieControllers.deleteMovie);

module.exports = {
  movieRoutes,
};
