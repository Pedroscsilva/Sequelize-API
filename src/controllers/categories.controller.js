const categoriesService = require('../services/categories.service');

const insertNewCategory = async (req, res) => {
  try {
    const newCategory = await categoriesService.createCategory(req.body);
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  insertNewCategory,
};
