const Session = require("../../db/schemas/session");
const Card = require("./Card");
const shuffle = require("../helpers/shuffle");
const mongoose = require("mongoose");

// TODO: Move session size to user model
module.exports.maxSize = 30;

module.exports.types = {
  learn: "learn",
  review: "review",
  deck: "deck",
};

module.exports.get = function(id, user) {
  return Session.findOne({ _id: id, user: user }).populate({
    path: "cards",
    model: "Card",
    populate: { path: "deck", model: "Deck" },
  });
};

module.exports.create = function(type, user, cards) {
  const cardIds = shuffle(cards).map(card => card._id);

  const data = {
    user: user,
    type: type,
    cards: cardIds,
  };

  return Session.findOneAndUpdate({ _id: mongoose.Types.ObjectId() }, data, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
    populate: "cards",
  });
};
