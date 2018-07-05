const mongoose = require('mongoose');

const SM2 = require('../helpers/sm2');
const removeEmpty = require('../helpers/removeEmpty');

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

  static updateCard(id, body, user) {
    const { front, back, notes } = body;
    return this.findOneAndUpdate({ _id: id, user }, removeEmpty({ front, back, notes }), {
      new: true,
    }).populate('deck');
  }

  static resetAllByDeck(deckId, user) {
    return this.bulkWrite([
      {
        updateMany: {
          filter: {
            deck: deckId,
            user,
          },
          update: {
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
        },
      },
    ]);
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
