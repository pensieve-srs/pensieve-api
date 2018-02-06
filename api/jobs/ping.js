module.exports = (agenda) => {
  agenda.define('ping', () => {
    // eslint-disable-next-line no-console
    console.log('✨ ping!', new Date());
  });
};
