const express = require('express');
const swaggerUi = require('swagger-ui-express');

const auth = require('../middlewares/auth');
const docs = require('../docs/swagger.json');

const router = express.Router();

router.get('/', (req, res) => res.redirect('/docs'));

router.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
router.use('/api/users', require('./users'));
router.use('/api/decks', auth, require('./decks'));
router.use('/api/cards', auth, require('./cards'));
router.use('/api/sessions', auth, require('./sessions'));
router.use('/api/reviews', auth, require('./reviews'));
router.use('/api/tags', auth, require('./tags'));

module.exports = router;
