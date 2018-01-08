/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-vars */

const id = require('pow-mongodb-fixtures').createObjectId;

const user1 = (exports.user1 = {
  _id: id(),
  name: 'Jane Tester',
  email: 'jane@example.com',
});

const user2 = (exports.user2 = {
  _id: id(),
  name: 'Joe Tester',
  email: 'joe@example.com',
});

const cards = (exports.cards = [
  {
    _id: id(),
    front: 'Card front 1',
    back: 'Card back 1',
    user: user1._id,
  },
  {
    _id: id(),
    front: 'Card front 2',
    back: 'Card back 2',
    user: user1._id,
  },
]);

const sessions = (exports.sessions = [
  {
    _id: id(),
    type: 'deck',
    user: user1._id,
    cards: [cards[0]._id, cards[1]._id],
  },
  {
    _id: id(),
    type: 'review',
    user: user2._id,
    cards: [cards[0]._id, cards[1]._id],
  },
]);
