const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    resumeUrl: { type: String },
    status: {
      type: String,
      enum: ["Applied", "Reviewed", "Accepted", "Rejected"],
      default: "Applied"
    }
  },
  { timestamps: true }
);

applicationSchema.index(
  { job: 1, user: 1 },
  { unique: true }
);
module.exports = mongoose.model("Application", applicationSchema);
