require('dotenv').config();

console.log(process.env.NODE_ENV);

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./src/middlewares/logger');

const { errorHandler, limiter } = require('./utils');

const { routes } = require('./src/routes/index');

const { PORT = 3001, NODE_ENV, MONGODB_ADRESS } = process.env;

const app = express();
app.use(cors());

// подключаемся к серверу mongo
async function main() {
  await mongoose.connect(NODE_ENV === 'production' ? MONGODB_ADRESS : 'mongodb://localhost:27017/moviesdb');
  console.log('Connected to db');

  await app.listen(PORT);
  console.log(`Server listen on port ${PORT}`);
}
main();

app.use(express.json());

// подключаем логгер запросов до всех обработчиков роутов
app.use(requestLogger);

// подключаем limiter
app.use(limiter);

// краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

// подключаем логгер ошибок после обработчиков роутов и до обработчиков ошибок
app.use(errorLogger);

routes.use(errors()); // обработчик ошибок celebrate

// здесь обрабатываем все ошибки

app.use(errorHandler); // централизованный обработчик
