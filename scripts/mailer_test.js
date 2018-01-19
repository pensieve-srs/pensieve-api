process.env.NODE_ENV = 'development';
require('../config/env').config();

const CardsMailer = require('../mailers/cards_mailer');
const db = require('../db');

db.connect();

const cardsMailer = new CardsMailer();

cardsMailer.sendDueCardsReminder();
