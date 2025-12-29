// const express = require("express");
// const router = express.Router();

// const { registerUser, loginUser } = require("../controllers/authController");

// // REGISTER
// router.post("/register", registerUser);

// // LOGIN
// router.post("/login", loginUser);

// module.exports = router;












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




// const express = require("express");
// const router = express.Router();

// /* ✅ Correct import */
// const {
//   registerUser,
//   loginUser,
// } = require("../controllers/authController");

// /* ✅ Preflight handler (important for browser) */
// router.options("*", (req, res) => res.sendStatus(204));

// /* ✅ Routes */
// router.post("/register", registerUser);
// router.post("/login", loginUser);

// module.exports = router;






//Morning
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
