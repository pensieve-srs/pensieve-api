const Card = require('../models/card');
const Deck = require('../models/deck');

module.exports = async (user) => {
  const deck = await Deck.new(
    {
      title: 'Welcome to Pensieve',
      description: 'This is an example deck to show you how Pensieve works.',
    },
    user,
  );
  await Card.create(
    {
      front: 'Each deck has a set of cards',
      deck: deck._id,
    },
    user,
  );

  await Card.create(
    {
      front: 'Every card can have a front side...',
      back: '...and a back side.',
      deck: deck._id,
    },
    user,
  );

  await Card.create(
    {
      front: "Your card's strength will decrease over time.",
      back: 'Studying the cards will replenish their strength.',
      deck: deck._id,
    },
    user,
  );

  await Card.create(
    {
      front: "Try to keep a card's strength above 50%.",
      back:
        'If you have notifications on, you will notified when one of your decks drops below 50%.',
      deck: deck._id,
    },
    user,
  );

  await Card.create(
    {
      front: 'You can review cards again from this page.',
      back: 'You can also edit and delete these cards from here.',
      deck: deck._id,
    },
    user,
  );

  await Card.create(
    {
      front: 'If you have any issues, feel free to contact me at niko@pensieve.space.',
      back: "That's all! Thanks for trying it out 👋.",
      deck: deck._id,
    },
    user,
  );
};
