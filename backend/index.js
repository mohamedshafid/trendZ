// package imports
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// local imports
import { connectDB } from "./config/db.config.js";
import { userRouter } from "./routes/user.route.js";
import { cartRouter } from "./routes/cart.route.js";
import { stripeRouter } from "./routes/stripe.route.js";

// load environment variables
dotenv.config();

// create express app
const app = express();

// connect to the database
connectDB();

// allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // local frontend (Vite)
  "https://trendz-8m7k.onrender.com", // deployed frontend
];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// handle preflight OPTIONS requests globally
app.options(
  "*",
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// route handlers
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/stripe", stripeRouter);

// default route
app.get("/", (req, res) => {
  console.log("Net Route!");
  res.send("Net Route!");
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
