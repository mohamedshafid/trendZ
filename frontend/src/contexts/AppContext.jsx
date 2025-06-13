import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // You can add state and functions here that you want to share across your app
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [formType, setFormType] = useState("signup"); // "signup" or "signin"

  const toggleAuthModal = () => {
    setAuthModalOpen((prev) => !prev);
  };

  const toggleFormType = () => {
    setFormType((prev) => (prev === "signup" ? "signin" : "signup"));
  };

  // Example of a value to be provided
  const value = {
    authModalOpen,
    toggleAuthModal,
    formType,
    toggleFormType,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Don't use useAppContext outside of AppProvider");
  }
  return context;
};
