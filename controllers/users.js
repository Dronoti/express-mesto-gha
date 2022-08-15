const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  badRequest,
  notFound,
  internalServer,
  unauthorizedError,
} = require('../errors/errors');

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') badRequest(res);
      else internalServer(res);
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) res.send(user);
      else notFound(res);
    })
    .catch((err) => {
      if (err.name === 'CastError') badRequest(res);
      else internalServer(res);
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => internalServer(res));
};

module.exports.updateUserData = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) res.send(user);
      else notFound(res);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') badRequest(res);
      else internalServer(res);
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) res.send(user);
      else notFound(res);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') badRequest(res);
      else internalServer(res);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        '7a46dae98fcaadaa92da1218384d0adeadc7049133f2841674553703bb5e0f9e',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: 'Успешный вход' });
    })
    .catch((err) => {
      if (err.message === 'Неправильные почта или пароль') unauthorizedError(err, res);
      else badRequest(res);
    });
};
