const Joi = require('joi');

const AdminMailer = require('../../mailers/admin_mailer');
const createDefaultDeck = require('../helpers/createDefaultDeck');

const userSchemas = require('./validation/users');

const User = require('../models/user');
const Card = require('../models/card');
const Deck = require('../models/deck');

module.exports.signupUser = async (req, res, next) => {
  try {
    await Joi.validate(req, userSchemas.signupUser, { allowUnknown: true });

    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = await User.generateToken(user);

    await createDefaultDeck(user);
    AdminMailer.sendSignupAlert(user);

    res.set('Authorization', `Bearer ${token}`);
    return res.status(200).json({ user });
  } catch (error) {
    switch (error.message) {
      case 'User already exists':
        return res.status(409).json({ message: error.message });
      case 'Invalid User':
        return res.status(400).json({ message: error.message });
      default:
        return next(error);
    }
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    await Joi.validate(req, userSchemas.loginUser, { allowUnknown: true });
    const { email, password } = req.body;

    const user = await User.authenticate(email, password);
    const token = await User.generateToken(user);

    res.set('Authorization', `Bearer ${token}`);
    res.status(200).json({ user });
  } catch (error) {
    if (error.message === 'Invalid User') {
      res.status(400).json(error);
    } else {
      next(error);
    }
  }
};

module.exports.findUser = async (req, res, next) => {
  try {
    const user = await User.get(req.user);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    await Joi.validate(req, userSchemas.updateUser, { allowUnknown: true });
    const { name, email, prefs } = req.body;

    const user = await User.update({ name, email, prefs }, req.user);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.updatePassword = async (req, res, next) => {
  try {
    await Joi.validate(req, userSchemas.updatePassword, { allowUnknown: true });
    const { currentPassword, newPassword } = req.body;

    const user = await User.updatePassword(req.user, currentPassword, newPassword);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    await Deck.remove({ user: req.user });
    await Card.deleteAll(req.user);
    const response = await User.delete(req.user);

    res.send(response);
  } catch (err) {
    next(err);
  }
};
