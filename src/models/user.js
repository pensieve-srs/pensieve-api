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
    password: { type: String, required: true, select: false },
    prefs: {
      emailNotifs: { type: Boolean, default: true },
      sessionSize: { type: Number, default: 30 },
    },
    reset_password_token: { type: String },
  },
  { timestamps: true },
);

class UserClass {
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

  static generateResetToken(user) {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      config.jwt,
      {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
      },
    );
  }

  static validPassword(password, user) {
    return password && user && bcrypt.compareSync(password, user.password);
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
    );
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
    });
  }

  static authenticateUser(userEmail, password) {
    return this.findOne({ email: userEmail })
      .select('+password')
      .then((user) => {
        const { _id, name, email, prefs } = user;
        if (!this.validPassword(password, user)) {
          return Promise.reject(new Error('Invalid User'));
        }

        return { _id, name, email, prefs };
      });
  }

  static updatePassword(id, currentPassword, newPassword) {
    return this.findOne({ _id: id }).then((user) => {
      if (!this.validPassword(currentPassword, user)) {
        return Promise.reject(new Error('Invalid User'));
      }

      user.set({ password: this.generateHash(newPassword) });
      return user.save();
    });
  }

  static setResetPasswordToken(user) {
    return this.findOne({ _id: user._id }).then((newUser) => {
      const token = this.generateResetToken(user);
      newUser.set({ reset_password_token: token });
      return newUser.save();
    });
  }

  static resetPassword({ id, token, newPassword, verifyPassword }) {
    return this.findOne({ _id: id, reset_password_token: token }).then((user) => {
      if (!user) {
        return Promise.reject(new Error('Invalid token for user'));
      } else if (newPassword !== verifyPassword) {
        return Promise.reject(new Error('Passwords do not match.'));
      }

      user.set({ password: this.generateHash(newPassword), reset_password_token: undefined });
      return user.save();
    });
  }
}

UserSchema.loadClass(UserClass);

module.exports = mongoose.model('User', UserSchema);
