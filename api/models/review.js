const Review = require("../../db/schemas/review");

module.exports.create = function(value, card, user) {
  return Review.create({
    user: user,
    card: card,
    value: value,
  });
};

module.exports.get = function(id, user) {
  return Review.findOne({
    _id: id,
    user: user,
  });
};
