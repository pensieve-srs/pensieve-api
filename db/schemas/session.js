const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cards: [{ type: Schema.Types.ObjectId, ref: "Card", required: true }],
    type: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Session", SessionSchema);
