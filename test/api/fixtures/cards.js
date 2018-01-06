const id = require("pow-mongodb-fixtures").createObjectId;

const deck1 = (exports.deck1 = id());
const deck2 = (exports.deck2 = id());
const deck3 = (exports.deck3 = id());

const user1 = (exports.user1 = {
  _id: id(),
  name: "Jane Tester",
  email: "jane@example.com",
});

const user2 = (exports.user2 = {
  _id: id(),
  name: "Joe Tester",
  email: "joe@example.com",
});

const cards = (exports.cards = [
  {
    _id: id(),
    front: "Card front 1",
    back: "Card back 1",
    user: user1._id,
    deck: deck1,
  },
  {
    _id: id(),
    front: "Card front 2",
    back: "Card back 2",
    user: user1._id,
    deck: deck2,
  },
  {
    _id: id(),
    front: "Card front 3",
    back: "Card back 3",
    user: user2._id,
    deck: deck3,
  },
  {
    _id: id(),
    front: "Card front 4",
    back: "Card back 4",
    user: user2._id,
    deck: deck3,
  },
]);
