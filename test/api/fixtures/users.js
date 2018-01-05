var id = require("pow-mongodb-fixtures").createObjectId;

var users = (exports.users = [
  {
    _id: id(),
    name: "Jane Tester",
    email: "janetester@example.com",
    password: "1234l",
  },
  {
    _id: id(),
    name: "Joe Tester",
    email: "joetester@example.com",
    password: "1234k",
  },
]);
