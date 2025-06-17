// package import.
import express from "express";

// local import.
import { signIn, signOut, signUp,getUserProfile } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

// creating a user router.
const userRouter = express.Router();

// defining user routes.
userRouter.post("/sign-in", signIn);
userRouter.post("/sign-up", signUp);
userRouter.get("/sign-out", signOut);

// Protected route 
userRouter.get("/profile",protect, getUserProfile);

export { userRouter };
