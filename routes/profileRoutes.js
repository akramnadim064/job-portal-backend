const express = require("express");
const router = express.Router();
const { protect, roleCheck } = require("../middleware/authMiddleware");
const {
  getJobSeekerProfile,
  updateJobSeekerProfile,
  getEmployerProfile,
  updateEmployerProfile
} = require("../controllers/profileController");


//Lobseeker

const { getMyProfile } = require("../controllers/profileController");


// Job Seeker
router.get("/jobseeker", protect, roleCheck("jobseeker"), getJobSeekerProfile);
router.put("/jobseeker", protect, roleCheck("jobseeker"), updateJobSeekerProfile);
router.get("/me", protect, getMyProfile);


// Employer
router.get("/employer", protect, roleCheck("employer"), getEmployerProfile);
router.put("/employer", protect, roleCheck("employer"), updateEmployerProfile);

module.exports = router;
