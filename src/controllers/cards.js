const Joi = require('joi');
const mongoose = require('mongoose');

const Card = require('../models/card');
const Review = require('../models/review');
const getRecallRate = require('../helpers/getRecallRate');
const cardSchemas = require('./validation/cards');

const { Types } = mongoose;

module.exports.find = async (req, res, next) => {
  try {
    const { type, deck } = req.query;
    await Joi.validate(req, cardSchemas.find, { allowUnknown: true });

    let cards;
    if (deck) {
      if (!Types.ObjectId.isValid(deck)) {
        return res.status(400).json({ message: 'Deck id is not valid' });
      }

      cards = await Card.find({ user: req.user, deck });
      cards = cards.map((card) => {
        // eslint-disable-next-line no-param-reassign
        card.recallRate = getRecallRate(card);
        return card;
      });
    } else if (type === 'due') {
      cards = await Card.getAllDue(req.user);
    } else if (type === 'learn') {
      cards = await Card.getAllNew(req.user);
    } else {
      cards = await Card.find({ user: req.user });
    }

    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const { front, back, deck, notes } = req.body;
    await Joi.validate(req, cardSchemas.create, { allowUnknown: true });

    const card = await Card.new({ front, back, deck, notes }, req.user);
    // eslint-disable-next-line no-param-reassign
    card.recallRate = getRecallRate(card);

    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.findCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Joi.validate(req, cardSchemas.findCard, { allowUnknown: true });

    const card = await Card.findOne({ _id: id, user: req.user }).populate('deck');

    // eslint-disable-next-line no-param-reassign
    card.recallRate = getRecallRate(card);

    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.updateCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Joi.validate(req, cardSchemas.updateCard, { allowUnknown: true });

    const { front, back, notes } = req.body;
    const card = await Card.update(id, { front, back, notes }, req.user);
    // eslint-disable-next-line no-param-reassign
    card.recallRate = getRecallRate(card);
    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Joi.validate(req, cardSchemas.deleteCard, { allowUnknown: true });

    const response = await Card.remove({ _id: id, user: req.user });

    res.send(response);
  } catch (err) {
    next(err);
  }
};

module.exports.reviewCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Joi.validate(req, cardSchemas.reviewCard, { allowUnknown: true });

    const { value } = req.body;

    await Review.create({ user: req.user, card: id, value });
    const card = await Card.review(id, value, req.user);

    card.recallRate = getRecallRate(card); // eslint-disable-line no-param-reassign

    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.resetCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Joi.validate(req, cardSchemas.resetCard, { allowUnknown: true });

    const response = await Card.reset(id, req.user);
    res.send(response);
  } catch (err) {
    next(err);
  }
};
