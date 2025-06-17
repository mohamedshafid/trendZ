import express from "express";
import { stripeController } from "../controllers/stripe.controller.js";

const stripeRouter=express.Router();

stripeRouter.post("/create-checkout-session", stripeController);

export { stripeRouter };