const express = require('express');

const Session = require('../models/session');
const Card = require('../models/card');

const router = express.Router();

// POST /sessions
router.post('/', (req, res) => {
  const user = req.user._id;
  const { type, deck } = req.body;

  // TODO: wrap in try/catch
  Card.getAllForSessionType(type, user, deck)
    // eslint-disable-next-line consistent-return
    .then((cards) => {
      if (!cards.length > 0) {
        res.status(400).json({
          message: 'No cards available to create session.',
        });
      } else {
        return Session.create(type, user, cards);
      }
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

// GET /sessions/:id
router.get('/:id', (req, res) => {
  const user = req.user._id;
  const { id } = req.params;

  Session.get(id, user)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

module.exports = router;
