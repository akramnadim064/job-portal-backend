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

















// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();

// /* =======================
//    CORS — MUST BE FIRST
// ======================= */
// const allowedOrigins = [
//   "https://job-portal-frontend-blush-zeta.vercel.app",
//   "http://localhost:3000",
// ];

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }

//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,POST,PUT,DELETE,OPTIONS"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization"
//   );

//   // 🚨 THIS IS THE KEY LINE
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204);
//   }

//   next();
// });

// app.use(express.json());

// /* =======================
//    ROUTES
// ======================= */
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/profile", require("./routes/profileRoutes"));
// app.use("/api/jobs", require("./routes/jobRoutes"));
// app.use("/api/applications", require("./routes/applicationRoutes"));
// app.use("/api/employer", require("./routes/employerDashboardRoutes"));

// /* =======================
//    HEALTH CHECK
// ======================= */
// app.get("/", (req, res) => {
//   res.send("Job Portal API is running...");
// });

// /* =======================
//    404
// ======================= */
// app.use((req, res) => {
//   console.log("❌ UNMATCHED:", req.method, req.originalUrl);
//   res.status(404).json({ message: "Route not found" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

















//morning
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

/**
 * ✅ 1. CORS CONFIGURATION
 * We allow both your specific Vercel preview link and any potential main domain.
 */
const allowedOrigins = [
  "https://job-portal-frontend-blush-zeta.vercel.app",
  // Add your main production domain here if it's different
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/**
 * ✅ 2. HANDLE PREFLIGHT
 * This responds to the browser's "check" request before the actual POST/GET
 */
app.options("*", cors());

/**
 * ✅ 3. MIDDLEWARE
 */
app.use(express.json());
// If you use files/images, uncomment this:
// app.use("/uploads", express.static("uploads"));

/**
 * ✅ 4. ROUTES
 */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/employer", require("./routes/employerDashboardRoutes"));

/**
 * ✅ 5. HEALTH CHECK
 * Use this to verify if the Render server is awake
 */
app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Job Portal API is running..." });
});

/**
 * ✅ 6. 404 CATCH-ALL
 * If you see this in your logs, your frontend is calling the wrong URL
 */
app.use((req, res) => {
  console.log(`⚠️ 404 - Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    message: "Route not found", 
    requestedUrl: req.originalUrl,
    method: req.method 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});