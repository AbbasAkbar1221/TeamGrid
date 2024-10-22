// const roleMiddleware = (roles) => {
//     return (req, res, next) => {
//       // Check if the user's role is included in the allowed roles
//       if (!roles.includes(req.user.role)) {
//         return res.status(403).json({ message: 'Access denied: insufficient permissions' });
//       }
//       next(); // User has the right role, proceed to the next middleware or route handler
//     };
//   };
  
//   module.exports = roleMiddleware;
  

const roleMiddleware = (roles) => {
  return (req, res, next) => {
    // Check if req.user or req.user.role is missing
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'Access denied: user role not found' });
    }

    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }

    next(); // User has the right role, proceed to the next middleware or route handler
  };
};

module.exports = roleMiddleware;
