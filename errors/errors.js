module.exports.badRequest = (err, res) => {
  res.status(400).send({
    message: 'Переданы некорректные данные',
    error: err.message,
  });
};

module.exports.notFound = (err, res) => {
  res.status(404).send({
    message: 'Не найдено',
    error: err.message,
  });
};

module.exports.internalServer = (err, res) => {
  res.status(500).send({
    message: 'Произошла ошибка',
    error: err.message,
  });
};
