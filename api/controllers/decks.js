const express = require('express');

const router = express.Router();
const auth = require('../middlewares/auth');

const Deck = require('../models/deck');
const Card = require('../models/card');

// GET /decks
router.get('/', auth, (req, res) => {
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
router.post('/', auth, (req, res) => {
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
router.get('/:id', auth, (req, res) => {
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
router.put('/:id', auth, (req, res) => {
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
router.delete('/:id', auth, (req, res) => {
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
router.delete('/:id/review', auth, (req, res) => {
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
