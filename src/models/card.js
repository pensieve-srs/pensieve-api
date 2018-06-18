const mongoose = require('mongoose');

const User = require('./user');

const SM2 = require('../helpers/sm2');
const removeEmpty = require('../helpers/removeEmpty');
const sessionTypes = require('../utils/sessionTypes');

const CardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    deck: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck' },
    front: { type: String, required: true },
    back: { type: String },
    notes: { type: String },
    reviewedAt: { type: Date }, // last review timestamp
    interval: { type: Number }, // review interval (in days)
    EF: { type: Number, default: 2.5 }, // SM-2 easiness factor
    nextReviewDate: { type: Date, required: true },
    repetitions: { type: Number, default: 0 }, // number of review repetitions
    recallRate: { type: Number },
  },
  { timestamps: true },
);

class CardClass {
  static get(id, user) {
    return this.findOne({ _id: id, user }).populate('deck');
  }
  static getAll(user) {
    return this.find({ user });
  }

  static countAll(user) {
    return this.count({ user });
  }

  static countAllForDeck(deck, user) {
    return this.count({ user, deck });
  }

  static getAllForType(type, user) {
    switch (type) {
      case 'due':
        return this.getAllDue(user);
      case 'learn':
        return this.getAllNew(user);
      default:
        return this.find({ user });
    }
  }

  static getAllNew(user) {
    return this.find({ user, repetitions: 0 });
  }

  static countAllNew(user) {
    return this.count({ user, repetitions: 0 });
  }

  static getAllDue(user) {
    return this.find({ user })
      .where('nextReviewDate')
      .lt(new Date());
  }

  static countAllDue(user) {
    return this.count({ user })
      .where('nextReviewDate')
      .lt(new Date());
  }

  static getAllByDeck(deck, user) {
    return this.find({ user, deck });
  }

  static getAllForSessionType(type, user, deck) {
    return User.getSessionSize(user).then((maxSize) => {
      switch (type) {
        case sessionTypes.learn:
          return this.find({ user, repetitions: 0 })
            .populate('deck')
            .limit(maxSize);
        case sessionTypes.review:
          return this.find({ user })
            .populate('deck')
            .where('nextReviewDate')
            .lt(new Date())
            .limit(maxSize);
        case sessionTypes.deck:
          return this.find({ user, deck })
            .populate('deck')
            .sort('nextReviewDate')
            .where('nextReviewDate')
            .lt(new Date());
        default:
          return false;
      }
    });
  }
  static new(body, user) {
    const oneHourFuture = new Date();
    oneHourFuture.setHours(oneHourFuture.getHours() + 1);

    return this.create({
      user,
      front: body.front,
      back: body.back,
      deck: body.deck,
      notes: body.notes,
      nextReviewDate: body.nextReviewDate || oneHourFuture,
    });
  }

  static update(id, body, user) {
    const { front, back, notes } = body;
    return this.findOneAndUpdate({ _id: id, user }, removeEmpty({ front, back, notes }), {
      new: true,
    }).populate('deck');
  }
  static delete(id, user) {
    return this.remove({ _id: id, user });
  }

  static deleteAll(user) {
    return this.remove({ user });
  }

  static deleteAllByDeck(deckId, user) {
    return this.remove({ deck: deckId, user });
  }

  static resetAllByDeck(deckId, user) {
    return this.update(
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
  }

  static review(id, value, user) {
    return this.findOne({ _id: id, user })
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
  }

  static reset(id, user) {
    return this.findOne({ _id: id, user })
      .populate('deck')
      .then((card) => {
        card.repetitions = 0; // eslint-disable-line no-param-reassign
        card.EF = 2.5; // eslint-disable-line no-param-reassign
        card.nextReviewDate = undefined; // eslint-disable-line no-param-reassign
        card.interval = undefined; // eslint-disable-line no-param-reassign
        card.reviewedAt = undefined; // eslint-disable-line no-param-reassign

        return card.save();
      });
  }
}

CardSchema.loadClass(CardClass);

module.exports = mongoose.model('Card', CardSchema);
