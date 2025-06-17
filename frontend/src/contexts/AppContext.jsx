import { createContext, useContext, useRef, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // You can add state and functions here that you want to share across your app
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [formType, setFormType] = useState("signup"); // "signup" or "signin"
  const [cartItems, setCartItems] = useState([]); // Example state for cart items
  const [user, setUser] = useState(null); // Example state for user information
  const [favoriteItems, setFavoriteItems] = useState([]);

  
  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Function to check if a product is already in the cart
  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  // Function to toggle a product in the cart
  const toggleCartItem = (product) => {
    if (isInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  // Favorites functions
  const addToFavorites = (product) => {
    setFavoriteItems((prev) => [...prev, product]);
    localStorage.setItem(
      "favorites",
      JSON.stringify([...favoriteItems, product])
    );
  };

  const removeFromFavorites = (productId) => {
    setFavoriteItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInFavorites = (productId) => {
    return favoriteItems.some((item) => item.id === productId);
  };

  const toggleFavoriteItem = (product) => {
    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  // Reference for the form, useful for handling clicks outside the modal
  const formRef = useRef(null);

  // Functions to handle the authentication modal
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
    formRef,
    cartItems,
    addToCart,
    removeFromCart,
    isInCart,
    toggleCartItem,
    favoriteItems,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    toggleFavoriteItem,
    user,
    setUser, 
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
