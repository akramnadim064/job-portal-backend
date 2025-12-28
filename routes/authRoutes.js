// // const express = require("express");
// // const router = express.Router();

// // const { registerUser, loginUser } = require("../controllers/authController");

// // // REGISTER
// // router.post("/register", registerUser);

// // // LOGIN
// // router.post("/login", loginUser);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// const {
//   registerUser,
//   loginUser,
// } = require("../controllers/authController");

// // REGISTER
// router.post("/register", registerUser);

// // LOGIN
// router.post("/login", loginUser);

// module.exports = router;





//no use
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

/* ✅ Explicitly allow OPTIONS */
router.options("*", (req, res) => {
  res.sendStatus(204);
});

/* Routes */
router.post("/register", register);
router.post("/login", login);

module.exports = router;
