const express = require('express');

const Card = require('../models/card');
const Review = require('../models/review');
const halfLife = require('../helpers/halfLife');

const router = express.Router();

// GET /cards
router.get('/', async (req, res) => {
  const user = req.user._id;
  const { type, deck } = req.query;

  try {
    let cards;
    if (deck) {
      cards = await Card.getAllByDeck(deck, user);
      cards = cards.map((card) => {
        // eslint-disable-next-line no-param-reassign
        card.strength = halfLife.getRecallRate(card) * 100;
        return card;
      });
    } else if (type) {
      cards = await Card.getAllForType(type, user);
    } else {
      cards = await Card.getAll(user);
    }

    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST /cards
router.post('/', (req, res) => {
  const user = req.user._id;
  const { body } = req;

  Card.create(body, user)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

// GET /cards/:id
router.get('/:id', async (req, res) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    const card = await Card.get(id, user);

    // eslint-disable-next-line no-param-reassign
    card.strength = halfLife.getRecallRate(card) * 100;

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT /cards/:id
router.put('/:id', (req, res) => {
  const user = req.user._id;
  const { id } = req.params;
  const { body } = req;

  Card.update(id, body, user)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

// DELETE /cards/:id
router.delete('/:id', (req, res) => {
  const user = req.user._id;
  const { id } = req.params;

  Card.delete(id, user)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

// POST /cards/:id/review
router.post('/:id/review', (req, res) => {
  const user = req.user._id;
  const cardId = req.params.id;
  const { value } = req.body;

  Review.create(cardId, value, user)
    .then(() => Card.review(cardId, value, user))
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

// DELETE /cards/:id/review
router.delete('/:id/review', (req, res) => {
  const user = req.user._id;
  const { id } = req.params;

  Card.reset(id, user)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

module.exports = router;
