// // // const Application = require("../models/Application");

// // // // APPLY FOR A JOB
// // // exports.applyJob = async (req, res) => {
// // //   try {
// // //     const { jobId } = req.params;

// // //     // prevent duplicate application
// // //     const existing = await Application.findOne({
// // //       job: jobId,
// // //       applicant: req.user._id
// // //     });

// // //     if (existing) {
// // //       return res.status(400).json({ message: "Already applied to this job" });
// // //     }

// // //     const application = await Application.create({
// // //       job: jobId,
// // //       applicant: req.user._id,
// // //       resumeUrl: req.body.resumeUrl
// // //     });

// // //     res.status(201).json(application);
// // //   } catch (error) {
// // //     res.status(500).json({ message: "Server error" });
// // //   }
// // // };

// // // // GET ALL APPLICATIONS FOR A JOB (Employer only)
// // // exports.getJobApplications = async (req, res) => {
// // //   const { jobId } = req.params;

// // //   const applications = await Application.find({ job: jobId })
// // //     .populate("applicant", "name email");

// // //   res.json(applications);
// // // };

// // // // GET JOB SEEKER'S OWN APPLICATIONS
// // // exports.getMyApplications = async (req, res) => {
// // //   const applications = await Application.find({ applicant: req.user._id })
// // //     .populate("job");

// // //   res.json(applications);
// // // };





// const Application = require("../models/Application");
// const Job = require("../models/Job");

// exports.applyJob = async (req, res) => {
//   try {
//     console.log("APPLY API HIT");  // <--- MUST SHOW IN TERMINAL

//     const jobId = req.params.jobId;
//     const userId = req.user.id;
//     const { resumeUrl } = req.body;

//     if (!resumeUrl) {
//       return res.status(400).json({ message: "Resume URL required" });
//     }

//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     const alreadyApplied = await Application.findOne({ job: jobId, user: userId });

//     if (alreadyApplied) {
//       return res.status(400).json({ message: "You already applied to this job" });
//     }

//     const application = await Application.create({
//       job: jobId,
//       applicant: userId,
//       resumeUrl,
//     });

//     res.status(201).json(application);
//   } catch (error) {
//     console.error("APPLY ERROR:", error);
//     res.status(500).json({ message: "Server error applying" });
//   }
// };


// const Application = require("../models/Application");
// const Job = require("../models/Job");
// const User = require("../models/User");


// exports.applyJob = async (req, res) => {
//   try {
//     console.log("APPLY API HIT");

//     //const jobId = req.params.id;
//     const jobId = req.params.jobId;   // ✅ CORRECT

//     const userId = req.user._id;
//     const { resumeUrl } = req.body;

//     // Check duplicate
//     const exists = await Application.findOne({ job: jobId, user: userId });
//     if (exists) {
//       return res.status(400).json({ message: "Already applied" });
//     }

//     // Save new application
//     const newApp = new Application({
//       job: jobId,
//       user: userId,
//       resumeUrl
//     });

//     await newApp.save();

//     return res.status(201).json({ message: "Application submitted", newApp });

//   } catch (error) {
//     console.error("APPLY ERROR:", error);
//     res.status(500).json({ message: "Failed to apply" });
//   }
// };




// const Application = require("../models/Application");
// const Job = require("../models/Job");

// exports.applyJob = async (req, res) => {
//   try {
//     const jobId = req.params.jobId;
//     const userId = req.user._id;
//     const { resumeUrl } = req.body;

//     // prevent duplicate
//     const exists = await Application.findOne({
//       job: jobId,
//       applicant: userId,
//     });

//     if (exists) {
//       return res.status(400).json({ message: "Already applied" });
//     }

//     // create application
//     await Application.create({
//       job: jobId,
//       applicant: userId,
//       resumeUrl,
//     });

//     // ✅ INCREMENT APPLICANT COUNT
//     await Job.findByIdAndUpdate(jobId, {
//       $inc: { applicantsCount: 1 },
//     });

//     res.status(201).json({ message: "Applied successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Apply failed" });
//   }
// };




// // //applicant 
// // const Application = require("../models/Application");
// // const Job = require("../models/Job");

// // // APPLY JOB
// // exports.applyJob = async (req, res) => {
// //   try {
// //     const jobId = req.params.jobId;
// //     const userId = req.user._id;
// //     const { resumeUrl } = req.body;

// //     const exists = await Application.findOne({
// //       job: jobId,
// //       applicant: userId,
// //     });

// //     if (exists) {
// //       return res.status(400).json({ message: "Already applied" });
// //     }

// //     await Application.create({
// //       job: jobId,
// //       applicant: userId,
// //       resumeUrl,
// //     });

// //     // increment count
// //     await Job.findByIdAndUpdate(jobId, {
// //       $inc: { applicantsCount: 1 },
// //     });

// //     // 🔥 SOCKET EVENT
// //     const io = req.app.get("io");
// //     io.emit("dashboardUpdated");

// //     res.status(201).json({ message: "Applied successfully" });
// //   } catch (error) {
// //     res.status(500).json({ message: "Apply failed" });
// //   }
// // };

// // // GET APPLICANTS BY JOB (EMPLOYER)
// // exports.getApplicantsByJob = async (req, res) => {
// //   try {
// //     const jobId = req.params.jobId;

// //     const applications = await Application.find({ job: jobId })
// //       .populate("applicant", "name email")
// //       .sort({ createdAt: -1 });

// //     res.json(applications);
// //   } catch (error) {
// //     res.status(500).json({ message: "Fetch failed" });
// //   }
// // };



























































// const Application = require("../models/Application");
// const Job = require("../models/Job");

// exports.applyJob = async (req, res) => {
//   try {
//     const jobId = req.params.jobId;
//     const userId = req.user._id;
//     const { resumeUrl } = req.body;

//     // prevent duplicate
//     const exists = await Application.findOne({
//       job: jobId,
//       applicant: userId,
//     });

//     if (exists) {
//       return res.status(400).json({ message: "Already applied" });
//     }




//     //ADDED ON 22ND DECEMBER
//     exports.getEmployerApplicants = async (req, res) => {
//   try {
//     const employerId = req.user._id;

//     const applications = await Application.find()
//       .populate("job", "title employer")
//       .populate("applicant", "name email")
//       .sort({ createdAt: -1 });

//     // 🔥 only applications for THIS employer
//     const filtered = applications.filter(
//       (app) => app.job && app.job.employer.toString() === employerId.toString()
//     );

//     res.json(filtered);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch applicants" });
//   }
// };
// //ADDED ON 22ND DECEMBER END




//     // create application
//     await Application.create({
//       job: jobId,
//       applicant: userId,
//       resumeUrl,
//     });

//     // ✅ INCREMENT APPLICANT COUNT
//     await Job.findByIdAndUpdate(jobId, {
//       $inc: { applicantsCount: 1 },
//     });

//     res.status(201).json({ message: "Applied successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Apply failed" });
//   }
// };





const Application = require("../models/Application");
const Job = require("../models/Job");


// exports.applyJob = async (req, res) => {
//   try {
//     const jobId = req.params.jobId;
//     const userId = req.user._id;
//     const { resumeUrl } = req.body;

//     const exists = await Application.findOne({
//       job: jobId,
//       applicant: userId,
//     });

//     if (exists) {
//       return res.status(400).json({ message: "Already applied" });
//     }

//     await Application.create({
//       job: jobId,
//       user: userId,
//       resumeUrl,
//     });

//     // increment applicant count
//     await Job.findByIdAndUpdate(jobId, {
//       $inc: { applicantsCount: 1 },
//     });

//     res.status(201).json({ message: "Applied successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Apply failed" });
//   }
// };


exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;
    const { resumeUrl } = req.body;

    const application = await Application.create({
      job: jobId,
      user: userId,
      resumeUrl,
    });

    res.status(201).json(application);
  } catch (error) {
    // 🔒 DUPLICATE APPLICATION (MongoDB unique index)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already applied to this job",
      });
    }

    console.error(error);
    res.status(500).json({ message: "Apply failed" });
  }
};




exports.getEmployerApplicants = async (req, res) => {
  try {
    const employerId = req.user._id;
    const { jobId } = req.query;

    // 1️⃣ Get employer jobs
    const jobs = await Job.find({ employer: employerId }).select("_id");
    const jobIds = jobs.map(j => j._id.toString());

    // 2️⃣ Optional filter by jobId
    const filter = {
      job: jobId ? jobId : { $in: jobIds }
    };

    const applications = await Application.find(filter)
      .populate("job", "title companyName location jobType")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error("EMPLOYER APPLICANTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch applicants" });
  }
};


// chip



//update function
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(applicationId)
      .populate("job");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // ensure employer owns the job
    if (
      application.job.employer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    console.error("STATUS UPDATE ERROR:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};









exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id,
    })
      .populate("job", "title companyName location jobType")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Get my applications error:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};
