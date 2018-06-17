const Joi = require('joi');
const mongoose = require('mongoose');

const Card = require('../models/card');
const Review = require('../models/review');
const getRecallRate = require('../helpers/getRecallRate');
const cardSchemas = require('./validation/cards');

const { Types } = mongoose;

module.exports.find = async (req, res, next) => {
  let cards;
  const user = req.user._id;
  const { type, deck } = req.query;

  try {
    await Joi.validate(req, cardSchemas.find, { allowUnknown: true });

    if (deck) {
      if (!Types.ObjectId.isValid(deck)) {
        return res.status(400).json({ message: 'Deck id is not valid' });
      }

      cards = await Card.getAllByDeck(deck, user);
      cards = cards.map((card) => {
        // eslint-disable-next-line no-param-reassign
        card.recallRate = getRecallRate(card);
        return card;
      });
    } else if (type) {
      cards = await Card.getAllForType(type, user);
    } else {
      cards = await Card.getAll(user);
    }

    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

module.exports.create = async (req, res, next) => {
  const user = req.user._id;

  try {
    await Joi.validate(req, cardSchemas.create, { allowUnknown: true });
    const { front, back, deck, notes } = req.body;

    const card = await Card.create({ front, back, deck, notes }, user);
    // eslint-disable-next-line no-param-reassign
    card.recallRate = getRecallRate(card);

    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.findCard = async (req, res, next) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    await Joi.validate(req, cardSchemas.findCard, { allowUnknown: true });
    const card = await Card.get(id, user);

    // eslint-disable-next-line no-param-reassign
    card.recallRate = getRecallRate(card);

    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.updateCard = async (req, res, next) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    await Joi.validate(req, cardSchemas.updateCard, { allowUnknown: true });

    const { front, back, notes } = req.body;
    const card = await Card.update(id, { front, back, notes }, user);
    // eslint-disable-next-line no-param-reassign
    card.recallRate = getRecallRate(card);
    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    await Joi.validate(req, cardSchemas.deleteCard, { allowUnknown: true });

    const response = await Card.delete(id, user);
    res.send(response);
  } catch (err) {
    next(err);
  }
};

module.exports.reviewCard = async (req, res, next) => {
  const user = req.user._id;
  const cardId = req.params.id;

  try {
    await Joi.validate(req, cardSchemas.reviewCard, { allowUnknown: true });

    const { value } = req.body;

    await Review.create(cardId, value, user);
    const card = await Card.review(cardId, value, user);

    card.recallRate = getRecallRate(card); // eslint-disable-line no-param-reassign

    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.resetCard = async (req, res, next) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    await Joi.validate(req, cardSchemas.resetCard, { allowUnknown: true });

    const response = await Card.reset(id, user);
    res.send(response);
  } catch (err) {
    next(err);
  }
};
