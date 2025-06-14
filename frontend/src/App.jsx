import { useEffect } from "react";
import {
  Categories,
  Footer,
  Hero,
  Navbar,
  NewsLettter,
  Popular,
  Signin,
  Signup,
} from "./components";
import { useAppContext } from "./contexts/AppContext";

const App = () => {
  // context.
  const { authModalOpen, formType, toggleAuthModal, formRef } = useAppContext();

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        toggleAuthModal(false); // Close form
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
      {/* Auth Modal */}
      {authModalOpen && formType === "signup" && <Signup />}
      {authModalOpen && formType === "signin" && <Signin />}
      <Navbar />

      {/* Main Application */}
      <div className="w-full min-h-screen relative px-2 sm:px-4 md:px-8 lg:px-12 xl:16 2xl:px-20 py-4">
        <Hero />
        <Popular />
        <Categories/>
        <NewsLettter />
      </div>

      <Footer />
    </>
  );
};

export default App;

// usage
// px-4 sm:px-8 md:px-12 lg:px-16 xl:20 2xl:px-24 py-4
