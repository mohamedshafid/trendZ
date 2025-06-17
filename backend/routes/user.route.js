// package import.
import express from "express";

// local import.
import {
  signIn,
  signOut,
  signUp,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

// creating a user router.
const userRouter = express.Router();

// defining user routes.
userRouter.post("/sign-in", signIn);
userRouter.post("/sign-up", signUp);
userRouter.get("/sign-out", signOut);

// Protected route
userRouter.get("/me", protect, getCurrentUser);

export { userRouter };
