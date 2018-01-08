/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-vars */

const id = require('pow-mongodb-fixtures').createObjectId;
const User = require('../../../api/models/user');

const password1 = (exports.password1 = 'password 1');

const users = (exports.users = [
  {
    _id: id(),
    name: 'Jane Tester',
    email: 'jane@example.com',
    password: User.generateHash(password1),
  },
  {
    _id: id(),
    name: 'Joe Tester',
    email: 'joe@example.com',
    password: User.generateHash('1234k'),
  },
  {
    _id: id(),
    name: 'Sarah Tester',
    email: 'sarah@example.com',
    password: User.generateHash('1234h'),
  },
]);
