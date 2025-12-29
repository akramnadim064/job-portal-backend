// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));
// // app.use("/api/auth", require("./routes/authRoutes"));
// // app.use("/api/auth", require("./routes/authRoutes"));
// // app.use("/api/profile", require("./routes/profileRoutes"));
// // app.use("/api/jobs", require("./routes/jobRoutes"));
// // app.use("/api/applications", require("./routes/applicationRoutes"));
// // app.use("/api", require("./routes/applicationRoutes"));
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/profile", require("./routes/profileRoutes"));
// app.use("/api/jobs", require("./routes/jobRoutes"));
// app.use("/api/applications", require("./routes/applicationRoutes"));
// app.use("/api/employer", require("./routes/employerDashboardRoutes"));
// //app.use("/api/profile", require("./routes/profileRoutes"));




// // Connect DB
// connectDB();

// // Test route
// app.get("/", (req, res) => {
//   res.send("Job Portal API is running...");
// });


// app.use((req, res) => {
//   console.log("UNMATCHED:", req.method, req.originalUrl);
//   res.status(404).json({ message: "Route not found" });
// });
// // Routes will be added later
// // app.use("/api/auth", require("./routes/authRoutes"));
// // app.use("/api/jobs", require("./routes/jobRoutes"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();

// // middlewares
// app.use(cors());
// app.use(express.json());

// // ROUTES
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/profile", require("./routes/profileRoutes"));
// app.use("/api/jobs", require("./routes/jobRoutes"));
// app.use("/api/applications", require("./routes/applicationRoutes"));
// app.use("/api/employer", require("./routes/employerDashboardRoutes"));

// // health check
// app.get("/", (req, res) => {
//   res.send("Job Portal API is running...");
// });

// // DEBUG: catch unmatched routes
// app.use((req, res) => {
//   console.log(" UNMATCHED:", req.method, req.originalUrl);
//   res.status(404).json({ message: "Route not found" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
















const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/**
 * Allowed frontend origins
 */
const allowedOrigins = [
  "https://job-portal-frontend-blush-zeta.vercel.app",
  "http://localhost:3000",
];

/**
 * CORS configuration
 */
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * Handle preflight requests
 */
app.options("*", cors());

/**
 * Body parser
 */
app.use(express.json());

/**
 * Routes
 */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/employer", require("./routes/employerDashboardRoutes"));

/**
 * Health check
 */
app.get("/", (req, res) => {
  res.send("Job Portal API is running...");
});

/**
 * 404 handler
 */
app.use((req, res) => {
  console.log("UNMATCHED:", req.method, req.originalUrl);
  res.status(404).json({ message: "Route not found" });
});

/**
 * Server start
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});