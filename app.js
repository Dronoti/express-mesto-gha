const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { notFound } = require('./errors/errors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '62e2815d00d758644bc23d13',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => notFound({ name: 'Not Found' }, res));

app.listen(PORT);

process.on('uncaughtException', (err, origin) => {
  console.log(`Произошла непредвиденная ошибка. ${origin} ${err.name} c текстом ${err.message}`);
});
