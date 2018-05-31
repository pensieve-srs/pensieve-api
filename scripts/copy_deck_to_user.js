/* eslint-disable no-console */
process.env.NODE_ENV = 'development';
require('../config/env').config();

require('../db').connect();

const User = require('../api/models/user');
const Deck = require('../api/models/deck');
const Card = require('../db/schemas/card');

async function exec() {
  try {
    console.log(`Duplicating deck, ${process.env.DECK}, for user: ${process.env.EMAIL}`);
    const user = await User.findOne({ email: process.env.EMAIL });
    const deck = await Deck.findOne({ _id: process.env.DECK });
    const clone = await Deck.create({
      user: user._id,
      title: deck.title,
      description: deck.description,
    });
    const cards = await Card.find({ deck: deck._id });

    cards.forEach(async (card) => {
      await Card.create({
        user: user._id,
        deck: clone._id,
        front: card.front,
        back: card.back,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

exec();
