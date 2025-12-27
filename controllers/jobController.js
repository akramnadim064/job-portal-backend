// const Job = require("../models/Job");

// // CREATE JOB
// exports.createJob = async (req, res) => {
//   try {
//     const job = await Job.create({
//       ...req.body,
//       employer: req.user._id,
//       companyName: req.body.companyName
//     });
//     res.status(201).json(job);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // GET ALL JOBS
// exports.getJobs = async (req, res) => {
//   const jobs = await Job.find().sort({ createdAt: -1 });
//   res.json(jobs);
// };

// // GET JOB BY ID
// exports.getJobById = async (req, res) => {
//   const job = await Job.findById(req.params.id);
//   if (!job) return res.status(404).json({ message: "Job not found" });
//   res.json(job);
// };

// // UPDATE JOB
// exports.updateJob = async (req, res) => {
//   const job = await Job.findById(req.params.id);

//   if (!job) return res.status(404).json({ message: "Job not found" });

//   if (job.employer.toString() !== req.user._id.toString()) {
//     return res.status(403).json({ message: "Not authorized" });
//   }

//   const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
//     new: true
//   });

//   res.json(updated);
// };

// // DELETE JOB
// exports.deleteJob = async (req, res) => {
//   const job = await Job.findById(req.params.id);

//   if (!job) return res.status(404).json({ message: "Job not found" });

//   if (job.employer.toString() !== req.user._id.toString()) {
//     return res.status(403).json({ message: "Not authorized" });
//   }

//   await job.deleteOne();

//   res.json({ message: "Job deleted" });
// };












// const Job = require("../models/Job");

// // CREATE JOB
// exports.createJob = async (req, res) => {
//   try {
//     const job = await Job.create({
//       ...req.body,
//       employer: req.user._id,
//       companyName: req.body.companyName
//     });
//     res.status(201).json(job);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // GET ALL JOBS (ONLY LIST, NO FILTERS)
// exports.getJobs = async (req, res) => {
//   const jobs = await Job.find().sort({ createdAt: -1 });
//   res.json(jobs);
// };

// // ⭐ NEW — GET ALL JOBS WITH SEARCH & FILTERS
// exports.getAllJobs = async (req, res) => {
//   try {
//     const { keyword, location, jobType } = req.query;

//     let query = {};

//     // Search by title keyword
//     if (keyword) {
//       query.title = { $regex: keyword, $options: "i" };
//     }

//     // Filter by location
//     if (location) {
//       query.location = { $regex: location, $options: "i" };
//     }

//     // Filter by job type
//     if (jobType) {
//       query.jobType = jobType;
//     }

//     const jobs = await Job.find(query).sort({ createdAt: -1 });

//     res.json(jobs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // GET JOB BY ID
// exports.getJobById = async (req, res) => {
//   const job = await Job.findById(req.params.id);
//   if (!job) return res.status(404).json({ message: "Job not found" });
//   res.json(job);
// };

// // UPDATE JOB
// exports.updateJob = async (req, res) => {
//   const job = await Job.findById(req.params.id);

//   if (!job) return res.status(404).json({ message: "Job not found" });

//   if (job.employer.toString() !== req.user._id.toString()) {
//     return res.status(403).json({ message: "Not authorized" });
//   }

//   const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
//     new: true
//   });

//   res.json(updated);
// };

// // DELETE JOB
// exports.deleteJob = async (req, res) => {
//   const job = await Job.findById(req.params.id);

//   if (!job) return res.status(404).json({ message: "Job not found" });

//   if (job.employer.toString() !== req.user._id.toString()) {
//     return res.status(403).json({ message: "Not authorized" });
//   }

//   await job.deleteOne();

//   res.json({ message: "Job deleted" });
// };


// // GET ALL JOBS WITH SEARCH & FILTERS
// exports.getAllJobs = async (req, res) => {
//   try {
//     const { keyword, location, jobType } = req.query;

//     let query = {};

//     // Search by title keyword
//     if (keyword) {
//       query.title = { $regex: keyword, $options: "i" };
//     }

//     // Filter by location
//     if (location) {
//       query.location = { $regex: location, $options: "i" };
//     }

//     // Filter by job type
//     if (jobType) {
//       query.jobType = jobType;
//     }

//     const jobs = await Job.find(query).sort({ createdAt: -1 });

//     res.json(jobs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // GET ALL JOBS WITH SEARCH & FILTERING
// exports.getAllJobs = async (req, res) => {
//   try {
//     const { keyword, location, jobType } = req.query;

//     let query = {};

//     // 🔍 Search across multiple fields
//     if (keyword) {
//       query.$or = [
//         { title: { $regex: keyword, $options: "i" } },
//         { description: { $regex: keyword, $options: "i" } },
//         { responsibilities: { $regex: keyword, $options: "i" } },
//         { companyName: { $regex: keyword, $options: "i" } }
//       ];
//     }

//     // 📍 Filter by location
//     if (location) {
//       query.location = { $regex: location, $options: "i" };
//     }

//     // 💼 Filter by jobType
//     if (jobType) {
//       query.jobType = { $regex: jobType, $options: "i" };
//     }

//     const jobs = await Job.find(query).sort({ createdAt: -1 });

//     res.status(200).json(jobs);

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };








// const Job = require("../models/Job");

// // CREATE JOB
// exports.createJob = async (req, res) => {
//   try {
//     const job = await Job.create({
//       ...req.body,
//       employer: req.user._id,
//       companyName: req.body.companyName
//     });
//     res.status(201).json(job);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // GET JOBS (SEARCH + FILTER)
// exports.getJobs = async (req, res) => {
//   console.log("SEARCH API CALLED", req.query);

//   try {
//     const { keyword, location, jobType } = req.query;

//     let query = {};

//     if (keyword) {
//       query.$or = [
//         { title: { $regex: keyword, $options: "i" } },
//         { description: { $regex: keyword, $options: "i" } },
//         { responsibilities: { $regex: keyword, $options: "i" } },
//         { qualifications: { $regex: keyword, $options: "i" } },
//         { companyName: { $regex: keyword, $options: "i" } }
//       ];
//     }

//     if (location) {
//       query.location = { $regex: location, $options: "i" };
//     }

//     if (jobType) {
//       query.jobType = { $regex: jobType, $options: "i" };
//     }

//     const jobs = await Job.find(query).sort({ createdAt: -1 });

//     res.status(200).json(jobs);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // GET SINGLE JOB
// exports.getJobById = async (req, res) => {
//   const job = await Job.findById(req.params.id);
//   if (!job) return res.status(404).json({ message: "Job not found" });
//   res.json(job);
// };

// // UPDATE JOB
// exports.updateJob = async (req, res) => {
//   const job = await Job.findById(req.params.id);

//   if (!job) return res.status(404).json({ message: "Job not found" });

//   if (job.employer.toString() !== req.user._id.toString()) {
//     return res.status(403).json({ message: "Not authorized" });
//   }

//   const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
//     new: true
//   });

//   res.json(updated);
// };

// // DELETE JOB
// exports.deleteJob = async (req, res) => {
//   const job = await Job.findById(req.params.id);

//   if (!job) return res.status(404).json({ message: "Job not found" });

//   if (job.employer.toString() !== req.user._id.toString()) {
//     return res.status(403).json({ message: "Not authorized" });
//   }

//   await job.deleteOne();

//   res.json({ message: "Job deleted" });
// };




const Job = require("../models/Job");

// --- JOB TYPE NORMALIZATION ---
// Converts any frontend variation → backend DB format
const normalizeJobType = (input) => {
  if (!input) return null;

  const clean = input.toLowerCase().trim().replace(/[-\s]/g, "");

  const map = {
    fulltime: "Full-time",
    parttime: "Part-time",
    internship: "Internship",
    remote: "Remote",
  };

  return map[clean] || null;
};




// CREATE JOB (manual jobType, no validation)
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      employer: req.user._id,
      companyName: req.body.companyName || req.user.name,
      jobType: req.body.jobType || req.body.type || "",   // accept anything
    });

    res.status(201).json(job);
  } catch (error) {
    console.log("JOB CREATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// // -------------------------
// // CREATE JOB
// // -------------------------
// exports.createJob = async (req, res) => {
//   try {
//     let receivedType = req.body.jobType;
//     let normalizedType = normalizeJobType(receivedType);

//     if (!normalizedType) {
//       return res.status(400).json({
//         message:
//           "Invalid job type. Allowed: Full-Time, Part-Time, Internship, Remote",
//       });
//     }

//     const job = await Job.create({
//       ...req.body,
//       jobType: normalizedType,
//       employer: req.user._id,
//       companyName: req.body.companyName || req.user.name,
//     });

//     res.status(201).json(job);
//   } catch (error) {
//     console.log("JOB CREATE ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// -------------------------
// GET JOBS (SEARCH + FILTER)
// -------------------------
exports.getJobs = async (req, res) => {
  try {
    const { keyword, location, jobType } = req.query;
    let query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { responsibilities: { $regex: keyword, $options: "i" } },
        { qualifications: { $regex: keyword, $options: "i" } },
        { companyName: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
      const normalized = normalizeJobType(jobType);
      if (normalized) query.jobType = normalized;
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.log("JOB GET ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------
// GET SINGLE JOB
// -------------------------
exports.getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) return res.status(404).json({ message: "Job not found" });

  res.json(job);
};

// -------------------------
// UPDATE JOB
// -------------------------
exports.updateJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) return res.status(404).json({ message: "Job not found" });

  if (job.employer.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  // Normalize job type if included
  if (req.body.jobType) {
    req.body.jobType = normalizeJobType(req.body.jobType);
  }

  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
};

// -------------------------
// DELETE JOB
// -------------------------
exports.deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) return res.status(404).json({ message: "Job not found" });

  if (job.employer.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await job.deleteOne();

  res.json({ message: "Job deleted" });
};
