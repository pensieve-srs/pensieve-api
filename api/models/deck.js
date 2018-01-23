const Deck = require('../../db/schemas/deck');
const removeEmpty = require('../helpers/removeEmpty');

module.exports = Deck;

module.exports.get = function get(id, user) {
  return Deck.findOne({ _id: id, user });
};

module.exports.getAll = user => Deck.find({ user });

module.exports.countAll = user => Deck.count({ user });

module.exports.create = function create(body, user) {
  return Deck.create({
    user,
    title: body.title,
    description: body.description,
  });
};

module.exports.update = function update(id, body, user) {
  return Deck.findOneAndUpdate(
    { _id: id, user },
    removeEmpty({ title: body.title, description: body.description }),
    { new: true },
  );
};

module.exports.delete = function deleteDeck(id, user) {
  return Deck.remove({ _id: id, user });
};

module.exports.deleteAll = function deleteAll(user) {
  return Deck.remove({ user });
};
