// package import.
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// local import.
import { connectDB } from "./config/db.config.js";
import { userRouter } from "./routes/user.route.js";
import { cartRouter } from "./routes/cart.route.js";
import { stripeRouter } from "./routes/stripe.route.js";
import cookieParser from "cookie-parser";

// loading environment variables from .env file.

// creating an express app.
const app = express();

// connecting to the database.
connectDB();

// allowing the server to accept requests from the frontend.
// const allowedOrigins = ["http://localhost:5173", "http://localhost:80"];

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// inbuild middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/stripe", stripeRouter);

// default route.
app.get("/", (req, res) => {
  console.log("Net Route!");
  res.send("Net Route!");
});

// starting the server.
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
