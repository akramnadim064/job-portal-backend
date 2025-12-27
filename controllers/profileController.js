const JobSeekerProfile = require("../models/JobSeekerProfile");
const EmployerProfile = require("../models/EmployerProfile");

// GET Job Seeker Profile
exports.getJobSeekerProfile = async (req, res) => {
  const profile = await JobSeekerProfile.findOne({ user: req.user._id });
  res.json(profile);
};

// UPDATE or CREATE Job Seeker Profile
exports.updateJobSeekerProfile = async (req, res) => {
  const data = req.body;

  const profile = await JobSeekerProfile.findOneAndUpdate(
    { user: req.user._id },
    data,
    { new: true, upsert: true }
  );

  res.json(profile);
};

// GET Employer Profile
exports.getEmployerProfile = async (req, res) => {
  const profile = await EmployerProfile.findOne({ user: req.user._id });
  res.json(profile);
};

// UPDATE or CREATE Employer Profile
exports.updateEmployerProfile = async (req, res) => {
  const data = req.body;

  const profile = await EmployerProfile.findOneAndUpdate(
    { user: req.user._id },
    data,
    { new: true, upsert: true }
  );

  res.json(profile);
};


//josbseeker
exports.getMyProfile = async (req, res) => {
  try {
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
