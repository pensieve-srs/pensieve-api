const id = require("pow-mongodb-fixtures").createObjectId;

const user1 = (exports.user1 = id());
const user2 = (exports.user2 = id());

const decks = (exports.decks = [
  {
    _id: id(),
    title: "Deck title 1",
    description: "Deck description 1",
    user: user1,
  },
  {
    _id: id(),
    title: "Deck title 2",
    description: "Deck description 2",
    user: user1,
  },
  {
    _id: id(),
    title: "Deck title 3",
    description: "Deck description 3",
    user: user2,
  },
]);
