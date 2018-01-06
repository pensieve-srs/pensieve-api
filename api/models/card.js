const Card = require("../../db/schemas/card");
const removeEmpty = require("../helpers/removeEmpty");
const SM2 = require("../controllers/sm2");

module.exports.get = function(id, user) {
  return Card.findOne({ _id: id, user: user });
};

module.exports.getAll = function(user) {
  return Card.find({ user: user });
};

module.exports.getAllByDeck = function(deck, user) {
  return Card.find({ user: user, deck: deck });
};

module.exports.create = function(body, user) {
  return Card.create({
    user: user,
    front: body.front,
    back: body.back,
    deck: body.deck,
  });
};

module.exports.update = function(id, body, user) {
  return Card.findOneAndUpdate(
    { _id: id, user: user },
    removeEmpty({ front: body.front, back: body.back }),
    { new: true },
  );
};

module.exports.delete = function(id, user) {
  return Card.remove({ _id: id, user: user });
};

module.exports.deleteAll = function(user) {
  return Card.remove({ user: user });
};

module.exports.deleteAllByDeck = function(deckId, user) {
  return Card.remove({ deck: deckId, user: user });
};

module.exports.resetAllByDeck = function(deckId, user) {
  return Card.update(
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

module.exports.review = function(id, value, user) {
  return Card.findOne({ _id: id, user: user }).then(card => {
    const grade = SM2.getGrade(value);
    card.reviewedAt = new Date();

    if (grade < 3) {
      card.repetitions = 0;
      card.interval = 0;
    } else {
      card.repetitions = card.repetitions + 1;
      card.EF = SM2.getEF(card.EF, grade);
      card.interval = SM2.getNextInterval(card, grade);
    }
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + card.interval);
    card.nextReviewDate = nextReviewDate;

    return card.save();
  });
};

module.exports.reset = function(id, user) {
  return Card.findOne({ _id: id, user: user })
    .populate("deck")
    .then(card => {
      card.repetitions = 0;
      card.EF = 2.5;
      card.nextReviewDate = undefined;
      card.interval = undefined;
      card.reviewedAt = undefined;

      return card.save();
    });
};
