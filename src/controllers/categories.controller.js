const categoriesService = require('../services/categories.service');

const insertNewCategory = async (req, res) => {
  try {
    const newCategory = await categoriesService.createCategory(req.body);
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoriesService.getCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' });
  }
};

module.exports = {
  insertNewCategory,
  getAllCategories,
};
