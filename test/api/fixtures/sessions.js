const id = require("pow-mongodb-fixtures").createObjectId;

const user1 = (exports.user1 = id());
const user2 = (exports.user2 = id());

const cards = (exports.cards = [
  {
    _id: id(),
    front: "Card front 1",
    back: "Card back 1",
    user: user1,
  },
  {
    _id: id(),
    front: "Card front 2",
    back: "Card back 2",
    user: user1,
  },
]);

const sessions = (exports.sessions = [
  {
    _id: id(),
    type: "deck",
    user: user1,
    cards: [cards[0]._id, cards[1]._id],
  },
  {
    _id: id(),
    type: "review",
    user: user2,
    cards: [cards[0]._id, cards[1]._id],
  },
]);
