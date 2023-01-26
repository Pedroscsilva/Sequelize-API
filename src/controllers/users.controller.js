const usersService = require('../services/users.service');

const insertNewUser = async (req, res) => {
  try {
    const newUser = await usersService.createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  insertNewUser,
};
