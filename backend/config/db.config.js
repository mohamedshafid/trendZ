// Package import.
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mohamedhafid825:hafid2005@cluster0.vkmpmh4.mongodb.net/trendZ?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};
