const express = require('express');
const swaggerUi = require('swagger-ui-express');

const getUser = require('./middlewares/getUser');
const docs = require('./docs/swagger.json');

const users = require('./controllers/users');
const decks = require('./controllers/decks');
const cards = require('./controllers/cards');
const sessions = require('./controllers/sessions');
const reviews = require('./controllers/reviews');
const tags = require('./controllers/tags');
const { NotFoundError } = require('./utils/errors');

const router = express.Router();

router.get('/', (req, res) => res.redirect('/docs'));

router.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));

router.get('/api/cards', getUser, cards.find);
router.post('/api/cards', getUser, cards.create);
router.get('/api/cards/:id', getUser, cards.findCard);
router.put('/api/cards/:id', getUser, cards.updateCard);
router.delete('/api/cards/:id', getUser, cards.deleteCard);

router.post('/api/cards/:id/review', getUser, cards.reviewCard);
router.delete('/api/cards/:id/review', getUser, cards.resetCard);

router.get('/api/decks', getUser, decks.find);
router.post('/api/decks', getUser, decks.create);
router.get('/api/decks/:id', getUser, decks.findDeck);
router.put('/api/decks/:id', getUser, decks.updateDeck);
router.delete('/api/decks/:id', getUser, decks.deleteDeck);

router.delete('/api/decks/:id/review', getUser, decks.resetDeck);

router.post('/api/users/signup', users.signupUser);
router.post('/api/users/login', users.loginUser);
router.post('/api/users/forgot_password', users.forgotPassword);
router.post('/api/users/reset_password', getUser, users.resetPassword);

router.get('/api/users/profile', getUser, users.findUser);
router.put('/api/users/profile', getUser, users.updateUser);
router.put('/api/users/profile/security', getUser, users.updatePassword);
router.delete('/api/users/profile', getUser, users.deleteUser);

router.post('/api/sessions', getUser, sessions.create);
router.get('/api/sessions/:id', getUser, sessions.findSession);

router.get('/api/reviews', getUser, reviews.find);

router.get('/api/tags', getUser, tags.find);
router.post('/api/ags', getUser, tags.create);

router.use((req, res) =>
  res.status(404).send({
    url: req.originalUrl,
    error: 'Not found',
  }));

router.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof NotFoundError) {
    return res.status(404).send({
      url: req.originalUrl,
      error: err.message,
    });
  }
  console.log('❌', err);

  return res.status(500).send({ error: err.stack });
});

module.exports = router;
