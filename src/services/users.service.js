const { User } = require('../models');
const { generateToken, decodeToken } = require('../utils/JWT');
const { checkCamps } = require('./validations/inputValidations');

const createUser = async (userObject) => {
  await checkCamps(userObject);
  
  await User.create(userObject);

  const token = generateToken({
    id: userObject.id,
    displayName: userObject.displayName,
    email: userObject.email,
  });

  return { token };
};

const getUsers = () => User.findAll({
  attributes: { exclude: ['password'] },
});

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    const error = new Error('User does not exist');
    error.status = 404;
    throw error;
  }

  return user;
}; 

const deleteUser = async (token) => {
  const { id } = decodeToken(token);
  const destroy = await User.destroy({
    where: { id },
  });
  return destroy;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
};
