const express = require('express');
const { createCard, getAllCards, deleteCardById } = require('../controllers/cards');

const router = express.Router();

router.get('/', getAllCards);
router.post('/', express.json(), createCard);
router.delete('/:cardId', deleteCardById);

module.exports = router;
