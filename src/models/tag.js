const mongoose = require('mongoose');

const { Schema } = mongoose;

const TagSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    value: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Tag', TagSchema);
