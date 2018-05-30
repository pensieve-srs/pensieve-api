const mongoose = require('mongoose');

const { Schema } = mongoose;

const InviteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    value: { type: String, required: true },
    isUsed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Invite', InviteSchema);
