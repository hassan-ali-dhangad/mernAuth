// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";

// dotenv.config();

// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";

// const app = express();

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://mern-auth-frontend-securely.vercel.app",
//     ],
//     credentials: true,
//   }),
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.json({
//     message: "Welcome to the MERN Stack Authentication API",
//   });
// });

// app.use("/api/auth", authRoutes);

// // Connect to MongoDB before handling API requests
// app.use(async (req, res, next) => {
//   try {
//     await connectDB();
//     next();
//   } catch (error) {
//     console.error("Database connection error:", error);
//     res.status(500).json({
//       message: "Database connection failed",
//     });
//   }
// });

// export default app;

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";

// dotenv.config();

// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";

// const app = express();

// connectDB();

// // app.use(
// //   cors({
// //     origin: "http://localhost:5173",
// //     credentials: true,
// //   }),
// // );

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://mern-auth-frontend-securely.vercel.app",
//     ],
//     credentials: true,
//   }),
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.json({
//     message: "Welcome to the MERN Stack Authentication API",
//   });
// });

// app.use("/api/auth", authRoutes);

// export default app;

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();


import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();


connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-auth-frontend-securely.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the MERN Stack Authentication API",
  });
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
