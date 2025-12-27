// // // const Job = require("../models/Job");
// // // const Application = require("../models/Application");

// // // exports.getEmployerDashboard = async (req, res) => {
// // //   try {
// // //     const employerId = req.user._id;

// // //     const jobs = await Job.find({ employer: employerId });

// // //     const totalApplicants = await Application.countDocuments({
// // //       job: { $in: jobs.map(j => j._id) },
// // //     });

// // //     res.json({
// // //       totalJobs: jobs.length,
// // //       totalApplicants,
// // //       jobs,
// // //     });
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).json({ message: "Dashboard fetch failed" });
// // //   }
// // // };




// // const Job = require("../models/Job");
// // const Application = require("../models/Application");

// // exports.getEmployerDashboard = async (req, res) => {
// //   try {
// //     const employerId = req.user._id;

// //     const jobs = await Job.find({ employer: employerId });

// //     const totalApplicants = await Application.countDocuments({
// //       job: { $in: jobs.map(j => j._id) },
// //     });

// //     res.json({
// //       totalJobs: jobs.length,
// //       totalApplicants,
// //       jobs,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Dashboard fetch failed" });
// //   }
// // };






// const Job = require("../models/Job");
// const Application = require("../models/Application");
// const User = require("../models/User");

// exports.getEmployerDashboard = async (req, res) => {
//   try {
//     const employerId = req.user._id;

//     // ✅ fetch employer details
//     const employer = await User.findById(employerId).select("name email");

//     const jobs = await Job.find({ employer: employerId });

//     const totalApplicants = await Application.countDocuments({
//       job: { $in: jobs.map(j => j._id) },
//     });

//     res.json({
//       employerName: employer.name, // ✅ SEND NAME
//       totalJobs: jobs.length,
//       totalApplicants,
//       jobs,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Dashboard fetch failed" });
//   }
// };




//update on 22nd december

const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");

exports.getEmployerDashboard = async (req, res) => {
  try {
    const employerId = req.user._id;

    const employer = await User.findById(employerId).select("name");

    // 1️⃣ Get employer jobs
    const jobs = await Job.find({ employer: employerId }).lean();

    const jobIds = jobs.map(job => job._id);

    // 2️⃣ Get applications grouped by job
    const applications = await Application.aggregate([
      { $match: { job: { $in: jobIds } } },
      {
        $group: {
          _id: "$job",
          count: { $sum: 1 }
        }
      }
    ]);

    // 3️⃣ Convert to lookup map
    const countMap = {};
    applications.forEach(app => {
      countMap[app._id.toString()] = app.count;
    });

    // 4️⃣ Attach count to each job
    const jobsWithCounts = jobs.map(job => ({
      ...job,
      applicantsCount: countMap[job._id.toString()] || 0
    }));

    res.json({
      employerName: employer.name,
      totalJobs: jobs.length,
      totalApplicants: applications.reduce((s, a) => s + a.count, 0),
      jobs: jobsWithCounts
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};
