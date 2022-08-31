const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { createUser, login } = require('./controllers/users');
const { loginDataIsValid, registerDataIsValid } = require('./middlewares/validator');
const { handleErrors } = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(requestLogger);

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });

app.use(helmet());

app.post('/signin', express.json(), loginDataIsValid, login);
app.post('/signup', express.json(), registerDataIsValid, createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use('*', auth, (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT);
