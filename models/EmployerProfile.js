const mongoose = require("mongoose");

const employerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: { type: String, required: true },
    companyDescription: String,
    logoUrl: String,
    website: String,
    contactNumber: String,
    location: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployerProfile", employerProfileSchema);
