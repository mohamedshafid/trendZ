// hooks/useAuthStatus.js
import { useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";

export const useAuthStatus = () => {
  const { setUser } = useAppContext();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/me`,
          {
            withCredentials: true,
          }
        );
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);
};
