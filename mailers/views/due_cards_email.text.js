module.exports = (name, numCards, url) => `
  Hi ${name},
  You have ${numCards} cards that need review. Review them now before you forget.
  [Review Now][${url}]

  Anyways that was fun. See you later!
  Your friend,
  Pensieve

  Copyright © 2018 Pensieve SRS, All rights reserved.
  You are subscribed to this notification based on your preferences

  Want to change how you receive these emails?
  You can [update your preferences and unsubscribe here][https://www.pensieve.space/settings#notifications].
  `;
