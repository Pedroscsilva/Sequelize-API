const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET || 'suaSenhaSecreta';

const generateToken = (payload) => 
  jwt.sign(payload, TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

const authenticateToken = (token) => {
  if (!token) {
    const error = new Error('missing auth token');
    error.status = 401;
    throw error;
  }

  try {
    const verificationResponse = jwt.verify(token, TOKEN_SECRET);
    return verificationResponse;
  } catch (err) {
    const error = new Error('jwt malformed');
    error.status = 401;
    throw error;
  }
};

module.exports = {
  generateToken,
  authenticateToken,
};