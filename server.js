const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/profile", require("./routes/profileRoutes"));
// app.use("/api/jobs", require("./routes/jobRoutes"));
// app.use("/api/applications", require("./routes/applicationRoutes"));
// app.use("/api", require("./routes/applicationRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/employer", require("./routes/employerDashboardRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));




// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Job Portal API is running...");
});

// Routes will be added later
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/jobs", require("./routes/jobRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
