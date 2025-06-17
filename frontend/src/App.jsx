import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer, Signin, Signup } from "./components";
import { useAppContext } from "./contexts/AppContext";

// pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import ProductDetail from "./pages/ProductDetail";

import { useEffect } from "react";
import { useAuthStatus } from "./hooks/useAuthStatus";
import { useCart } from "./hooks/useCart"; // 🆕 import useCart

const App = () => {
  useAuthStatus(); // ✅ Load user on app start
  const {
    authModalOpen,
    formType,
    toggleAuthModal,
    formRef,
    cartItems,
    user,
    setCartItems, // 🆕 used to update cart globally
  } = useAppContext();

  // 🆕 Fetch cart only when user is available
  const { data: cartData, isSuccess } = useCart({
    enabled: !!user,
  });

  // 🆕 Update cart in global context when data is fetched
  useEffect(() => {
    if (isSuccess && cartData) {
      setCartItems(cartData.items); // ✅ set cart items globally
    }
  }, [isSuccess, cartData, setCartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "TrendZ - Your Fashion Destination";

    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        toggleAuthModal(false);
      }
    }
    if (authModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [authModalOpen, toggleAuthModal]);

  console.log("Cart Items:", cartItems); // 🆕 Debugging cart items

  return (
    <>
      {authModalOpen && formType === "signup" && <Signup />}
      {authModalOpen && formType === "signin" && <Signin />}
      <Navbar />

      <div className="w-full min-h-screen relative px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/product/:productId/*" element={<ProductDetail />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
