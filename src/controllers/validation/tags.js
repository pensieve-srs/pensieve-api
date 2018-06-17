const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  create: {
    body: Joi.object()
      .keys({
        value: Joi.string().required(),
      })
      .required(),
  },
};
