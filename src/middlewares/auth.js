const jwt = require('jsonwebtoken');

const config = require('../../config');

function authenticate(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      message: 'Invalid authentication. Please include a JWT token',
    });
  }

  token = token.replace('Bearer ', '');

  return jwt.verify(token, config.jwt, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid authentication. Please log in to make requests',
      });
    }

    req.user = user;
    return next();
  });
}

module.exports = authenticate;
