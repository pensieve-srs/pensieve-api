/* eslint-disable no-console */
process.env.NODE_ENV = 'development';
require('../config/env').config();

require('../db').connect();
const moment = require('moment');
require('console.table');

require('../db/schemas/user');
const Deck = require('../api/models/deck');
const Review = require('../db/schemas/review');

const START_DATE = moment('2018-05-20');

const BLACK_LIST_DECKS = ['Welcome to Pensieve', 'Items'];

async function stats() {
  try {
    let currentDate = START_DATE;
    const results = [['DAY', 'DAUs', 'UMDs']];
    while (moment().isAfter(currentDate)) {
      const oneDayLater = moment(currentDate).add(1, 'day');
      // eslint-disable-next-line no-await-in-loop
      const activeUsers = await Review.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(currentDate),
              $lte: new Date(oneDayLater),
            },
          },
        },
        {
          $group: {
            _id: '$user',
            count: { $sum: 1 },
          },
        },
      ]);

      // eslint-disable-next-line no-await-in-loop
      const userMadeDecks = await Deck.find({
        title: { $nin: BLACK_LIST_DECKS },
        createdAt: { $lte: oneDayLater },
      }).populate('user');

      results.push([oneDayLater.format('MM/DD'), activeUsers.length, userMadeDecks.length]);
      currentDate = oneDayLater;
    }
    console.table(results);
  } catch (error) {
    console.log(error);
  }
}

stats();
