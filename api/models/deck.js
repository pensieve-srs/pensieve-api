const Deck = require("../../db/schemas/deck");
const removeEmpty = require("../helpers/removeEmpty");

module.exports.get = function(id, user) {
  return Deck.findOne({ _id: id, user: user });
};

module.exports.all = function(user) {
  return Deck.find({ user: user });
};

module.exports.create = function(body, user) {
  return Deck.create({
    user: user,
    title: body.title,
    description: body.description,
  });
};

module.exports.update = function(id, body, user) {
  return Deck.findOneAndUpdate(
    { _id: id, user: user },
    removeEmpty({ title: body.title, description: body.description }),
    { new: true },
  );
};

module.exports.delete = function(id, user) {
  return Deck.remove({ _id: id, user: user });
};

module.exports.deleteAll = function(user) {
  return Deck.remove({ user: user });
};
