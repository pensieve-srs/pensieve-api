const User = require("../models/user");
const jwt = require("jsonwebtoken");
const emailValidator = require("../helpers/emailValidator");

const jwtSecret = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      error: true,
      type: "invalid_token",
      message: "Invalid authentication. Please include a JWT token",
    });
  }

  token = token.replace("Bearer ", "");

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(401).json({
        error: true,
        type: "invalid_token",
        message: "Invalid authentication. Please log in to make requests",
      });
    }

    req.user = user;
    next();
  });
};

module.exports = { authenticateUser };
