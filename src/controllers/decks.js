const Joi = require('joi');

const Deck = require('../models/deck');
const Card = require('../models/card');
const getCardAverage = require('../helpers/getCardAverage');
const deckSchemas = require('./validation/decks');

module.exports.find = async (req, res, next) => {
  try {
    await Joi.validate(req, deckSchemas.find, { allowUnknown: true });
    let decks = await Deck.find({ user: req.user }).populate('tags');

    decks = await Promise.all(decks.map(async (deck) => {
      const cards = await Card.find({ user: req.user, deck });

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
  try {
    await Joi.validate(req, deckSchemas.create, { allowUnknown: true });

    const { title, description, notes, tags } = req.body;
    const deck = await Deck.new({ title, description, notes, tags }, req.user);

    res.send(deck);
  } catch (err) {
    next(err);
  }
};

module.exports.findDeck = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Joi.validate(req, deckSchemas.findDeck, { allowUnknown: true });

    const deck = await Deck.findOne({ _id: id, user: req.user }).populate('tags');

    if (!deck) {
      return res.status(403).json({ message: 'Cannot access deck' });
    }

    const cards = await Card.find({ user: req.user, deck });

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
  try {
    const { id } = req.params;
    await Joi.validate(req, deckSchemas.updateDeck, { allowUnknown: true });

    const { title, description, notes, tags } = req.body;
    const deck = await Deck.update(id, { title, description, notes, tags }, req.user);

    res.send(deck);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteDeck = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Joi.validate(req, deckSchemas.deleteDeck, { allowUnknown: true });

    await Deck.remove({ _id: id, user: req.user });
    const response = await Card.remove({ user: req.user, deck: id });

    res.send(response);
  } catch (err) {
    next(err);
  }
};

module.exports.resetDeck = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Joi.validate(req, deckSchemas.resetDeck, { allowUnknown: true });

    await Card.resetAllByDeck(id, req.user);
    const cards = await Card.find({ user: req.user, deck: id });

    res.send(cards);
  } catch (err) {
    next(err);
  }
};
