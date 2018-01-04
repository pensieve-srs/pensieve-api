exports.isValidEmail = function(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
