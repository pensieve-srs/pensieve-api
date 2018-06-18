const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    card: { type: Schema.Types.ObjectId, ref: 'Card', required: true },
    value: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Review', ReviewSchema);
