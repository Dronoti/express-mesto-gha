const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = String(authorization).replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      '7a46dae98fcaadaa92da1218384d0adeadc7049133f2841674553703bb5e0f9e',
    );
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
