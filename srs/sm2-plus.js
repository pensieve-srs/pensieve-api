/* eslint-disable no-mixed-operators */
const moment = require('moment');

const GRADE_MIN = 0;
const GRADE_MAX = 1;
const GRADE_CUTOFF = 0.6;
const DEFAULT_DIFFICULTY = 0.3;

const clamp = (number, min, max) => Math.min(Math.max(number, min), max);

const calcRecallRate = (reviewedAt, interval, today) => {
  const diff = moment(today).diff(moment(reviewedAt), 'days');
  const recall = 2 ** (-diff / interval);
  return Math.ceil(recall * 100) / 100;
};

const calcPercentOverdue = (reviewedAt, interval, today) => {
  const diff = moment(today).diff(moment(reviewedAt), 'days');
  const calculated = diff / interval;
  return Math.min(2, calculated);
};

const calculate = (reviewedAt, prevDifficulty, prevInterval, performanceRating, today) => {
  const percentOverdue = calcPercentOverdue(reviewedAt, prevInterval, today);

  const difficulty = clamp(
    prevDifficulty + ((8 - 9 * performanceRating) * percentOverdue) / 17,
    0,
    1,
  );

  const difficultyWeight = 3 - 1.7 * difficulty;

  let interval;
  if (performanceRating < GRADE_CUTOFF) {
    interval = Math.round(1 / difficultyWeight ** 2) || 1;
  } else {
    interval = 1 + Math.round((difficultyWeight - 1) * percentOverdue);
  }

  return {
    difficulty,
    interval,
    nextReviewDate: moment(today)
      .add(interval, 'days')
      .toISOString(),
    reviewedAt: today.toISOString(),
  };
};

module.exports = {
  calculate,
  calcRecallRate,
  calcPercentOverdue,
  GRADE_MIN,
  GRADE_MAX,
  GRADE_CUTOFF,
  DEFAULT_DIFFICULTY,
};
