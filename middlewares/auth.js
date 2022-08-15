const jwt = require('jsonwebtoken');
const { unauthorizedError } = require('../errors/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return unauthorizedError({ message: 'Необходима авторизация' }, res);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      '7a46dae98fcaadaa92da1218384d0adeadc7049133f2841674553703bb5e0f9e',
    );
  } catch (err) {
    return unauthorizedError({ message: 'Необходима авторизация' }, res);
  }

  req.user = payload;

  return next();
};
