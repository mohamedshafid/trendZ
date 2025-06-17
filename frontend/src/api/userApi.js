// src/services/userApi.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

// Sign in
export const signInUser = async (userData) => {
  const res = await axios.post(`${BASE_URL}/auth/sign-in`, userData, {
    withCredentials: true,
  });
  return res.data.user;
};

// Sign up
export const signUpUser = async (userData) => {
  const res = await axios.post(`${BASE_URL}/auth/sign-up`, userData, {
    withCredentials: true,
  });

  return res.data.user;
};

// Sign out
export const signOutUser = async () => {
  const res = await axios.get(`${BASE_URL}/auth/sign-out`, {
    withCredentials: true,
  });
  return res.data;
};

// Get profile (must be authenticated)
export const getUserProfile = async () => {
  const res = await axios.get(`${BASE_URL}/auth/profile`, {
    withCredentials: true,
  });
  return res.data.user;
};
