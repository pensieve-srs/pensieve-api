const moment = require('moment');

const defaultDifficulty = 0.3;

const gradingCutoff = 0.6;

export function validateGrading(grade) {
  if (grade < 0.0 || grade > 1.0) {
    throw new Error('Invalid grade. Must be between 0 and 1.');
  }
}
export function isResponseCorrect(grade) {
  validateGrading(grade);

  return gradingCutoff < grade;
}

export function calcPercentOverdue(grade, dateLastReviewed, dateNextReview) {
  if (!isResponseCorrect(grade)) return 1;

  const daysSinceLastReview = moment().diff(moment(dateLastReviewed));
  const daysBetweenReviews = Math.abs(moment(dateLastReviewed).diff(moment(dateNextReview)));

  const daysOverdue = daysSinceLastReview / daysBetweenReviews;

  return Math.min(2, daysOverdue);
}

export function calcRecallRate(dateLastReviewed, dateNextReview) {
  const daysSinceLastReview = moment().diff(moment(dateLastReviewed));
  const daysBetweenReviews = Math.abs(moment(dateLastReviewed).diff(moment(dateNextReview)));

  const percentOverdue = daysSinceLastReview / daysBetweenReviews;

  const recallAbility = 2 ** -percentOverdue;

  return Math.ceil(recallAbility * 100) / 100;
}

export function calcDifficulty(prevDifficulty, percentOverdue, grade) {
  validateGrading(grade);
  const performanceRating = (1 / 17)(8 - 9 * grade); // eslint-disable-line no-mixed-operators
  const delta = percentOverdue * performanceRating;

  return Math.max(Math.min(prevDifficulty + delta, 1), 0);
}

export function calcDifficultyWeight(difficulty) {
  return 3 - 1.7 * difficulty; // eslint-disable-line no-mixed-operators
}

export function calcDaysBetweenReview(difficultyWeight, grade, dateLastReviewed, dateNextReview) {
  if (!isResponseCorrect(grade)) {
    return 1 / difficultyWeight ** 2; // eslint-disable-line no-mixed-operators
  }

  const percentOverdue = calcPercentOverdue(grade, dateLastReviewed, dateNextReview);
  return (1 / (difficultyWeight - 1)) * percentOverdue;
}
