const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const Session = require("../models/session");
const Card = require("../models/card");

// POST /sessions
router.post("/", auth, function(req, res) {
  const user = req.user._id;
  const type = req.body.type;
  const deck = req.body.deck;

  Card.getAllForSessionType(type, user, deck)
    .then(cards => {
      return Session.create(type, user, cards);
    })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// GET /sessions/:id
router.get("/:id", auth, function(req, res) {
  const user = req.user._id;
  const id = req.params.id;

  Session.get(id, user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

module.exports = router;
