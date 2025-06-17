import { createContext, useContext, useRef, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [formType, setFormType] = useState("signup");
  const [cartItems, setCartItems] = useState([]); // will be set via useCart
  const [user, setUser] = useState(null);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const formRef = useRef(null);

  const isInCart = (productId) => {
    return cartItems.some((item) => item.productId === productId);
  };

  // 🛒 Favorites Functions
  const addToFavorites = (product) => {
    const updated = [...favoriteItems, product];
    setFavoriteItems(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const removeFromFavorites = (productId) => {
    const updated = favoriteItems.filter((item) => item.id !== productId);
    setFavoriteItems(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isInFavorites = (productId) =>
    favoriteItems.some((item) => item.id === productId);

  const toggleFavoriteItem = (product) => {
    isInFavorites(product.id)
      ? removeFromFavorites(product.id)
      : addToFavorites(product);
  };

  const toggleAuthModal = () => setAuthModalOpen((prev) => !prev);
  const toggleFormType = () =>
    setFormType((prev) => (prev === "signup" ? "signin" : "signup"));

  return (
    <AppContext.Provider
      value={{
        authModalOpen,
        toggleAuthModal,
        formType,
        toggleFormType,
        formRef,
        cartItems,
        setCartItems,
        isInCart,
        favoriteItems,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
        toggleFavoriteItem,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Don't use useAppContext outside of AppProvider");
  }
  return context;
};
