const AdminMailer = require('../../mailers/admin_mailer');
const validators = require('../helpers/validators');
const createDefaultDeck = require('../helpers/createDefaultDeck');

const User = require('../models/user');
const Card = require('../models/card');
const Deck = require('../models/deck');

module.exports.signupUser = async (req, res, next) => {
  const { body } = req;

  const { name, email, password } = body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Required user information not provided' });
  }
  if (!validators.checkEmail(email)) {
    return res.status(400).json({ message: 'Invalid email provided' });
  }
  if (!validators.checkPassword(password)) {
    return res.status(400).json({ message: 'Invalid password provided' });
  }

  try {
    const user = await User.create(body);
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
  const { email, password } = req.body;

  try {
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
  const id = req.user._id;

  try {
    const user = await User.get(id);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  const id = req.user._id;
  const { body } = req;

  if (!body.email) {
    res.status(400).json({ message: 'Email is required' });
  } else {
    try {
      const user = await User.update(body, id);
      res.send(user);
    } catch (err) {
      next(err);
    }
  }
};

module.exports.updatePassword = async (req, res, next) => {
  const id = req.user._id;
  const { body } = req;

  try {
    const user = await User.updatePassword(id, body.currentPassword, body.newPassword);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const user = req.user._id;

  try {
    await Deck.remove({ user });
    await Card.deleteAll(user);
    const response = await User.delete(user);

    res.status(200).json(response);
    res.send(response);
  } catch (err) {
    next(err);
  }
};
