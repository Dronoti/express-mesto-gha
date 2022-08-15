const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_INTERNAL_SERVER = 500;
const UNAUTHORIZED_ERROR = 401;

module.exports.badRequest = (res) => {
  res.status(ERROR_BAD_REQUEST).send({
    message: 'Переданы некорректные данные',
  });
};

module.exports.notFound = (res) => {
  res.status(ERROR_NOT_FOUND).send({
    message: 'Не найдено',
  });
};

module.exports.internalServer = (res) => {
  res.status(ERROR_INTERNAL_SERVER).send({
    message: 'Возникла ошибка сервера',
  });
};

module.exports.unauthorizedError = (err, res) => {
  res.status(UNAUTHORIZED_ERROR).send({
    message: err.message,
  });
};
