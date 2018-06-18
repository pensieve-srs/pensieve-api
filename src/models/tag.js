const mongoose = require('mongoose');

const { Schema } = mongoose;

const TagSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    value: { type: String, required: true },
  },
  { timestamps: true },
);

class TagClass {
  static getAll(user) {
    return this.find({ user });
  }

  static new(value, user) {
    return this.create({
      user,
      value,
    });
  }
}

TagSchema.loadClass(TagClass);

module.exports = mongoose.model('Tag', TagSchema);
