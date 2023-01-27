const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');
const { decodeToken } = require('../utils/JWT');
const { checkPost, checkUpdatedPost } = require('./validations/inputValidations');

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createPost = async (postObject, token) => {
  await checkPost(postObject);
  const { id } = decodeToken(token);

  const fullObject = { ...postObject, userId: id };

  const t = await sequelize.transaction();

  try {
    const newPost = await BlogPost.create(fullObject, { transaction: t });

    const postCategoryArray = postObject.categoryIds.map((e) => ({
      categoryId: e, 
      postId: newPost.dataValues.id,
    }));
  
    await PostCategory.bulkCreate(postCategoryArray, { transaction: t });
    await t.commit();

    return newPost.dataValues;
  } catch (e) {
    await t.rollback(); 
    throw e;
  }
};

const updatePost = async (postObject, postId, token) => {
  checkUpdatedPost(postObject);

  const { id } = decodeToken(token);

  await BlogPost.update(postObject, {
    where: { id: postId },
  });

  const post = await BlogPost.findByPk(postId, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (post.userId !== id) {
    const error = new Error('Unauthorized user');
    error.status = 401;
    throw error;
  }

  return post;
};

const deletePost = async (postId, token) => {
  const post = await BlogPost.findByPk(postId);

  if (!post) {
    const error = new Error('Post does not exist');
    error.status = 404;
    throw error;
  }

  const { id } = decodeToken(token);

  if (post.dataValues.userId !== id) {
    const error = new Error('Unauthorized user');
    error.status = 401;
    throw error;
  }

  const destroy = await BlogPost.destroy({
    where: { id: postId },
  });

  return destroy;
};

const getAllPosts = () => BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) {
    const error = new Error('Post does not exist');
    error.status = 404;
    throw error;
  }

  return post;
}; 
  
module.exports = {
  createPost,
  updatePost,
  getAllPosts,
  getPostById,
  deletePost,
};