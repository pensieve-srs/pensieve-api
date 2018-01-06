const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const Card = require("../models/card");
const Review = require("../models/review");

// POST /cards
router.post("/", auth, function(req, res) {
  const user = req.user._id;
  const body = req.body;

  Card.create(body, user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// GET /cards/:id
router.get("/:id", auth, function(req, res) {
  const id = req.params.id;
  const user = req.user._id;

  Card.get(id, user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// PUT /cards/:id
router.put("/:id", auth, function(req, res) {
  const id = req.params.id;
  const user = req.user._id;

  Card.update(id, body, user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// DELETE /cards/:id
router.delete("/:id", auth, function(req, res) {
  const id = req.params.id;
  const user = req.user._id;

  Card.delete(id, user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// POST /cards/:id/review
router.post("/:id/review", auth, function(req, res) {
  const card = req.params.id;
  const user = req.user._id;
  const value = req.body.value;

  Review.create(value, card, user)
    .then(() => {
      return Card.review(id, user);
    })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// DELETE /cards/:id/review
router.delete("/:id/review", auth, function(req, res) {
  const id = req.params.id;
  const user = req.user._id;

  Card.reset(id, user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// GET /cards/count/all
router.get("/count/all", auth, function(req, res) {
  // TODO: retrieve number of all cards
});

// GET /cards/count/new
router.get("/count/new", auth, function(req, res) {
  // TODO: retrieve number of new cards
});

// GET /card/count/due
router.get("/count/due", auth, function(req, res) {
  // TODO: retrieve number of due cards
});

module.exports = router;
