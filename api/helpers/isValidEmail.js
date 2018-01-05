module.exports = function isValidEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
