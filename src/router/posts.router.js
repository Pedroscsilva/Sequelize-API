const express = require('express');
const postsController = require('../controllers/posts.controller');
const { authenticateMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authenticateMiddleware, postsController.createPost);
router.get('/', authenticateMiddleware, postsController.getAllPosts);

module.exports = router;
