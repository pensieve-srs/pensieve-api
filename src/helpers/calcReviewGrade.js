const reviewTypes = { redo: 'redo', hard: 'hard', easy: 'easy' };

module.exports = (value) => {
  switch (value) {
    case reviewTypes.easy:
      return 1;
    case reviewTypes.hard:
      return 0.6;
    case reviewTypes.redo:
      return 0;
    default:
      return 1;
  }
};
