// src/services/userApi.js
import axios from "axios";

const backend="http://localhost:3000" ;


// Sign in
export const signInUser = async (userData) => {
  const res = await axios.post(
    `${backend}/api/v1/auth/sign-in`,
    userData,
    {
      withCredentials: true,
    }
  );
  return res.data.user;
};

// Sign up
export const signUpUser = async (userData) => {
  const res = await axios.post(
    `${backend}/api/v1/auth/sign-up`,
    userData,
    {
      withCredentials: true,
    }
  );

  return res.data.user;
};

// Sign out
export const signOutUser = async () => {
  const res = await axios.get(
    `${backend}/api/v1/auth/sign-out`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

// Get profile (must be authenticated)
export const getUserProfile = async () => {
  const res = await axios.get(
    `$${backend}/api/v1/auth/profile`,
    {
      withCredentials: true,
    }
  );
  return res.data.user;
};
