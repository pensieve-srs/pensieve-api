const Joi = require('joi');
const mongoose = require('mongoose');

const Deck = require('../models/deck');
const Card = require('../models/card');
const getCardAverage = require('../helpers/getCardAverage');
const deckSchemas = require('./validation/decks');

const { Types } = mongoose;

module.exports.find = async (req, res, next) => {
  const user = req.user._id;

  try {
    await Joi.validate(req, deckSchemas.find, { allowUnknown: true });
    let decks = await Deck.find({ user }).populate('tags');

    decks = await Promise.all(decks.map(async (deck) => {
      const cards = await Card.getAllByDeck(deck, user);

      // eslint-disable-next-line no-param-reassign
      deck.recallRate = getCardAverage(cards);
      // eslint-disable-next-line no-param-reassign
      deck.cardsCount = cards.length;

      return deck;
    }));

    res.send(decks);
  } catch (err) {
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  const user = req.user._id;

  try {
    await Joi.validate(req, deckSchemas.create, { allowUnknown: true });

    const { title, description, notes, tags } = req.body;
    const deck = await Deck.new({ title, description, notes, tags }, user);

    res.send(deck);
  } catch (err) {
    next(err);
  }
};

module.exports.findDeck = async (req, res, next) => {
  const user = req.user._id;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Required id not provided' });
  }
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Required id is not valid' });
  }

  try {
    await Joi.validate(req, deckSchemas.findDeck, { allowUnknown: true });
    const deck = await Deck.get(id, user);

    if (!deck) {
      return res.status(403).json({ message: 'Cannot access deck' });
    }

    const cards = await Card.getAllByDeck(deck, user);

    // eslint-disable-next-line no-param-reassign
    deck.recallRate = getCardAverage(cards);
    // eslint-disable-next-line no-param-reassign
    deck.cardsCount = cards.length;

    return res.send(deck);
  } catch (err) {
    return next(err);
  }
};

module.exports.updateDeck = async (req, res, next) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    await Joi.validate(req, deckSchemas.updateDeck, { allowUnknown: true });

    const { title, description, notes, tags } = req.body;
    const deck = await Deck.update(id, { title, description, notes, tags }, user);

    res.send(deck);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteDeck = async (req, res, next) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    await Joi.validate(req, deckSchemas.deleteDeck, { allowUnknown: true });

    await Deck.remove({ _id: id, user });
    const response = await Card.deleteAllByDeck(id, user);

    res.send(response);
  } catch (err) {
    next(err);
  }
};

module.exports.resetDeck = async (req, res, next) => {
  const deckId = req.params.id;
  const user = req.user._id;

  try {
    await Joi.validate(req, deckSchemas.resetDeck, { allowUnknown: true });

    await Card.resetAllByDeck(deckId, user);
    const cards = await Card.getAllByDeck(deckId, user);

    res.send(cards);
  } catch (err) {
    next(err);
  }
};
