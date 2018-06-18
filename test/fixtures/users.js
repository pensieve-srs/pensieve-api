/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-vars */

const id = require('pow-mongodb-fixtures').createObjectId;
const User = require('../../src/models/user');

const password1 = (exports.password1 = 'password1');

const userWithEmailNotifs = (exports.userWithEmailNotifs = {
  _id: id(),
  name: 'Tester 1',
  email: 'tester1@example.com',
  password: User.generateHash('password123'),
  prefs: {
    emailNotifs: true,
    sessionSize: 1,
  },
});

const userWithoutEmailNotifs = (exports.userWithoutEmailNotifs = {
  _id: id(),
  name: 'Tester 2',
  email: 'tester2@example.com',
  password: User.generateHash('password123'),
  prefs: {
    emailNotifs: false,
    sessionSize: 1,
  },
});

const userWithoutCards = (exports.userWithoutCards = {
  _id: id(),
  name: 'Tester 3',
  email: 'tester3@example.com',
  password: User.generateHash('password123'),
  prefs: {
    emailNotifs: true,
    sessionSize: 1,
  },
});

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
    password: User.generateHash('password123'),
  },
  {
    _id: id(),
    name: 'Sarah Tester',
    email: 'sarah@example.com',
    password: User.generateHash('password1234'),
  },
  userWithEmailNotifs,
  userWithoutEmailNotifs,
  userWithoutCards,
]);
