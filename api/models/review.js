module.exports.create = function(value, card, user) {
  return ReviewSchema.create({
    user: user,
    card: card,
    value: value,
  });
};
