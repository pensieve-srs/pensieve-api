const Review = require('../../db/schemas/review');
const mongoose = require('mongoose');

module.exports.create = (card, value, user) => Review.create({ user, card, value });

module.exports.get = (id, user) => Review.findOne({ _id: id, user });

module.exports.getAll = user => Review.find({ user });

module.exports.countAll = user => Review.count({ user });

module.exports.countAllForRange = function countAllForRange(range, user) {
  if (range === 'weekly') {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
    return Review.aggregate([
      { $match: { user: mongoose.Types.ObjectId(user), createdAt: { $gt: oneWeekAgo } } },
      {
        $project: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        },
      },
      {
        $group: {
          _id: '$date',
          count: { $sum: 1 },
        },
      },
    ]);
  }

  return Review.find({ user });
};
