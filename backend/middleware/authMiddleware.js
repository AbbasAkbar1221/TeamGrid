const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header

  // Check if the Authorization header is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the header

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = await User.findById(decoded.id).select('-password'); // Get the user from the database
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
