import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get("/", protect, getCart);

cartRouter.post("/add", protect, addToCart);

cartRouter.delete("/remove/:productId", protect, removeFromCart);

export { cartRouter };
