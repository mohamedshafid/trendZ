import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import {
  BadgePlus,
  Hamburger,
  HeartPlus,
  PackageSearch,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { navLinks } from "../lib";
import logo from "/icon.png";
import { useAppContext } from "../contexts/AppContext";
import { useSignOut } from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleAuthModal, user, setUser, setCartItems } = useAppContext();

  const [activeLink, setActiveLink] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { mutate: signOut } = useSignOut();

  const handleLinkClick = (link) => setActiveLink(link);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="font-sans w-full flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 bg-white shadow-md transition-all duration-300 fixed top-0 left-0 z-48">
      {/* Logo */}
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <p className="flex items-center text-4xl text-primary font-bold">
          Tr
          <img src={logo} alt="logo" className="w-12 h-12 rounded-full mx-1" />
          dZ
        </p>
      </div>

      {/* Desktop Nav */}
      <ul className="flex gap-6 text-sm font-medium max-md:hidden">
        {navLinks.map((link) => (
          <li
            key={link.name}
            className={clsx(
              "cursor-pointer hover:text-primary transition-all duration-200",
              {
                "text-primary font-semibold": activeLink === link.name,
                "text-gray-600": activeLink !== link.name,
              }
            )}
            onClick={() => handleLinkClick(link.name)}
          >
            <a href={link.href}>{link.name}</a>
          </li>
        ))}
      </ul>

      {/* Mobile Nav (Slide-in from Right) */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-64 p-6 bg-white/60 backdrop-blur-xl shadow-2xl z-100 transition-transform duration-300 flex flex-col gap-4 text-sm font-medium",
          {
            "translate-x-0": menuOpen,
            "translate-x-full": !menuOpen,
          }
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <p className="text-xl font-bold text-primary">Menu</p>
          <button onClick={toggleMenu}>✕</button>
        </div>

        {navLinks.map((link) => (
          <div
            key={link.name}
            className={clsx(
              "py-2 px-3 rounded-lg hover:bg-white/50 transition cursor-pointer",
              {
                "text-primary font-semibold bg-white/40":
                  activeLink === link.name,
              }
            )}
            onClick={() => {
              handleLinkClick(link.name);
              setMenuOpen(false);
              navigate(link.href);
            }}
          >
            <a href={link.href}>{link.name}</a>
          </div>
        ))}

        <hr className="my-4 border-white/30" />

        <div
          className="py-2 px-3 rounded-lg hover:bg-white/50 transition cursor-pointer"
          onClick={() => {
            navigate("/favorites");
            setMenuOpen(false);
          }}
        >
          Favorites
        </div>

        <div
          className="py-2 px-3 rounded-lg hover:bg-white/50 transition cursor-pointer"
          onClick={() => {
            navigate("/cart");
            setMenuOpen(false);
          }}
        >
          Cart
        </div>

        {user ? (
          <div
            className="py-2 px-3 rounded-lg hover:bg-white/50 transition cursor-pointer"
            onClick={() =>
              signOut(undefined, {
                onSuccess: () => {
                  setUser(null);
                  setCartItems([]);
                  toast.success("Signed out successfully!");
                  navigate("/");
                },
                onError: (err) => {
                  toast.error(
                    err?.response?.data?.message || "Sign out failed"
                  );
                },
              })
            }
          >
            Sign Out
          </div>
        ) : (
          <div
            className="py-2 px-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition cursor-pointer"
            onClick={() => {
              toggleAuthModal();
              setMenuOpen(false);
            }}
          >
            Login
          </div>
        )}
      </div>

      {/* Right Section - Desktop */}
      <div className="flex items-center gap-3">
        <HeartPlus
          size={30}
          className="cursor-pointer max-md:hidden"
          onClick={() => navigate("/favorites")}
        />
        <PackageSearch
          size={30}
          className="cursor-pointer max-md:hidden"
          onClick={() => navigate("/cart")}
        />
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <div
              className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm shadow-md cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              {user.name[0].toUpperCase()}
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg py-2 text-sm z-50">
                <button
                  onClick={() =>
                    signOut(undefined, {
                      onSuccess: () => {
                        setUser(null);
                        setCartItems([]);
                        toast.success("Signed out successfully!");
                        navigate("/");
                      },
                      onError: (err) => {
                        toast.error(
                          err?.response?.data?.message || "Sign out failed"
                        );
                      },
                    })
                  }
                  className="px-4 py-2 w-full hover:bg-gray-100 transition-colors text-left"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="px-4 py-2 bg-primary text-white rounded-2xl max-md:hidden flex items-center gap-2 hover:bg-primary/90 transition"
            onClick={toggleAuthModal}
          >
            <BadgePlus />
          </button>
        )}

        {/* Mobile Hamburger */}
        <span className="cursor-pointer md:hidden block z-50">
          <Hamburger size={30} onClick={toggleMenu} />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
