const express = require('express');
const postsController = require('../controllers/posts.controller');
const { authenticateMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authenticateMiddleware, postsController.createPost);
router.get('/', authenticateMiddleware, postsController.getAllPosts);
router.get('/:id', authenticateMiddleware, postsController.getPostById);

module.exports = router;
