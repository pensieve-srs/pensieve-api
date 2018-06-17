const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  create: {
    body: Joi.object().keys({
      range: Joi.string(),
      type: Joi.string(),
      deck: Joi.objectId(),
    }),
  },

  findSession: {
    params: Joi.object().keys({
      id: Joi.objectId().required(),
    }),
  },
};
