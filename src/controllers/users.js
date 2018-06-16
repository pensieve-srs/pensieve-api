const express = require('express');
const auth = require('../middlewares/auth');
const AdminMailer = require('../../mailers/admin_mailer');
const validators = require('../helpers/validators');
const createDefaultDeck = require('../helpers/createDefaultDeck');

const User = require('../models/user');
const Card = require('../models/card');
const Deck = require('../models/deck');
const Review = require('../models/review');

const router = express.Router();

// POST /users/signup
router.post('/signup', async (req, res) => {
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
        return res.status(500).json({ message: error.message });
    }
  }
});

// POST /users/login
router.post('/login', async (req, res) => {
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
      res.status(500).json(error);
    }
  }
});

// GET /users/profile
router.get('/profile', auth, async (req, res) => {
  const id = req.user._id;
  const { fields } = req.query;

  try {
    const user = await User.get(id);
    if (fields && fields.includes('counts')) {
      user.counts = {
        cards: {
          all: await Card.countAll(id),
          due: await Card.countAllDue(id),
          new: await Card.countAllNew(id),
        },
        decks: {
          all: await Deck.count({ user: id }),
        },
        reviews: {
          all: await Review.countAll(id),
        },
      };
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT /users/profile
router.put('/profile', auth, async (req, res) => {
  const id = req.user._id;
  const { body } = req;

  if (!body.email) {
    res.status(400).json({ message: 'Email is required' });
  } else {
    try {
      const user = await User.update(body, id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.put('/profile/security', auth, async (req, res) => {
  const id = req.user._id;
  const { body } = req;

  try {
    const user = await User.updatePassword(id, body.currentPassword, body.newPassword);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE /users/profile
router.delete('/profile', auth, async (req, res) => {
  const user = req.user._id;

  try {
    await Deck.remove({ user });
    await Card.deleteAll(user);
    const response = await User.delete(user);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
