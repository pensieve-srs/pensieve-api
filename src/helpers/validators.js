const checkEmail = (str) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(str);
};

const checkPassword = (str) => {
  const re = /(?=.*\d)(?=.*[a-zA-Z]).{8,}/;
  return re.test(str);
};

module.exports = { checkEmail, checkPassword };
