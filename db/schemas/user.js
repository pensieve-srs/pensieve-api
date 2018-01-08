const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    is_email_on: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
