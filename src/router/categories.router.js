const express = require('express');
const categoriesController = require('../controllers/categories.controller');
const { authenticateMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authenticateMiddleware, categoriesController.insertNewCategory);

module.exports = router;
