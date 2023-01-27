const usersService = require('../services/users.service');

const insertNewUser = async (req, res) => {
  try {
    const newUser = await usersService.createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await usersService.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const token = req.headers.authorization;
    await usersService.deleteUser(token);
    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'something went wrong' });
  }
};

module.exports = {
  insertNewUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
