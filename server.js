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


app.use(
  cors({
    origin: "https://job-portal-frontend-blush-zeta.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// handle preflight requests
app.options("*", cors());


app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/employer", require("./routes/employerDashboardRoutes"));


app.get("/", (req, res) => {
  res.send("Job Portal API is running...");
});


app.use((req, res) => {
  console.log(" UNMATCHED:", req.method, req.originalUrl);
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
