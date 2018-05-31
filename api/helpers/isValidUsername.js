module.exports = function isValidUsername(username) {
  const re = /^[a-z0-9_-]{3,15}$/;
  return re.test(username);
};
