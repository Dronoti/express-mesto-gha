const Card = require('../models/card');
const { badRequest, notFound, internalServer } = require('../errors/errors');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') badRequest(res);
      else internalServer(res);
    });
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => internalServer(res));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) res.send(card);
      else notFound(res);
    })
    .catch((err) => {
      if (err.name === 'CastError') badRequest(res);
      else internalServer(res);
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) res.send(card);
      else notFound(res);
    })
    .catch((err) => {
      if (err.name === 'CastError') badRequest(res);
      else internalServer(res);
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) res.send(card);
      else notFound(res);
    })
    .catch((err) => {
      if (err.name === 'CastError') badRequest(res);
      else internalServer(res);
    });
};
