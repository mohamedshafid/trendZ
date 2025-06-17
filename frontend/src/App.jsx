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

const App = () => {
  useAuthStatus(); // Check authentication status on app load
  const {
    authModalOpen,
    formType,
    toggleAuthModal,
    formRef,
    cartItems,
    favoriteItems,
    user,
  } = useAppContext();
  console.log("Cart Items:", cartItems);
  console.log("Favorite Items:", favoriteItems);
  console.log("User:", user);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
    document.title = "TrendZ - Your Fashion Destination"; // Set page title

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
