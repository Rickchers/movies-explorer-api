const express = require('express');
const { celebrate, Joi } = require('celebrate');

const userControllers = require('../controller/user');

const userRoutes = express.Router();

userRoutes.get('/me', userControllers.getUserProfile);

userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), userControllers.updateUser);

module.exports = {
  userRoutes,
};
