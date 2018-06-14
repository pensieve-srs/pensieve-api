/* eslint-disable no-console */
process.env.NODE_ENV = 'development';
require('../config/env').config();
require('../db').connect();

const User = require('../db/schemas/user');
const Deck = require('../api/models/deck');
const Card = require('../db/schemas/card');
const Tag = require('../api/models/tag');

async function exec() {
  try {
    console.log(`Duplicating deck, ${process.env.DECK}, for user: ${process.env.EMAIL}`);
    const user = await User.findOne({ email: process.env.EMAIL });
    const deck = await Deck.findOne({ _id: process.env.DECK });
    // Clone over tags
    const tags = await Promise.all(deck.tags.map(async (id) => {
      const tag = await Tag.findOne({ _id: id });

      const result = await Tag.new(tag.value, user);
      return result;
    }));

    // Clone decks
    const clone = await Deck.create({
      user: user._id,
      title: deck.title,
      description: deck.description,
      notes: deck.notes,
      tags: tags.map(el => el._id),
    });

    const cards = await Card.find({ deck: deck._id });

    cards.forEach(async (card) => {
      // Clone cards
      await Card.create({
        user: user._id,
        deck: clone._id,
        front: card.front,
        back: card.back,
        notes: card.notes,
        nextReviewDate: new Date(),
      });
    });
  } catch (error) {
    console.log(error);
  }
}

exec();
