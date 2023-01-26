const { User } = require('../../models');
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

module.exports = {
  checkCamps,
  checkCategory,
};
