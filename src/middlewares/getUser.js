const jwt = require('jsonwebtoken');

const config = require('../../config');

function getUser(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      message: 'Invalid authentication. Please include an access token',
    });
  }

  token = token.replace('Bearer ', '');

  return jwt.verify(token, config.jwt, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid authentication. Please use a valid access token to make requests',
      });
    }

    req.user = user._id;
    return next();
  });
}

module.exports = getUser;
