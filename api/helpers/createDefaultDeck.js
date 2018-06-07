const Card = require('../models/card');
const Deck = require('../models/deck');
const Tag = require('../models/tag');

const welcomeText = `
### 🚀Welcome to Pensieve

Pensieve is a spaced repetition tool that keeps your ability to remember anything sharp.

> "I use Pensieve. One simply siphons the excess thoughts from one's mind, pours them into the basin, and examines them at one's leisure. It becomes easier to spot patterns and links, you understand, when they are in this form."
>
>  - Albus Dumbledore


### 👾Use it or lose it

Over time your memory of anything fades. By using that material, you will restrengthen your memory of it and keep it in your memory longer.

### ⚡️How it works
Your deck's recall bar will decrease over time. Studying these decks will replenish their strength. After repeated reviews, you will see each deck less and less.

### 📬Questions
For questions, issues, or feedback, please contact hello@pensieve.space.
`;

module.exports = async (user) => {
  const tag = await Tag.new('Pensieve 101', user);
  const deck = await Deck.new(
    {
      title: 'Welcome to Pensieve',
      description: 'This is an example deck to show you how Pensieve works.',
      tags: [tag._id],
      notes: welcomeText,
    },
    user,
  );

  await Card.create(
    {
      front: 'Every deck has a set of cards with a front side...',
      back: '...and a back side.',
      deck: deck._id,
      nextReviewDate: new Date(),
    },
    user,
  );

  await Card.create(
    {
      front: "Your card's strength will decrease over time.",
      back: 'Studying the cards will replenish their strength.',
      deck: deck._id,
      nextReviewDate: new Date(),
    },
    user,
  );

  await Card.create(
    {
      front: "Try to keep a card's strength above 50%.",
      back:
        'If you have notifications on, you will notified when one of your decks drops below 50%.',
      deck: deck._id,
      nextReviewDate: new Date(),
    },
    user,
  );

  await Card.create(
    {
      front: 'You can review cards again from this page.',
      back: 'You can also edit and delete these cards from here.',
      deck: deck._id,
      nextReviewDate: new Date(),
    },
    user,
  );

  await Card.create(
    {
      front: 'If you have any issues, feel free to contact me at niko@pensieve.space.',
      back: "That's all! Thanks for trying it out 👋.",
      deck: deck._id,
      nextReviewDate: new Date(),
    },
    user,
  );
};
