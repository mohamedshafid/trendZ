// Package imports
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Local imports
import { User } from "../models/user.model.js";

// Utility: Generate JWT token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 3600000,
  });
};

// SIGN UP CONTROLLER
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate token and set cookie
    const token = generateToken(newUser._id);
    setCookie(res, token);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("SignUp Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// SIGN IN CONTROLLER
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token and set cookie
    const token = generateToken(user._id);
    setCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("SignIn Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// SIGN OUT CONTROLLER
export const signOut = (req, res) => {
  try {
    res.clearCookie("token", { path: "/" });
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("SignOut Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET CURRENT USER
export const getCurrentUser = (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address || null,
      },
    });
  } catch (error) {
    console.error("GetCurrentUser Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ADDRESS DETAILS CONTROLLER
export const addressDetails = async (req, res) => {
  const { phone, street, city, pincode, country } = req.body;

  // Validate input
  if (!phone || !street || !city || !pincode) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  try {
    // Update user address
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        address: {
          phone,
          street,
          city,
          pincode,
          country: country || "India",
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address: user.address,
    });
  } catch (error) {
    console.error("AddressDetails Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
