const DeckSchema = require('../../db/schemas/deck');
const removeEmpty = require('../helpers/removeEmpty');

const mongoose = require('mongoose');

const createDefaultNotes = deck => `## ${deck.title}\n\n${deck.description}`;

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
      notes: body.notes || createDefaultNotes(body),
    });
  }

  static update(id, body, user) {
    return this.findOneAndUpdate(
      { _id: id, user },
      removeEmpty({
        title: body.title,
        description: body.description,
        tags: body.tags,
        notes: body.notes,
      }),
      { new: true },
    ).populate('tags');
  }
}

DeckSchema.loadClass(DeckClass);

module.exports = mongoose.model('Deck', DeckSchema);
