const { CronJob } = require('cron');
const sendDueCardsReminder = require('./send_due_cards_reminder');

module.exports = new CronJob({
  cronTime: '00 00 8 * * *',
  onTick: () => sendDueCardsReminder(),
  start: false,
  timeZone: 'America/New_York',
});
