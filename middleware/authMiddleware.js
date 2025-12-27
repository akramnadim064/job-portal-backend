// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       return next();
//     } catch (error) {
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }

//   if (!token) return res.status(401).json({ message: "Not authorized, no token" });
// };

// exports.roleCheck = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     next();
//   };
// };
// exports.roleCheck = (...roles) => {
//   return (req, res, next) => {
//     console.log("USER ROLE INSIDE Middleware:", req.user.role);  // <-- ADD THIS
//     console.log("ALLOWED ROLES:", roles);

//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     next();
//   };
// };












const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ----------------------
// AUTH PROTECT MIDDLEWARE
// ----------------------
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// ----------------------
// ROLE CHECK MIDDLEWARE (FINAL WORKING VERSION)
// ----------------------
exports.roleCheck = (...roles) => {
  return (req, res, next) => {
    console.log("USER ROLE INSIDE Middleware:", req.user.role);
    console.log("ALLOWED ROLES:", roles);

    const userRole = req.user.role.toLowerCase();        // normalize user role
    const allowedRoles = roles.map(r => r.toLowerCase()); // normalize allowed roles

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
