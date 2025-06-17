// hooks/useAuthStatus.js
import { useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";

export const useAuthStatus = () => {
  console.log("useAuthStatus hook initialized");
  const { setUser } = useAppContext();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };

    checkAuth();

    const interval = setInterval(checkAuth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
};
