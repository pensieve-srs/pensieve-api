class NotFoundError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, NotFoundError);
  }
}

module.exports = {
  NotFoundError,
};
