const mongoose = require('mongoose');

const Card = require('../models/card');
const Review = require('../models/review');
const getRecallRate = require('../helpers/getRecallRate');

const { Types } = mongoose;

module.exports.find = async (req, res, next) => {
  const user = req.user._id;
  const { type, deck } = req.query;

  try {
    let cards;
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
  const { body } = req;

  try {
    const card = await Card.create(body, user);
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
  const { body } = req;

  try {
    const card = await Card.update(id, body, user);
    // eslint-disable-next-line no-param-reassign
    card.recallRate = getRecallRate(card);
    res.status(200).json(card);
    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    const response = await Card.delete(id, user);
    res.send(response);
  } catch (err) {
    next(err);
  }
};

module.exports.reviewCard = async (req, res, next) => {
  const user = req.user._id;
  const cardId = req.params.id;
  const { value } = req.body;

  try {
    await Review.create(cardId, value, user);
    const card = await Card.review(cardId, value, user);
    // eslint-disable-next-line no-param-reassign
    card.recallRate = getRecallRate(card);
    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.resetCard = async (req, res, next) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    const response = await Card.reset(id, user);
    res.send(response);
  } catch (err) {
    next(err);
  }
};
