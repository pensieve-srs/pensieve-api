const mongoose = require('mongoose');

const SRS = require('../../srs/schedule');

const CardReviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
    reviewedAt: { type: Date }, // date of last review
    nextReviewDate: { type: Date, required: true },
    interval: { type: Number },
    easinessFactor: { type: Number, default: SRS.defaultEasiness },
    repetitions: { type: Number, default: 0 },
    recallRate: { type: Number },
    value: { type: String },
  },
  { timestamps: true },
);

class ReviewClass {
  static study(card, value, user) {
    return this.create({ card, user, value });
  }

  static reset(card, user) {
    return this.remove({ card, user });
  }
}

CardReviewSchema.loadClass(ReviewClass);

module.exports = mongoose.model('CardReview', CardReviewSchema);
