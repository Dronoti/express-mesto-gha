const User = require('../models/user');
const { badRequest, notFound, internalServer } = require('../errors/errors');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') badRequest(err, res);
      else internalServer(err, res);
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) res.send(user);
      else notFound({ message: 'Not Found' }, res);
    })
    .catch((err) => {
      if (err.name === 'CastError') badRequest(err, res);
      else internalServer(err, res);
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => internalServer(err, res));
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
      else notFound({ message: 'Not Found' }, res);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') badRequest(err, res);
      else internalServer(err, res);
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
      else notFound({ message: 'Not Found' }, res);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') badRequest(err, res);
      else internalServer(err, res);
    });
};
