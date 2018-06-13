const Card = require('../models/card');
const Deck = require('../models/deck');
const Tag = require('../models/tag');
const decks = require('./defaultDecks');

module.exports = async (user) => {
  await Promise.all(decks.map(async (data) => {
    // Build default tags
    const tags = await Promise.all(data.tags.map(async ({ value }) => {
      let tag = await Tag.findOne({ value });
      if (!tag) {
        tag = await Tag.new(value, user);
      }
      return tag;
    }));

      // Build default deck
    const deck = await Deck.new(
      {
        title: data.title,
        description: data.description,
        notes: data.notes,
        tags: tags.map(el => el._id),
      },
      user,
    );

      // Build default cards
    const cards = await Promise.all(data.cards.map(async ({ front, back }) => {
      const card = await Card.create(
        {
          front,
          back,
          deck: deck._id,
          nextReviewDate: new Date(),
        },
        user,
      );
      return card;
    }));

    return { deck, tags, cards };
  }));
};
