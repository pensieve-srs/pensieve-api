/* eslint-disable no-param-reassign */
module.exports = function removeEmpty(obj) {
  Object.keys(obj).forEach(key => obj[key] == null && delete obj[key]);
  return obj;
};
