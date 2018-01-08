const express = require('express');
const swaggerUi = require('swagger-ui-express');
const docs = require('../docs/swagger.json');

const router = express.Router();

router.get('/', (req, res) => res.redirect('/docs'));

router.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
router.use('/api/users', require('./users'));
router.use('/api/decks', require('./decks'));
router.use('/api/cards', require('./cards'));
router.use('/api/sessions', require('./sessions'));

module.exports = router;
