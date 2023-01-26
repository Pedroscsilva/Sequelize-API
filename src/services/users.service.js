const { User } = require('../models');
const { generateToken } = require('../utils/JWT');
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

module.exports = {
  createUser,
  getUsers,
};
