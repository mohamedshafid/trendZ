import { Navbar, SignIn, SignUp } from "./components";
import { useAppContext } from "./contexts/AppContext";

const App = () => {
  // context.
  const { authModalOpen, formType } = useAppContext();

  return (
    <>
      {/* Auth Modal */}
      {authModalOpen && formType === "signup" && <Signup />}
      {authModalOpen && formType === "signin" && <Signin />}

      {/* Main Application */}
      <div className="w-full h-screen relative">
        <Navbar />
      </div>
    </>
  );
};

export default App;

// usage
// px-4 sm:px-8 md:px-12 lg:px-16 xl:20 2xl:px-24 py-4
