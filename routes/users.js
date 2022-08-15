const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUserData,
  updateUserAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.patch('/me', express.json(), updateUserData);
router.patch('/me/avatar', express.json(), updateUserAvatar);

module.exports = router;
