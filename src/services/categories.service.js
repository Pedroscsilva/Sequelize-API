const { Category } = require('../models');
const { checkCategory } = require('./validations/inputValidations');

const createCategory = async (categoryObj) => {
  checkCategory(categoryObj);

  const newCategory = await Category.create(categoryObj);

  return newCategory;
};

module.exports = {
  createCategory,
};