const Review = require("../../db/schemas/review");

module.exports.create = function(value, card, user) {
  return Review.create({
    user: user,
    card: card,
    value: value,
  });
};
