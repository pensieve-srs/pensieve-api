const express = require('express');

const Card = require('../models/card');
const Review = require('../models/review');

const router = express.Router();

// GET /cards
router.get('/', (req, res) => {
  const user = req.user._id;
  const { type, deck } = req.query;

  if (deck) {
    Card.getAllByDeck(deck, user)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((response) => {
        res.status(500).json(response);
      });
  } else {
    Card.getAll(user, type)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((response) => {
        res.status(500).json(response);
      });
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
router.get('/:id', (req, res) => {
  const user = req.user._id;
  const { id } = req.params;

  Card.get(id, user)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
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
