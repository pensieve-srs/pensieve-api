const express = require('express');

const Tag = require('../models/tag');

const router = express.Router();

// GET /tags
router.get('/', async (req, res) => {
  const user = req.user._id;

  try {
    const tags = await Tag.getAll(user);

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST /tags
router.post('/', async (req, res) => {
  const user = req.user._id;
  const { value } = req.body;

  try {
    const tag = await Tag.new(value, user);

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
