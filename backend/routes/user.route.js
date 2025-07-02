const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/', userController.createUser);

router.get('/', userController.getUserByEmail);

router.get('/:email', userController.getUserByEmail);

module.exports = router;
