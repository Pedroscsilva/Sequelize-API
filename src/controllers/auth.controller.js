const authService = require('../services/auth.service');

const authenticate = async (req, res) => {
  try {
    const authentication = await authService.authenticate(req.body);
    return res.status(200).json(authentication);
  } catch (error) {
    console.log(error);
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  authenticate,
};
