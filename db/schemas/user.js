const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, index: { unique: true } },
    name: { type: String },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    prefs: {
      emailNotifs: { type: Boolean, default: true },
      sessionSize: { type: Number, default: 30 },
    },
  },
  { timestamps: true },
);

module.exports = UserSchema;
