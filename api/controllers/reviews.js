const express = require('express');

const Review = require('../models/review');

const router = express.Router();

// GET /reviews
router.get('/', (req, res) => {
  const user = req.user._id;
  const { range } = req.query;

  Review.countAll(range, user)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.status(500).json(response);
    });
});

module.exports = router;
