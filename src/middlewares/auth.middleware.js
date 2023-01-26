const { authenticateToken } = require('../utils/JWT');

const authenticateMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    authenticateToken(token);
    next();
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = { authenticateMiddleware };