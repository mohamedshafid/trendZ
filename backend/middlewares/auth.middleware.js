import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, "mohamed@hafid");

    // Attach user to request
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not found.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Invalid or expired token.",
    });
  }
};
