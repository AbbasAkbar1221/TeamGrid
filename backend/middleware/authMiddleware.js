// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization; // Get the Authorization header

//   // Check if the Authorization header is present
//   if (!authHeader || !authHeader.startsWith('Bearer')) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   const token = authHeader.split(' ')[1]; // Extract the token from the header

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
//     req.user = await User.findById(decoded.id).select('-password'); // Get the user from the database and exclude the password field from the returned use
//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     console.error('Auth Middleware Error:', error);
//     return res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header

  // Check if the Authorization header is present
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Authorization token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the header

  try {
    // Verify the token and extract the payload (ensure the correct field is used)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database (adjust 'decoded.id' to 'decoded.userId' if needed)
    const user = await User.findById(decoded.userId || decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }

    // Set the user in the request object for subsequent middlewares to access
    req.user = user;
    
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({ message: 'Token is not valid or has expired' });
  }
};

module.exports = authMiddleware;
