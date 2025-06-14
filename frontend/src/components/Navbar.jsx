import { useState } from "react";
import clsx from "clsx";
import { BadgePlus, Hamburger, HeartPlus, PackageSearch } from "lucide-react";

import { navLinks } from "../lib";
import logo from "/icon.png";
import { useAppContext } from "../contexts/AppContext";

const Navbar = () => {
  // context.
  const { toggleAuthModal } = useAppContext();

  // Active Links.
  const [activeLink, setActiveLink] = useState("Home");

  // Function to handle link click.
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  // Menu clicks.
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="w-full flex justify-between items-center  px-4 sm:px-8 md:px-12 lg:px-16 xl:20 2xl:px-24 py-4 bg-white shadow-md backdrop-blur-3xl fixed top-0 left-0 z-49">
      <div className="cursor-pointer">
        <p className="flex items-center text-4xl text-primary font-bold">
          Tr
            <img src={logo} alt="logo" className="w-12 h-12 rounds" />
          dZ
        </p>
      </div>
      {/* Desktop Mode */}
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

      {/* Mobile Mode */}
      <ul
        className={clsx(
          "absolute top-20 right-4 z-50 w-48 p-4 bg-white rounded-lg shadow-md flex-col gap-4 text-sm font-thin md:hidden transition-all duration-300 ",
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
              setMenuOpen(false); // Close menu on click
            }}
          >
            <a href={link.href}>{link.name}</a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <HeartPlus size={30} className="cursor-pointer max-md:hidden rounds" />
        <PackageSearch
          size={30}
          className="cursor-pointer max-md:hidden rounds"
        />
        <button
          className="px-4 py-2 bg-primary text-white rounded-2xl max-md:hidden flex items-center gap-2 hover:bg-primary/90 transition-colors duration-300"
          onClick={toggleAuthModal}
        >
          <span>
            <BadgePlus />
          </span>
        </button>
        <span className="cursor-pointer max-md:block hidden bg-white rounds">
          <Hamburger size={30} onClick={() => toggleMenu()} />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
