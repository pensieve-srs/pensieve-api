const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const jwtSecret = process.env.JWT_SECRET;
const UserSchema = require('../../db/schemas/user');
const isValidEmail = require('../helpers/isValidEmail');
const isValidUsername = require('../helpers/isValidUsername');
const removeEmpty = require('../helpers/removeEmpty');

class UserClass {
  static generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  static validPassword(password, user) {
    return password && user && bcrypt.compareSync(password, user.password);
  }

  static authenticate(email, password) {
    return this.findOne({ email }).then((user) => {
      if (this.validPassword(password, user)) {
        return this.getCleanUser(user);
      }
      return Promise.reject(new Error('Invalid User'));
    });
  }

  static updatePassword(id, currentPassword, newPassword) {
    // eslint-disable-next-line consistent-return
    return this.findOne({ _id: id }).then((user) => {
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
  }

  static getCleanUser(user) {
    if (!user) return false;
    return {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      prefs: user.prefs,
    };
  }

  static generateToken(user) {
    return jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: 60 * 60 * 72, // expires in 72 hours
      },
    );
  }

  static get(id) {
    return this.findOne({ _id: id }).then(user => this.getCleanUser(user));
  }

  static getSessionSize(id) {
    return this.findOne({ _id: id }).then(user => user.prefs.sessionSize);
  }

  static update(body, id) {
    const query = removeEmpty({
      username: body.username,
      name: body.name,
      email: body.email,
      prefs: body.prefs,
    });

    return this.findOneAndUpdate({ _id: id }, query, { new: true }).then(user =>
      this.getCleanUser(user));
  }

  static delete(id) {
    return this.remove({ _id: id });
  }

  static new(body) {
    if (!body.username || !body.email || !body.password) {
      throw Error('Invalid arguments');
    }

    if (!isValidEmail(body.email)) {
      throw Error('Invalid email');
    }

    if (!isValidUsername(body.username)) {
      throw Error('Invalid username');
    }

    return this.create({
      username: body.username.trim(),
      email: body.email.trim(),
      password: this.generateHash(body.password.trim()),
    })
      .then(user => this.getCleanUser(user))
      .catch((error) => {
        throw Error('Invalid User', error);
      });
  }
}

UserSchema.loadClass(UserClass);

module.exports = mongoose.model('User', UserSchema);
