const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_INTERNAL_SERVER = 500;

module.exports.badRequest = (err, res) => {
  res.status(ERROR_BAD_REQUEST).send({
    message: err.message,
  });
};

module.exports.notFound = (err, res) => {
  res.status(ERROR_NOT_FOUND).send({
    message: err.message,
  });
};

module.exports.internalServer = (err, res) => {
  res.status(ERROR_INTERNAL_SERVER).send({
    message: err.message,
  });
};
