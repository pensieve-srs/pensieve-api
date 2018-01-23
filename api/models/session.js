const Session = require('../../db/schemas/session');
const shuffle = require('../helpers/shuffle');
const mongoose = require('mongoose');

module.exports.types = {
  learn: 'learn',
  review: 'review',
  deck: 'deck',
};

module.exports.get = function get(id, user) {
  return Session.findOne({ _id: id, user }).populate({
    path: 'cards',
    model: 'Card',
    populate: { path: 'deck', model: 'Deck' },
  });
};

module.exports.create = function create(type, user, cards) {
  const cardIds = shuffle(cards).map(card => card._id);

  const data = {
    user,
    type,
    cards: cardIds,
  };

  return Session.findOneAndUpdate({ _id: mongoose.Types.ObjectId() }, data, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
    populate: 'cards',
  });
};
