



// const express = require("express");
// const router = express.Router();



// const { protect } = require("../middleware/authMiddleware");
// const { applyJob } = require("../controllers/applicationController");

// // ONLY POST ROUTE — no GET route here!
// router.post("/:jobId", protect, applyJob);

// module.exports = router;




// ADDED ON 22ND DECEMBER

const express = require("express");
const router = express.Router();
const { protect, roleCheck } = require("../middleware/authMiddleware");

const {
  applyJob,
  getEmployerApplicants,
  updateApplicationStatus,
  getMyApplications, // updated
} = require("../controllers/applicationController");





// Job seeker applies
router.post("/:jobId", protect, roleCheck("jobseeker"), applyJob);


// Jobseeker: get my applications
router.get("/my", protect, getMyApplications);


// Employer views applicants
router.get(
  "/employer",
  protect,
  roleCheck("employer"),
  getEmployerApplicants
);

//update application status

router.patch(
  "/:applicationId/status",
  protect,
  roleCheck("employer"),
  updateApplicationStatus
);

module.exports = router;

// / ADDED ON 22ND DECEMBER