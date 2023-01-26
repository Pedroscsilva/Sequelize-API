const express = require('express');
const usersController = require('../controllers/users.controller');
const { authenticateMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', usersController.insertNewUser);
router.get('/', authenticateMiddleware, usersController.getAllUsers);
router.get('/:id', authenticateMiddleware, usersController.getUserById);

module.exports = router;
