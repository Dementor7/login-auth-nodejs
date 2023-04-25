const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
};
