// // const express = require("express");
// // const router = express.Router();
// // const { protect, roleCheck } = require("../middleware/authMiddleware");
// // const {
// //   createJob,
// //  getAllJobs, 
// //   getJobs,
// //   getJobById,
// //   updateJob,
// //   deleteJob
// // } = require("../controllers/jobController");

// // // Employers only
// // router.post("/", protect, roleCheck("employer"), createJob);
// // router.put("/:id", protect, roleCheck("employer"), updateJob);
// // router.delete("/:id", protect, roleCheck("employer"), deleteJob);

// // // Public routes
// // router.get("/", getAllJobs); 
// // router.get("/:id", getJobById);



// // module.exports = router;




// const express = require("express");
// const router = express.Router();
// const { protect, roleCheck } = require("../middleware/authMiddleware");
// const {
//   createJob,
//   getJobs,
//   getJobById,
//   updateJob,
//   deleteJob
// } = require("../controllers/jobController");

// // Employers only
// router.post("/", protect, roleCheck("employer"), createJob);
// router.put("/:id", protect, roleCheck("employer"), updateJob);
// router.delete("/:id", protect, roleCheck("employer"), deleteJob);
// router.post("/", protect, createJob);

// // Public routes
// router.get("/", getJobs);
// router.get("/:id", getJobById);

// module.exports = router;




const express = require("express");
const router = express.Router();
const { protect, roleCheck } = require("../middleware/authMiddleware");
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

// EMPLOYER routes
router.post("/", protect, roleCheck("Employer"), createJob);
router.put("/:id", protect, roleCheck("Employer"), updateJob);
router.delete("/:id", protect, roleCheck("Employer"), deleteJob);

// PUBLIC routes
router.get("/", getJobs);
router.get("/:id", getJobById);

module.exports = router;
