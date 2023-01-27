const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');
const { decodeToken } = require('../utils/JWT');
const { checkPost } = require('./validations/inputValidations');

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

const getAllPosts = () => BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  
module.exports = {
  createPost,
  getAllPosts,
};