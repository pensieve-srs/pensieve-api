const Review = require('../../db/schemas/review');

module.exports.create = function create(card, value, user) {
  return Review.create({
    user,
    card,
    value,
  });
};

module.exports.get = function get(id, user) {
  return Review.findOne({
    _id: id,
    user,
  });
};

module.exports.countAll = function countAll(range, user) {
  if (range === 'weekly') {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
    return Review.aggregate([
      { $match: { createdAt: { $gt: oneWeekAgo }, user } },
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
