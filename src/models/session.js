const mongoose = require('mongoose');
const shuffle = require('../helpers/shuffle');
const sessionTypes = require('../utils/sessionTypes');

const { Schema } = mongoose;

const SessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cards: [{ type: Schema.ObjectId, ref: 'Card', required: true }],
    type: { type: String, enum: sessionTypes, required: true },
  },
  { timestamps: true },
);

class SessionClass {
  static get(id, user) {
    return this.findOne({ _id: id, user }).populate({
      path: 'cards',
      model: 'Card',
      populate: { path: 'deck', model: 'Deck' },
    });
  }

  static new(type, user, cards) {
    const cardIds = shuffle(cards).map(card => card._id);
    return this.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId() },
      {
        user,
        type,
        cards: cardIds,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        populate: 'cards',
      },
    );
  }
}

SessionSchema.loadClass(SessionClass);

module.exports = mongoose.model('Session', SessionSchema);
