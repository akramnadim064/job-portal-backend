const mongoose = require("mongoose");

const jobSeekerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeUrl: { type: String },
    skills: [String],
    experience: [
      {
        company: String,
        role: String,
        from: Date,
        to: Date,
        description: String,
      }
    ],
    contactNumber: String,
    location: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobSeekerProfile", jobSeekerProfileSchema);
