const { verifyToken } = require('./JwtUtils');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Auth failed' });
  }
  try {
    const decoded = verifyToken(token.split(' ')[1]);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Auth failed' });
  }
};

module.exports = authMiddleware;
