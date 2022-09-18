const mongoose = require('mongoose');

const validator = require('validator');
const { regex } = require('../../constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => regex.test(value),
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => regex.test(value),
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => regex.test(value),
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },

});

exports.Movie = mongoose.model('movie', movieSchema);
