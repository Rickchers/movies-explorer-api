require('dotenv').config();

console.log(process.env.NODE_ENV);

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const { celebrate, Joi, errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./src/middlewares/logger');

const userControllers = require('./src/controller/user');

const auth = require('./src/middlewares/auth');

const { errorHandler } = require('./utils');

const { routes } = require('./src/routes/index');

const { PORT = 3001 } = process.env;

const app = express();
app.use(cors());

// подключаемся к серверу mongo
async function main() {
  await mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
  console.log('Connected to db');

  await app.listen(PORT);
  console.log(`Server listen on port ${PORT}`);
}
main();

app.use(express.json());

// подключаем логгер запросов до всех обработчиков роутов
app.use(requestLogger);

// краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), userControllers.login);

// регистрация нового пользователя
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), userControllers.createUser);

app.use(auth);

app.use(routes);

// подключаем логгер ошибок после обработчиков роутов и до обработчиков ошибок
app.use(errorLogger);

// здесь обрабатываем все ошибки

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик
