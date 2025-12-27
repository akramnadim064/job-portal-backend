const express = require("express");
const router = express.Router();
const { protect, roleCheck } = require("../middleware/authMiddleware");
const { getEmployerDashboard } = require("../controllers/employerDashboardController");

router.get(
  "/dashboard",
  protect,
  roleCheck("employer"),
  getEmployerDashboard
);

module.exports = router;
