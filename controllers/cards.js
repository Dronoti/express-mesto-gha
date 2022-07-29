const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => res.status(400).send({
      message: 'Переданы некорректные данные',
      error: err.message,
    }));
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({
      message: 'Произошла ошибка',
      error: err.message,
    }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(404).send({
          message: 'Карточка не найдена',
          error: 'Not found',
        });
      }
    })
    .catch((err) => res.status(400).send({
      message: 'Переданы некорректные данные',
      error: err.message,
    }));
};
