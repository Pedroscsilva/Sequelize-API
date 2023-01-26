const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.post('/', usersController.insertNewUser);

module.exports = router;
