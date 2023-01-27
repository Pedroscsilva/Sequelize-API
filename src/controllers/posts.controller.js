const postsService = require('../services/posts.service');

const createPost = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const newPost = await postsService.createPost(req.body, token);
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postsService.getAllPosts();
    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
};