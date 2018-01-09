const express = require('express');
const auth = require('../middlewares/auth');

const Card = require('../models/card');
const Review = require('../models/review');

const router = express.Router();

// GET /cards
router.get('/', auth, (req, res) => {
  const user = req.user._id;

  Card.getAll(user)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

// POST /cards
router.post('/', auth, (req, res) => {
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
router.get('/:id', auth, (req, res) => {
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
router.put('/:id', auth, (req, res) => {
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
router.delete('/:id', auth, (req, res) => {
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
router.post('/:id/review', auth, (req, res) => {
  const user = req.user._id;
  const { id } = req.params;
  const { value } = req.body;

  Review.create(value, id, user)
    .then(() => Card.review(id, user))
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

// DELETE /cards/:id/review
router.delete('/:id/review', auth, (req, res) => {
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

// GET /cards/count/all
router.get('/count/all', auth, (req, res) => {
  // TODO: retrieve number of all cards
  res.status(400);
});

// GET /cards/count/new
router.get('/count/new', auth, (req, res) => {
  // TODO: retrieve number of new cards
  res.status(400);
});

// GET /card/count/due
router.get('/count/due', auth, (req, res) => {
  // TODO: retrieve number of due cards
  res.status(400);
});

module.exports = router;
