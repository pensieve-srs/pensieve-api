const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const User = require("../../db/schemas/user");
const isValidEmail = require("../helpers/isValidEmail");
const removeEmpty = require("../helpers/removeEmpty");

module.exports.getCleanUser = function getCleanUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    is_email_on: user.is_email_on,
  };
};

module.exports.generateHash = function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports.generateToken = function generateToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    jwtSecret,
    {
      expiresIn: 60 * 60 * 48, // expires in 48 hours
    },
  );
};

module.exports.validPassword = function validPassword(password, user) {
  return password && user && bcrypt.compareSync(password, user.password);
};

module.exports.get = function(id) {
  return User.findOne({ _id: id }).then(user => {
    if (user) {
      return this.getCleanUser(user);
    }
  });
};

module.exports.update = function(body, id) {
  const query = removeEmpty({
    name: body.name,
    email: body.email,
  });

  return User.findOneAndUpdate({ _id: id }, query, { new: true }).then(user => {
    if (user) {
      return this.getCleanUser(user);
    }
  });
};

module.exports.delete = function(id) {
  return User.remove({ _id: id });
};

module.exports.create = function(body) {
  if (!body.name || !body.email || !body.password || !isValidEmail(body.email)) {
    return Promise.reject(new Error("Invalid User"));
  }

  const query = {
    name: body.name.trim(),
    email: body.email.trim(),
    password: this.generateHash(body.password.trim()),
  };

  return User.create(query)
    .then(user => {
      return this.getCleanUser(user);
    })
    .catch(error => {
      return Promise.reject(new Error("Invalid User"));
    });
};

module.exports.authenticate = function(email, password) {
  return User.findOne({ email: email }).then(user => {
    if (this.validPassword(password, user)) {
      return this.getCleanUser(user);
    } else {
      return Promise.reject(new Error("Invalid User"));
    }
  });
};
