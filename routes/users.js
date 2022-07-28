const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById } = require('../controllers/users');

router.post('/', express.json(), createUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);

module.exports = router;
