const express = require('express');
const { createUser, getAllUsers, getUserById } = require('../controllers/users');

const router = express.Router();

router.post('/', express.json(), createUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);

module.exports = router;
