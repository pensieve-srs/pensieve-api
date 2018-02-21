const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    prefs: {
      emailNotifs: { type: Boolean, default: true },
      sessionSize: { type: Number, default: 30 },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
