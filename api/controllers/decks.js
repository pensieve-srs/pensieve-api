const express = require("express");
const router = express.Router();
const AuthController = require("./authentication");

const Deck = require("../models/deck");
const Item = require("../models/item");

// GET /decks
router.get("/", AuthController.authenticateUser, function(req, res) {
  const user = req.user._id;

  Deck.allByUser(user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// POST /decks
router.post("/", AuthController.authenticateUser, function(req, res) {
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
router.get("/:id", AuthController.authenticateUser, function(req, res) {
  const id = req.params.id;
  const user = req.user._id;

  Deck.getByUser(deck, user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// PUT /decks/:id
router.put("/:id", AuthController.authenticateUser, function(req, res) {
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
router.delete("/:id", AuthController.authenticateUser, function(req, res) {
  const id = req.params.id;
  const user = req.user._id;

  Deck.delete(id, user)
    .then(() => {
      return Item.deleteAllByDeck(id, user);
    })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// DELETE /decks/:id/review
router.delete("/:id/review", AuthController.authenticateUser, function(req, res) {
  const deckId = req.params.id;
  const user = req.user._id;

  Item.resetAllByDeck(deckId, user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

module.exports = router;
