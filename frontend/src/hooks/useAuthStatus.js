// hooks/useAuthStatus.js
import { useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";

export const useAuthStatus = () => {
  const { setUser } = useAppContext();
  const backend = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking authentication status...");
      try {
        const res = await axios.get(`${backend}/auth/me`, {
          withCredentials: true,
        });
        console.log("User data:", res.data.user);
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);
};
