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
  const { toggleAuthModal, user } = useAppContext();

  const [activeLink, setActiveLink] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { mutate: signOut } = useSignOut();

  const handleLinkClick = (link) => setActiveLink(link);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-4 bg-white shadow-md backdrop-blur-3xl fixed top-0 left-0 z-49">
      {/* Logo */}
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <p className="flex items-center text-4xl text-primary font-bold">
          Tr
          <img src={logo} alt="logo" className="w-12 h-12 rounded-full" />
          dZ
        </p>
      </div>

      {/* Desktop Nav */}
      <ul className="flex gap-4 text-sm font-thin max-md:hidden">
        {navLinks.map((link) => (
          <li
            key={link.name}
            className={clsx(
              "cursor-pointer hover:text-primary transition-colors duration-300",
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

      {/* Mobile Nav */}
      <ul
        className={clsx(
          "absolute top-20 right-4 z-50 w-48 p-4 bg-white rounded-lg shadow-md flex-col gap-4 text-sm font-thin md:hidden transition-all duration-300",
          {
            flex: menuOpen,
            hidden: !menuOpen,
          }
        )}
      >
        {navLinks.map((link) => (
          <li
            key={link.name}
            className={clsx(
              "cursor-pointer hover:text-primary transition-colors duration-300",
              {
                "text-primary font-semibold": activeLink === link.name,
                "text-gray-600": activeLink !== link.name,
              }
            )}
            onClick={() => {
              handleLinkClick(link.name);
              setMenuOpen(false);
            }}
          >
            <a href={link.href}>{link.name}</a>
          </li>
        ))}
      </ul>

      {/* Right Section */}
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

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg py-2 text-sm z-50">
                <button
                  onClick={() => {
                    signOut(undefined, {
                      onSuccess: () => {
                        toast.success("Signed out successfully!");
                        navigate("/");
                      },
                      onError: (err) => {
                        toast.error(
                          err?.response?.data?.message || "Sign out failed"
                        );
                      },
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 transition-colors"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="px-4 py-2 bg-primary text-white rounded-2xl max-md:hidden flex items-center gap-2 hover:bg-primary/90 transition-colors duration-300"
            onClick={toggleAuthModal}
          >
            <BadgePlus />
          </button>
        )}

        {/* Mobile Hamburger */}
        <span className="cursor-pointer max-md:block hidden bg-white">
          <Hamburger size={30} onClick={toggleMenu} />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
