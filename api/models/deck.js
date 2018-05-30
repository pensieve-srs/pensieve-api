const DeckSchema = require('../../db/schemas/deck');
const removeEmpty = require('../helpers/removeEmpty');

const mongoose = require('mongoose');

class DeckClass {
  static get(id, user) {
    return this.findOne({ _id: id, user }).populate('tags');
  }

  static new(body, user) {
    return this.create({
      user,
      title: body.title,
      description: body.description,
      tags: body.tags,
    });
  }

  static update(id, body, user) {
    return this.findOneAndUpdate(
      { _id: id, user },
      removeEmpty({ title: body.title, description: body.description, tags: body.tags }),
      { new: true },
    ).populate('tags');
  }
}

DeckSchema.loadClass(DeckClass);

module.exports = mongoose.model('Deck', DeckSchema);
