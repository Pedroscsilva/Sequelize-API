// const sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../models');
const { decodeToken } = require('../utils/JWT');
const { checkPost } = require('./validations/inputValidations');

const createPost = async (postObject, token) => {
  await checkPost(postObject);
  const { id } = decodeToken(token);

  const fullObject = {
    ...postObject,
    userId: id,
  };

  const newPost = await BlogPost.create(fullObject);

  const postCategoryArray = postObject.categoryIds.map((e) => ({
    categoryId: e, 
    postId: newPost.dataValues.id,
  }));

  await PostCategory.bulkCreate(postCategoryArray);

  return newPost.dataValues;
};

module.exports = {
  createPost,
};