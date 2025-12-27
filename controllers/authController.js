// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// // generate JWT token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// // REGISTER
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // check if user exists
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     // create user
//     const user = await User.create({
//       name,
//       email,
//       password,
//       role,
//     });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // LOGIN
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // find user
//     const user = await User.findOne({ email });

//     if (!user) return res.status(400).json({ message: "Invalid email or password" });

//     // match password
//     const isMatch = await user.matchPassword(password);

//     if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//     // successful login
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
    
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };







// exports.registerUser = async (req, res) => {
//   try {
//     let { name, email, password, role } = req.body;

//     // 🔥 FORCE LOWERCASE ROLE
//     role = role.toLowerCase();

//     if (!["employer", "jobseeker"].includes(role)) {
//       return res.status(400).json({ message: "Invalid role" });
//     }

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       role,
//     });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error("REGISTER ERROR:", error);
//     res.status(500).json({ message: "Registration failed" });
//   }
// };















































// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// // generate JWT token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// // REGISTER
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       role,
//     });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // LOGIN
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ EXPORT PROPERLY
// module.exports = {
//   registerUser,
//   loginUser,
// };







































































const User = require("../models/User");
const jwt = require("jsonwebtoken");

// generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ================= REGISTER =================
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 🔒 REQUIRED FIELDS
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 🔒 EMAIL VALIDATION
    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    // 🔒 PASSWORD VALIDATION
    const passwordRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and contain at least one special character",
      });
    }

    // 🔒 CHECK EXISTING USER
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔒 REQUIRED FIELDS
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 🔒 EMAIL FORMAT
    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // 🔒 PASSWORD LENGTH (login side)
    if (password.length < 8) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ EXPORT
module.exports = {
  registerUser,
  loginUser,
};
