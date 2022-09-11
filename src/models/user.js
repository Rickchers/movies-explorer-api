const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const Unauthorized = require('../errors/unauthorized');

// const { regex } = require('../../constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильные почта или пароль!'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized('Неправильные почта или пароль!'));
          }
          return user;
        });
    });
};

exports.User = mongoose.model('user', userSchema);
