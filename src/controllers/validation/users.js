const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  signupUser: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },

  loginUser: {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },

  updateUser: {
    body: Joi.object().keys({
      name: Joi.string(),
      email: Joi.string(),
      prefs: Joi.any(),
    }),
  },

  updatePassword: {
    body: Joi.object().keys({
      currentPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
    }),
  },
};
