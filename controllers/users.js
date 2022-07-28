const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send({
      message: 'Переданы некорректные данные',
      error: err.message,
    }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({
          message: 'Пользователь не найден',
          error: 'Not found',
        });
      }
    })
    .catch((err) => res.status(400).send({
      message: 'Переданы некорректные данные',
      error: err.message,
    }));
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({
      message: 'Произошла ошибка',
      error: err.message,
    }));
};
