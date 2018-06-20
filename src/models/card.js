const mongoose = require('mongoose');

const SRS = require('../../srs/sm2-plus');
const removeEmpty = require('../helpers/removeEmpty');
const calcReviewGrade = require('../helpers/calcReviewGrade');

const { DEFAULT_DIFFICULTY } = SRS;

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
    difficulty: { type: Number, default: DEFAULT_DIFFICULTY },
    nextReviewDate: { type: Date, required: true },
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

  static update(id, body, user) {
    const { front, back, notes } = body;
    return this.findOneAndUpdate({ _id: id, user }, removeEmpty({ front, back, notes }), {
      new: true,
    }).populate('deck');
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

  static async review(id, value, user) {
    const card = await this.findOne({ _id: id, user });

    const performanceGrade = calcReviewGrade(value);
    const result = SRS.calculate(
      card.reviewedAt,
      card.difficulty || DEFAULT_DIFFICULTY,
      card.interval || 1,
      performanceGrade,
      new Date(),
    );

    return this.findOneAndUpdate(
      { _id: id, user },
      {
        reviewedAt: result.reviewedAt,
        difficulty: result.difficulty,
        interval: result.interval,
        nextReviewDate: result.nextReviewDate,
      },
      {
        new: true,
      },
    ).populate('deck');
  }

  static reset(id, user) {
    return this.findOne({ _id: id, user })
      .populate('deck')
      .then((card) => {
        card.repetitions = 0; // eslint-disable-line no-param-reassign
        card.EF = 2.5; // eslint-disable-line no-param-reassign
        card.difficulty = 0.3; // eslint-disable-line no-param-reassign
        card.nextReviewDate = undefined; // eslint-disable-line no-param-reassign
        card.interval = undefined; // eslint-disable-line no-param-reassign
        card.reviewedAt = undefined; // eslint-disable-line no-param-reassign

        return card.save();
      });
  }
}

CardSchema.loadClass(CardClass);

module.exports = mongoose.model('Card', CardSchema);
