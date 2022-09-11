const express = require('express');
const { userRoutes } = require('./user');
const { movieRoutes } = require('./movie');

const NotFoundError = require('../errors/not-found-err');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);

routes.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс по указанному адресу не найден'));
});

module.exports = { routes };
