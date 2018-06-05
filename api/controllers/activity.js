const express = require('express');
const moment = require('moment');

const CardSchema = require('../../db/schemas/card');
const ReviewSchema = require('../../db/schemas/review');

const router = express.Router();

// GET /activity
router.get('/', async (req, res) => {
  const user = req.user._id;
  const { deck } = req.query;
  const oneWeekAgo = moment().subtract(1, 'week');

  try {
    const cards = await CardSchema.find({ deck, user });
    let results = await ReviewSchema.aggregate([
      {
        $match: {
          createdAt: { $lte: new Date(oneWeekAgo) },
          card: { $in: cards.map(el => el._id) },
        },
      },
      {
        $project: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' },
          hour: { $hour: '$createdAt' },
          user: 1,
          value: 1,
          card: 1,
        },
      },
      {
        $group: {
          _id: {
            createdAt: {
              year: '$year',
              month: '$month',
              day: '$day',
              hour: '$hour',
            },
          },
          reviews: {
            $push: {
              _id: '$_id',
              user: '$user',
              value: '$value',
              card: '$card',
            },
          },
        },
      },
    ]);

    results = results.map(({
      _id: {
        createdAt: {
          year, month, day, hour,
        },
      }, reviews, ...other
    }) => ({
      ...other,
      reviews: reviews.length,
      createdAt: new Date(year, month, day, hour),
    }));

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
