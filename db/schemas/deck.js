const mongoose = require('mongoose');

const { Schema } = mongoose;

const DeckSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    numCards: { type: Number },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Deck', DeckSchema);
