const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserData,
  updateUserAvatar
} = require('../controllers/users');

const router = express.Router();

router.post('/', express.json(), createUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.patch('/me', express.json(), updateUserData);
router.patch('/me/avatar', express.json(), updateUserAvatar);

module.exports = router;
