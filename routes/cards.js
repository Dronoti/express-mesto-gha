const express = require('express');
const {
  createCard,
  getAllCards,
  deleteCardById,
  likeCard,
  dislikeCard
} = require('../controllers/cards');

const router = express.Router();

router.get('/', getAllCards);
router.post('/', express.json(), createCard);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
