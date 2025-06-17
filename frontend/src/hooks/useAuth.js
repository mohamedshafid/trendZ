// src/hooks/userHooks.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  signInUser,
  signUpUser,
  signOutUser,
} from "../api/userApi";

// Get user profile
export const useUserProfile = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
    retry: false,
  });

// Sign in
export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

// Sign up
export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

// Sign out
export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      queryClient.removeQueries(["user"]);
    },
  });
};
