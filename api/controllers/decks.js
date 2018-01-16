const express = require('express');

const Deck = require('../models/deck');
const Card = require('../models/card');

const router = express.Router();

// GET /decks
router.get('/', (req, res) => {
  const user = req.user._id;

  Deck.getAll(user)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

// POST /decks
router.post('/', (req, res) => {
  const user = req.user._id;
  const { body } = req;

  Deck.create(body, user)
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
router.delete('/:id', (req, res) => {
  const user = req.user._id;
  const { id } = req.params;

  Deck.delete(id, user)
    .then(() => Card.deleteAllByDeck(id, user))
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

// DELETE /decks/:id/review
router.delete('/:id/review', (req, res) => {
  const deckId = req.params.id;
  const user = req.user._id;

  Card.resetAllByDeck(deckId, user)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

module.exports = router;
