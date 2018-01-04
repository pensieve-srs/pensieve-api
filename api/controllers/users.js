const express = require("express");
const router = express.Router();
const AuthController = require("./authentication");

const User = require("../models/user");
const Item = require("../models/item");
const Deck = require("../models/deck");

// GET /users/profile
router.get("/profile", AuthController.authenticateUser, function(req, res) {
  const id = req.user._id;

  User.get(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// PUT /users/profile
router.put("/profile", AuthController.authenticateUser, function(req, res) {
  const id = req.user._id;
  const body = req.body;

  User.update(body, id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(response => {
      res.status(500).json(response);
    });
});

// DELETE /users/profile
router.delete("/profile", AuthController.authenticateUser, function(req, res) {
  const user = req.user._id;

  User.delete(user)
    .then(() => {
      return Item.deleteAllByUser(user);
    })
    .then(() => {
      return Deck.deleteAllByUser(user);
    })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(respnse => {
      res.status(500).json(response);
    });
});

// POST /users/signup
router.post("/signup", function(req, res) {
  const body = req.body;

  User.create(body)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      if (error.message === "Invalid User") {
        res.status(400).json(error);
      } else {
        res.status(500).json(error);
      }
    });
});

// POST /users/login
router.post("/login", function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.authenticate(email, password)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      if (error.message === "Invalid User") {
        res.status(400).json(error);
      } else {
        res.status(500).json(error);
      }
    });
});

module.exports = router;
