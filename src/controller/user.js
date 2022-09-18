const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const ConflictRequest = require('../errors/conflicting-request');
const Badrequest = require('../errors/badrequest');
const Unauthorized = require('../errors/unauthorized');

const { User } = require('../models/user');

// возвращает информацию о пользователе (email и имя)
exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

// обновляет информацию о пользователе (email и имя)
exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Badrequest('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictRequest('Переданный почтовый ящик занят другим пользователем'));
      } else {
        next(err);
      }
    });
};

// создаёт пользователя с переданными в теле  email, password и name
exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Badrequest('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new Unauthorized('Переданный почтовый ящик занят другим пользователем'));
      } else {
        next(err);
      }
    });
};

// проверяет переданные в теле почту и пароль и возвращает JWT
exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
