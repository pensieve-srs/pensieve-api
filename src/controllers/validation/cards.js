const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  find: {
    query: Joi.object().keys({
      type: Joi.string(),
      deck: Joi.objectId(),
    }),
  },

  create: {
    body: Joi.object()
      .keys({
        front: Joi.string().required(),
        back: Joi.string().allow(''),
        deck: Joi.objectId().required(),
        notes: Joi.string().allow(''),
        nextReviewDate: Joi.date(),
      })
      .required(),
  },

  findCard: {
    params: Joi.object()
      .keys({
        id: Joi.objectId(),
      })
      .required(),
  },

  updateCard: {
    params: Joi.object()
      .keys({
        id: Joi.objectId(),
      })
      .required(),
    body: Joi.object()
      .keys({
        front: Joi.string(),
        back: Joi.string(),
        notes: Joi.string().allow(''),
      })
      .required(),
  },

  deleteCard: {
    params: Joi.object()
      .keys({
        id: Joi.objectId(),
      })
      .required(),
  },

  reviewCard: {
    params: Joi.object()
      .keys({
        id: Joi.objectId(),
      })
      .required(),
    body: Joi.object()
      .keys({
        value: Joi.string().required(),
      })
      .required(),
  },

  resetCard: {
    params: Joi.object()
      .keys({
        id: Joi.objectId(),
      })
      .required(),
  },
};
