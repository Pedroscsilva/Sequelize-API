const postsService = require('../services/posts.service');

const createPost = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const newPost = await postsService.createPost(req.body, token);
    console.log(newPost);
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createPost,
};