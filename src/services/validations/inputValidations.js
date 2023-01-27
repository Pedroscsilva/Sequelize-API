const { User, Category } = require('../../models');
const { userSchema, categorySchema } = require('./schemas');

const checkCamps = async (userObject) => {
  const { error } = userSchema.validate(userObject);
  if (error) {
    const newError = new Error(error.message);
    newError.status = 400;
    throw newError;
  }

  const userEmailCheck = await User.findOne({ where: { email: userObject.email } });
  if (userEmailCheck) {
    const newError = new Error('User already registered');
    newError.status = 409;
    throw newError;
  }
};

const checkCategory = (categoryObj) => {
  const { error } = categorySchema.validate(categoryObj);
  if (error) {
    const newError = new Error(error.message);
    newError.status = 400;
    throw newError;
  }
};

const checkPost = async ({ title, content, categoryIds }) => {
  if (!title || !content || !categoryIds) {
    const error = new Error('Some required fields are missing');
    error.status = 400;
    throw error;
  }

  const categoriesArray = await Category.findAll();
  const availableCategories = categoriesArray.map((category) => category.id);

  const areCategoriesExistent = categoryIds.every((id) => availableCategories.includes(id));

  if (!areCategoriesExistent) {
    const error = new Error('one or more "categoryIds" not found');
    error.status = 400;
    throw error;
  }
};

const checkUpdatedPost = ({ title, content }) => {
  if (!title || !content) {
    const error = new Error('Some required fields are missing');
    error.status = 400;
    throw error;
  }
};

module.exports = {
  checkCamps,
  checkCategory,
  checkPost,
  checkUpdatedPost,
};
