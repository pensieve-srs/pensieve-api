const Item = require("../../db/schemas/item");

module.exports.deleteAllByDeck = function(deckId, user) {
  return Item.remove({ deck: deckId, user: user });
};

module.exports.resetAllByDeck = function(deckId, user) {
  return Item.update(
    { deck: deckId, user: user },
    {
      $set: {
        repetitions: 0,
        EF: 2.5,
      },
      $unset: {
        nextReviewDate: 1,
        interval: 1,
        reviewedAt: 1,
      },
    },
    { multi: true, new: true },
  );
};
