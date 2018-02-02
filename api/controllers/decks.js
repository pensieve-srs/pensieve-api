const express = require('express');

const Deck = require('../models/deck');
const Card = require('../models/card');
const halfLife = require('../helpers/halfLife');

const router = express.Router();

// GET /decks
router.get('/', async (req, res) => {
  const user = req.user._id;

  try {
    let decks = await Deck.find({ user });

    decks = await Promise.all(decks.map(async (deck) => {
      const cards = await Card.getAllByDeck(deck, user);

      // eslint-disable-next-line no-param-reassign
      deck.strength = halfLife.getCardAverage(cards) * 100;
      // eslint-disable-next-line no-param-reassign
      deck.cardsCount = cards.length;

      return deck;
    }));

    res.status(200).json(decks);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST /decks
router.post('/', (req, res) => {
  const user = req.user._id;
  const { body } = req;

  Deck.new(body, user)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

// GET /decks/:id
router.get('/:id', (req, res) => {
  const user = req.user._id;
  const { id } = req.params;

  Deck.get(id, user)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

// PUT /decks/:id
router.put('/:id', (req, res) => {
  const user = req.user._id;
  const { id } = req.params;
  const { body } = req;

  Deck.update(id, body, user)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

// DELETE /deck/:id
router.delete('/:id', async (req, res) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    let response = await Deck.remove({ _id: id, user });
    response = await Card.deleteAllByDeck(id, user);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE /decks/:id/review
router.delete('/:id/review', async (req, res) => {
  const deckId = req.params.id;
  const user = req.user._id;

  try {
    await Card.resetAllByDeck(deckId, user);
    const cards = await Card.getAllByDeck(deckId, user);
    return res.status(200).json(cards);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
