const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const User = require('../../db/schemas/user');
const isValidEmail = require('../helpers/isValidEmail');
const removeEmpty = require('../helpers/removeEmpty');

module.exports.getCleanUser = function getCleanUser(user) {
  if (!user) return false;
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    prefs: user.prefs,
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

module.exports.get = function get(id) {
  return User.findOne({ _id: id }).then(user => this.getCleanUser(user));
};

module.exports.getSessionSize = function getSessionSize(id) {
  return User.findOne({ _id: id }).then(user => user.prefs.sessionSize);
};

module.exports.update = function update(body, id) {
  const query = removeEmpty({
    name: body.name,
    email: body.email,
    prefs: body.prefs,
  });

  return User.findOneAndUpdate({ _id: id }, query, { new: true }).then(user =>
    this.getCleanUser(user));
};

module.exports.delete = function deleteUser(id) {
  return User.remove({ _id: id });
};

module.exports.create = function create(body) {
  if (!body.name || !body.email || !body.password || !isValidEmail(body.email)) {
    return Promise.reject(new Error('Invalid User'));
  }

  const query = {
    name: body.name.trim(),
    email: body.email.trim(),
    password: this.generateHash(body.password.trim()),
  };

  return User.create(query)
    .then(user => this.getCleanUser(user))
    .catch(error => Promise.reject(new Error('Invalid User', error)));
};

module.exports.updatePassword = function updatePassword(id, currentPassword, newPassword) {
  // eslint-disable-next-line consistent-return
  return User.findOne({ _id: id }).then((user) => {
    if (this.validPassword(currentPassword, user)) {
      user.set({ password: this.generateHash(newPassword) });
      user.save((err, updatedUser) => {
        if (err) return Promise.reject(new Error('Invalid Password'));
        return this.getCleanUser(updatedUser);
      });
    } else {
      return Promise.reject(new Error('Invalid User'));
    }
  });
};

module.exports.authenticate = function authenticate(email, password) {
  return User.findOne({ email }).then((user) => {
    if (this.validPassword(password, user)) {
      return this.getCleanUser(user);
    }
    return Promise.reject(new Error('Invalid User'));
  });
};
