const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../../config');

const validators = require('../helpers/validators');
const removeEmpty = require('../helpers/removeEmpty');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    prefs: {
      emailNotifs: { type: Boolean, default: true },
      sessionSize: { type: Number, default: 30 },
    },
  },
  { timestamps: true },
);

class UserClass {
  static getCleanUser(user) {
    if (!user) return false;
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      prefs: user.prefs,
    };
  }

  static generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  static generateToken(user) {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      config.jwt,
      {
        expiresIn: 60 * 60 * 72, // expires in 72 hours
      },
    );
  }

  static validPassword(password, user) {
    return password && user && bcrypt.compareSync(password, user.password);
  }

  static get(id) {
    return this.findOne({ _id: id }).then(user => this.getCleanUser(user));
  }

  static getSessionSize(id) {
    return this.findOne({ _id: id }).then(user => user.prefs.sessionSize);
  }

  static update(body, id) {
    return this.findOneAndUpdate(
      { _id: id },
      removeEmpty({
        name: body.name,
        email: body.email,
        prefs: body.prefs,
      }),
      { new: true },
    ).then(user => this.getCleanUser(user));
  }

  static delete(id) {
    return this.remove({ _id: id });
  }

  static new(body) {
    const { name, email, password } = body;

    if (!name || !email || !password) {
      throw new Error('User arguments not provided');
    }
    if (!validators.checkEmail(email)) {
      throw new Error('Invalid user email');
    }
    if (!validators.checkPassword(password)) {
      throw new Error('Invalid user password');
    }

    return this.create({
      name: name.trim(),
      email: email.trim(),
      password: this.generateHash(password.trim()),
    }).then(user => this.getCleanUser(user));
  }

  static updatePassword(id, currentPassword, newPassword) {
    return this.findOne({ _id: id }).then((user) => {
      if (!this.validPassword(currentPassword, user)) {
        return Promise.reject(new Error('Invalid User'));
      }

      user.set({ password: this.generateHash(newPassword) });
      return user.save((err, updatedUser) => {
        if (err) return Promise.reject(new Error('Invalid Password'));
        return this.getCleanUser(updatedUser);
      });
    });
  }

  static authenticate(email, password) {
    return this.findOne({ email }).then((user) => {
      if (!this.validPassword(password, user)) {
        return Promise.reject(new Error('Invalid User'));
      }

      return this.getCleanUser(user);
    });
  }
}

UserSchema.loadClass(UserClass);

module.exports = mongoose.model('User', UserSchema);
