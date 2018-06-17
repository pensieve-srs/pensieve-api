const express = require('express');
const swaggerUi = require('swagger-ui-express');

const auth = require('./middlewares/auth');
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

router.get('/api/cards', auth, cards.find);
router.post('/api/cards', auth, cards.create);
router.get('/api/cards/:id', auth, cards.findCard);
router.put('/api/cards/:id', auth, cards.updateCard);
router.delete('/api/cards/:id', auth, cards.deleteCard);

router.post('/api/cards/:id/review', auth, cards.reviewCard);
router.delete('/api/cards/:id/review', auth, cards.resetCard);

router.get('/api/decks', auth, decks.find);
router.post('/api/decks', auth, decks.create);
router.get('/api/decks/:id', auth, decks.findDeck);
router.put('/api/decks/:id', auth, decks.updateDeck);
router.delete('/api/decks/:id', auth, decks.deleteDeck);

router.delete('/api/decks/:id/review', auth, decks.resetDeck);

router.post('/api/users/signup', users.signupUser);
router.post('/api/users/login', users.loginUser);
router.get('/api/users/profile', auth, users.findUser);
router.put('/api/users/profile', auth, users.updateUser);
router.put('/api/users/profile/security', auth, users.updatePassword);
router.delete('/api/users/profile', auth, users.deleteUser);

router.post('/api/sessions', auth, sessions.create);
router.get('/api/sessions/:id', auth, sessions.findSession);

router.get('/api/reviews', auth, reviews.find);

router.get('/api/tags', auth, tags.find);
router.post('/api/ags', auth, tags.create);

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
