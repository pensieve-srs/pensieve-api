const Session = require('./session');
const Card = require('../../db/schemas/card');
const User = require('./user');

const SM2 = require('../helpers/sm2');
const removeEmpty = require('../helpers/removeEmpty');

module.exports.get = (id, user) => Card.findOne({ _id: id, user }).populate('deck');

module.exports.getAll = user => Card.find({ user });

module.exports.countAll = user => Card.count({ user });

module.exports.countAllForDeck = (deck, user) => Card.count({ user, deck });

module.exports.getAllForType = (type, user) => {
  switch (type) {
    case 'due':
      return this.getAllDue(user);
    case 'learn':
      return this.getAllNew(user);
    default:
      return Card.find({ user });
  }
};

module.exports.getAllNew = function getAllNew(user) {
  return Card.find({ user, repetitions: 0 });
};

module.exports.countAllNew = user => Card.count({ user, repetitions: 0 });

module.exports.getAllDue = user =>
  Card.find({ user })
    .where('nextReviewDate')
    .lt(new Date());

module.exports.countAllDue = user =>
  Card.count({ user })
    .where('nextReviewDate')
    .lt(new Date());

module.exports.getAllByDeck = function getAllByDeck(deck, user) {
  return Card.find({ user, deck });
};

module.exports.getAllForSessionType = function getAllForSessionType(type, user, deck) {
  return User.getSessionSize(user).then((maxSize) => {
    switch (type) {
      case Session.types.learn:
        return Card.find({ user, repetitions: 0 })
          .populate('deck')
          .limit(maxSize);
      case Session.types.review:
        return Card.find({ user })
          .populate('deck')
          .where('nextReviewDate')
          .lt(new Date())
          .limit(maxSize);
      case Session.types.deck:
        return Card.find({ user, deck })
          .populate('deck')
          .sort('nextReviewDate')
          .where('nextReviewDate')
          .lt(new Date());
      default:
        return false;
    }
  });
};

module.exports.create = function create(body, user) {
  const oneHourFuture = new Date();
  oneHourFuture.setHours(oneHourFuture.getHours() + 1);

  return Card.create({
    user,
    front: body.front,
    back: body.back,
    deck: body.deck,
    notes: body.notes,
    nextReviewDate: oneHourFuture,
  });
};

module.exports.update = function update(id, body, user) {
  return Card.findOneAndUpdate(
    { _id: id, user },
    removeEmpty({ front: body.front, back: body.back, notes: body.notes }),
    { new: true },
  ).populate('deck');
};

module.exports.delete = function deleteCard(id, user) {
  return Card.remove({ _id: id, user });
};

module.exports.deleteAll = function deleteAll(user) {
  return Card.remove({ user });
};

module.exports.deleteAllByDeck = function deleteAllByDeck(deckId, user) {
  return Card.remove({ deck: deckId, user });
};

module.exports.resetAllByDeck = function resetAllByDeck(deckId, user) {
  return Card.update(
    { deck: deckId, user },
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

module.exports.review = function review(id, value, user) {
  return Card.findOne({ _id: id, user })
    .populate('deck')
    .then((card) => {
      const grade = SM2.getGrade(value);
      card.reviewedAt = new Date(); // eslint-disable-line no-param-reassign

      if (grade < 3) {
        card.repetitions = 0; // eslint-disable-line no-param-reassign
        card.interval = 0; // eslint-disable-line no-param-reassign
      } else {
        card.repetitions += 1; // eslint-disable-line no-param-reassign
        card.EF = SM2.getEF(card.EF, grade); // eslint-disable-line no-param-reassign
        card.interval = SM2.getNextInterval(card, grade); // eslint-disable-line no-param-reassign
      }
      const nextReviewDate = new Date();
      nextReviewDate.setDate(nextReviewDate.getDate() + card.interval);
      card.nextReviewDate = nextReviewDate; // eslint-disable-line no-param-reassign

      return card.save();
    });
};

module.exports.reset = function reset(id, user) {
  return Card.findOne({ _id: id, user })
    .populate('deck')
    .then((card) => {
      card.repetitions = 0; // eslint-disable-line no-param-reassign
      card.EF = 2.5; // eslint-disable-line no-param-reassign
      card.nextReviewDate = undefined; // eslint-disable-line no-param-reassign
      card.interval = undefined; // eslint-disable-line no-param-reassign
      card.reviewedAt = undefined; // eslint-disable-line no-param-reassign

      return card.save();
    });
};
