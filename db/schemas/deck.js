const mongoose = require('mongoose');

const { Schema } = mongoose;

const DeckSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    notes: { type: String },
    description: { type: String },
    cardsCount: { type: Number },
    recallRate: { type: Number },
    hidden: { type: Boolean, default: false },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  },
  {
    timestamps: true,
  },
);

module.exports = DeckSchema;
