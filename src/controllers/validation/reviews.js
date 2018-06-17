const Joi = require('joi');

module.exports = {
  find: {
    query: Joi.object().keys({
      range: Joi.string(),
    }),
  },
};
