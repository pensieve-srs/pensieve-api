module.exports = (name, numCards, url) => `
  You have ${numCards} cards that need review. Review them now before you forget.
  [Review Now][${url}]

  Anyways that was fun. See you later!
  Your friend,
  Pensieve`;
