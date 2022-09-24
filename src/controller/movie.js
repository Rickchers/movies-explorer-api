const { Movie } = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const Forbidden = require('../errors/forbidden');
const Badrequest = require('../errors/badrequest');

exports.getMovies = (req, res, next) => {
  Movie
    .find({}).sort({ createdAt: -1 })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Badrequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

exports.deleteMovie = (req, res, next) => {
  const movieId = req.params.id;
  Movie
    .findById(movieId)
    .orFail(new NotFoundError('Нет фильма с указанным в запросе id'))
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        return Movie.findByIdAndRemove(movie._id.toString())
          .then(() => res.send({ data: movie }));
      }
      next(new Forbidden('Вы не можете удалять чужие фильмы'));
    })
    .catch(next);
};
