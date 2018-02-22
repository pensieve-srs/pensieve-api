module.exports = (name, expiredDecks, url) => {
  let headline;

  if (expiredDecks.length > 2) {
    headline = `Your decks '${expiredDecks[0].title}' and ${expiredDecks.length -
      1} others are due to be reviewed.  Their recall strength in Pensieve just dropped below 50%, which means they are about to be forgotten.`;
  } else if (expiredDecks.length === 2) {
    headline = `Your decks '${expiredDecks[0].title}' and '${expiredDecks[1]
      .title}' are due to be reviewed. Their recall strength in Pensieve just dropped below 50%, which means they are about to be forgotten.`;
  } else {
    headline = `Your deck '${expiredDecks[0]
      .title}' is due to be reviewed. Its recall strength in Pensieve just dropped below 50%, which means it is about to be forgotten.`;
  }

  return `
  Hi ${name},

  ${headline} If you want to improve your retention of those notes, you should review them now.

  [Review Now][${url}]

  Your friend,
  Pensieve

  Copyright © 2018 Pensieve SRS, All rights reserved.
  You are subscribed to this notification based on your preferences

  Want to change how you receive these emails?
  You can [update your preferences and unsubscribe here][https://www.pensieve.space/settings#notifications].
  `;
};
