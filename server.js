const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middlewares

const allowedOrigins = [
  "https://job-portal-frontend-blush-zeta.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // only if you use cookies/auth headers
  })
);


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
//app.use("/api/profile", require("./routes/profileRoutes"));




// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Job Portal API is running...");
});


app.use((req, res) => {
  console.log("UNMATCHED:", req.method, req.originalUrl);
  res.status(404).json({ message: "Route not found" });
});
// Routes will be added later
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/jobs", require("./routes/jobRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






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

// /**
//  * Allowed frontend origins
//  */
// const allowedOrigins = [
//   "https://job-portal-frontend-blush-zeta.vercel.app",
//   "http://localhost:3000",
// ];

// // 2. Configure the CORS options
// const corsOptions = {
//   origin: (origin, callback) => {
//     // Check if the origin is in the allowed list
//     // !origin allows requests without an origin (like Postman, mobile apps, or server-side curl)
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Set to true if you need to send cookies or authorization headers
//   optionsSuccessStatus: 200
// };




// /**
//  * Body parser
//  */
// app.use(express.json());

// /**
//  * Routes
//  */
// app.use("ap/auth", require("./routes/authRoutes"));
// app.use("ap/profile", require("./routes/profileRoutes"));
// app.use("ap/jobs", require("./routes/jobRoutes"));
// app.use("ap/applications", require("./routes/applicationRoutes"));
// app.use("ap/employer", require("./routes/employerDashboardRoutes"));

// /**
//  * Health check
//  */
// app.get("/", (req, res) => {
//   res.send("Job Portal API is running...");
// });

// /**
//  * 404 handler
//  */
// app.use((req, res) => {
//   console.log("UNMATCHED:", req.method, req.originalUrl);
//   res.status(404).json({ message: "Route not found" });
// });

// /**
//  * Server start
//  */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });