const mongoose = require('mongoose');

const { Schema } = mongoose;

const DeckSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    cardsCount: { type: Number },
    recallRate: { type: Number },
    hidden: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

module.exports = DeckSchema;
