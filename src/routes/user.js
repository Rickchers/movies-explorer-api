const express = require('express');

const { getUserProfile, updateUser } = require('../controller/user');

const { updateUserValidator } = require('../middlewares/validators');

const userRoutes = express.Router();

userRoutes.get('/me', getUserProfile);

userRoutes.patch('/me', updateUserValidator, updateUser);

module.exports = {
  userRoutes,
};
