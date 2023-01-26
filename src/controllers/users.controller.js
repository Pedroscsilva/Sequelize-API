const usersService = require('../services/users.service');

const insertNewUser = async (req, res) => {
  try {
    const newUser = await usersService.createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' });
  }
};

module.exports = {
  insertNewUser,
  getAllUsers,
};
