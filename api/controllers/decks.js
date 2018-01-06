const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const Deck = require("../models/deck");
const Card = require("../models/card");

// GET /decks
router.get("/", auth, function(req, res) {
  const user = req.user._id;

  Deck.all(user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// POST /decks
router.post("/", auth, function(req, res) {
  const user = req.user._id;
  const body = req.body;

  Deck.create(body, user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// GET /decks/:id
router.get("/:id", auth, function(req, res) {
  const id = req.params.id;
  const user = req.user._id;

  Deck.get(id, user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// PUT /decks/:id
router.put("/:id", auth, function(req, res) {
  const id = req.params.id;
  const user = req.user._id;
  const body = req.body;

  Deck.update(id, body, user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// DELETE /deck/:id
router.delete("/:id", auth, function(req, res) {
  const id = req.params.id;
  const user = req.user._id;

  Deck.delete(id, user)
    .then(() => {
      return Card.deleteAllByDeck(id, user);
    })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// DELETE /decks/:id/review
router.delete("/:id/review", auth, function(req, res) {
  const deckId = req.params.id;
  const user = req.user._id;

  Card.resetAllByDeck(deckId, user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

module.exports = router;
