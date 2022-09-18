const express = require('express');
const auth = require('../middlewares/auth');
const { userRoutes } = require('./user');
const { movieRoutes } = require('./movie');

const { createUser, login } = require('../controller/user');

const NotFoundError = require('../errors/not-found-err');

const { createUserValidator, loginValidator } = require('../middlewares/validators');

const routes = express.Router();

// аутентификация пользователя
routes.post('/signin', loginValidator, login);

// регистрация нового пользователя
routes.post('/signup', createUserValidator, createUser);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);

routes.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс по указанному адресу не найден'));
});

module.exports = { routes };
