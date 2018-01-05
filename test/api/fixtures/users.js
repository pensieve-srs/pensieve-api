var id = require("pow-mongodb-fixtures").createObjectId;

var users = (exports.users = [
  {
    _id: id(),
    name: "Jane Tester",
    email: "jane@example.com",
    password: "1234l",
  },
  {
    _id: id(),
    name: "Joe Tester",
    email: "joe@example.com",
    password: "1234k",
  },
  {
    _id: id(),
    name: "Sarah Tester",
    email: "sarah@example.com",
    password: "1234h",
  },
]);
