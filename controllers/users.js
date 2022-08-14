const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { badRequest, notFound, internalServer } = require('../errors/errors');

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.has(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') badRequest(res);
        else internalServer(res);
      }));
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
