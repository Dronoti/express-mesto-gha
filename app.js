const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { notFound } = require('./errors/errors');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(helmet());

app.post('/signin', express.json(), login);
app.post('/signup', express.json(), createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use('*', (req, res) => notFound(res));

app.listen(PORT);

process.on('uncaughtException', (err, origin) => {
  console.log(`Произошла непредвиденная ошибка. ${origin} ${err.name} c текстом ${err.message}`);
});
