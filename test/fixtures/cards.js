/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-vars */
const id = require('pow-mongodb-fixtures').createObjectId;
const { userWithEmailNotifs, userWithoutEmailNotifs } = require('./users');

const deck1 = (exports.deck1 = id());
const deck2 = (exports.deck2 = id());
const deck3 = (exports.deck3 = id());

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

const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
const oneDayAgo = new Date();
oneDayAgo.setDate(oneDayAgo.getDate() - 1);

const cards = (exports.cards = [
  {
    _id: id(),
    front: 'Card front 1',
    back: 'Card back 1',
    user: user1._id,
    deck: deck1,
  },
  {
    _id: id(),
    front: 'Card front 2',
    back: 'Card back 2',
    user: user1._id,
    deck: deck2,
  },
  {
    _id: id(),
    front: 'Card front 3',
    back: 'Card back 3',
    user: user2._id,
    deck: deck3,
  },
  {
    _id: id(),
    front: 'Card front 4',
    back: 'Card back 4',
    user: user2._id,
    deck: deck3,
  },
  {
    _id: id(),
    front: 'Card front 5',
    back: 'Card back 5',
    user: userWithEmailNotifs._id,
    deck: deck3,
    nextReviewDate: oneWeekAgo,
    createdAt: new Date(),
  },
  {
    _id: id(),
    front: 'Card front 6',
    back: 'Card back 6',
    user: userWithEmailNotifs._id,
    deck: deck3,
    nextReviewDate: oneWeekAgo,
    createdAt: new Date(),
  },
  {
    _id: id(),
    front: 'Card front 7',
    back: 'Card back 7',
    user: userWithoutEmailNotifs._id,
    deck: deck3,
    nextReviewDate: oneWeekAgo,
    createdAt: new Date(),
  },
  {
    _id: id(),
    front: 'Card front 8',
    back: 'Card back 8',
    user: userWithoutEmailNotifs._id,
    deck: deck3,
    nextReviewDate: oneWeekAgo,
    createdAt: new Date(),
  },
  {
    _id: id(),
    front: 'Card front 9',
    back: 'Card back 9',
    user: userWithEmailNotifs._id,
    deck: deck3,
    nextReviewDate: oneWeekAgo,
    createdAt: new Date(),
  },
  {
    _id: id(),
    front: 'Card front 10',
    back: 'Card back 10',
    user: userWithEmailNotifs._id,
    deck: deck3,
    nextReviewDate: oneWeekAgo,
    createdAt: new Date(),
  },
]);
