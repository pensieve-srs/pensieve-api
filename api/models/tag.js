const TagSchema = require('../../db/schemas/tag');

const mongoose = require('mongoose');

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
