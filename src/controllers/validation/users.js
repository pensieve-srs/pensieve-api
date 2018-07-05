const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  signupUser: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
    }),
  },

  loginUser: {
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
    }),
  },

  updateUser: {
    body: Joi.object().keys({
      name: Joi.string(),
      email: Joi.string().email(),
      prefs: Joi.any(),
    }),
  },

  updatePassword: {
    body: Joi.object().keys({
      currentPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
    }),
  },

  forgotPassword: {
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
    }),
  },

  resetPassword: {
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }),
    body: Joi.object().keys({
      newPassword: Joi.string().required(),
      verifyPassword: Joi.string().required(),
    }),
  },
};
