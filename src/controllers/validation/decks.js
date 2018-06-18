const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  find: {},

  create: {
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().allow(''),
      notes: Joi.string().allow(''),
      tags: Joi.array().items(Joi.objectId()),
    }),
  },

  findDeck: {
    params: Joi.object().keys({
      id: Joi.objectId().required(),
    }),
  },

  updateDeck: {
    params: Joi.object().keys({
      id: Joi.objectId().required(),
    }),
    body: Joi.object().keys({
      title: Joi.string(),
      description: Joi.string(),
      notes: Joi.string().allow(''),
      tags: Joi.array().items(Joi.objectId()),
    }),
  },

  deleteDeck: {
    params: Joi.object().keys({
      id: Joi.objectId().required(),
    }),
  },

  resetDeck: {
    params: Joi.object().keys({
      id: Joi.objectId().required(),
    }),
  },
};
