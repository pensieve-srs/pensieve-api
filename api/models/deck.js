const DeckSchema = require('../../db/schemas/deck');
const removeEmpty = require('../helpers/removeEmpty');

const mongoose = require('mongoose');

class DeckClass {
  static get(id, user) {
    return this.findOne({ _id: id, user });
  }

  static getAll(user) {
    return this.find({ user });
  }

  static countAll(user) {
    return this.count({ user });
  }

  static new(body, user) {
    return this.create({
      user,
      title: body.title,
      description: body.description,
    });
  }

  static update(id, body, user) {
    return this.findOneAndUpdate(
      { _id: id, user },
      removeEmpty({ title: body.title, description: body.description }),
      { new: true },
    );
  }

  static delete(id, user) {
    return this.remove({ _id: id, user });
  }

  static deleteAll(user) {
    return this.remove({ user });
  }
}

DeckSchema.loadClass(DeckClass);

module.exports = mongoose.model('Deck', DeckSchema);
