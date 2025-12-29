// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();

// const app = express();

// // Middlewares

// const allowedOrigins = [
//   "https://job-portal-frontend-blush-zeta.vercel.app",
//   "http://localhost:3000",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like Postman, mobile apps)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // only if you use cookies/auth headers
//   })
// );


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

// above is with local














































































const express = require("express"); 
const dotenv = require("dotenv"); 
const cors = require("cors"); 
const connectDB = require("./config/db"); 
dotenv.config(); 
const app = express(); 
/* ========================= 
   CORS CONFIG (GLOBAL) 
========================= */ 
const allowedOrigins = [ 
  "https://job-portal-frontend-blush-zeta.vercel.app", 
  "http://localhost:3000", 
]; 
app.use( 
  cors({ 
    origin: (origin, callback) => { 
      // allow Postman, curl, server-side calls 
      if (!origin) return callback(null, true); 
      if (allowedOrigins.includes(origin)) { 
        callback(null, true); 
      } else { 
        callback(new Error("CORS blocked")); 
      } 
    }, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: false, // ✅ IMPORTANT (JWT, not cookies) 
  }) 
); 
// Handle preflight explicitly 
app.options("*", cors()); 
/* ========================= 
   MIDDLEWARES 
========================= */ 
app.use(express.json()); 
app.use("/uploads", express.static("uploads")); 
/* ========================= 
   ROUTES 
========================= */
app.use("/api/auth", require("./routes/authRoutes")); 
app.use("/api/profile", require("./routes/profileRoutes")); 
app.use("/api/jobs", require("./routes/jobRoutes")); 
app.use("/api/applications", require("./routes/applicationRoutes")); 
app.use("/api/employer", require("./routes/employerDashboardRoutes")); 
/* ========================= 
TEST ROUTE 
========================= */ 
app.get("/", (req, res) => { 
res.send("Job Portal API is running..."); 
}); 
/* ========================= 
404 HANDLER 
========================= */ 
app.use((req, res) => { 
console.log("UNMATCHED:", req.method, req.originalUrl); 
res.status(404).json({ message: "Route not found" }); 
}); 
/* ========================= 
START SERVER 
========================= */ 
const PORT = process.env.PORT || 5000; 
// connectDB(); // enable when DB is ready 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));