const Review = require('../../db/schemas/review');

module.exports.create = function create(value, card, user) {
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
