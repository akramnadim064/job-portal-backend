const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    location: String,
    jobType: String,
    companyName: String,
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ✅ IMPORTANT
    applicantsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
