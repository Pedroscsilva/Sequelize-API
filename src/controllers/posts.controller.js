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

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const updatedPost = await postsService.updatePost(req.body, id, token);
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const allPosts = await postsService.getAllPosts();
    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsService.getPostById(id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  updatePost,
  getAllPosts,
  getPostById,
};