const mongoose = require('mongoose');

const Deck = require('../models/deck');
const Card = require('../models/card');
const getCardAverage = require('../helpers/getCardAverage');

const { Types } = mongoose;

module.exports.find = async (req, res) => {
  const user = req.user._id;

  try {
    let decks = await Deck.find({ user }).populate('tags');

    decks = await Promise.all(decks.map(async (deck) => {
      const cards = await Card.getAllByDeck(deck, user);

      // eslint-disable-next-line no-param-reassign
      deck.recallRate = getCardAverage(cards);
      // eslint-disable-next-line no-param-reassign
      deck.cardsCount = cards.length;

      return deck;
    }));

    res.status(200).json(decks);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.create = async (req, res) => {
  const user = req.user._id;
  const { body } = req;

  try {
    const deck = await Deck.new(body, user);
    res.status(200).json(deck);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.findDeck = async (req, res) => {
  const user = req.user._id;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Required id not provided' });
  }
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Required id is not valid' });
  }

  try {
    const deck = await Deck.get(id, user);

    if (!deck) {
      return res.status(403).json({ message: 'Cannot access deck' });
    }

    const cards = await Card.getAllByDeck(deck, user);

    // eslint-disable-next-line no-param-reassign
    deck.recallRate = getCardAverage(cards);
    // eslint-disable-next-line no-param-reassign
    deck.cardsCount = cards.length;

    return res.status(200).json(deck);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.updateDeck = async (req, res) => {
  const user = req.user._id;
  const { id } = req.params;
  const { body } = req;

  try {
    const deck = await Deck.update(id, body, user);
    res.status(200).json(deck);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.deleteDeck = async (req, res) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    let response = await Deck.remove({ _id: id, user });
    response = await Card.deleteAllByDeck(id, user);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.resetDeck = async (req, res) => {
  const deckId = req.params.id;
  const user = req.user._id;

  try {
    await Card.resetAllByDeck(deckId, user);
    const cards = await Card.getAllByDeck(deckId, user);
    return res.status(200).json(cards);
  } catch (error) {
    return res.status(500).json(error);
  }
};
