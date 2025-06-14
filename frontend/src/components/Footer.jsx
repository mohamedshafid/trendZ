import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import logo from "/icon.png";

const Footer = () => {
  return (
    <footer className="bg-white/70 backdrop-blur-md border-t border-gray-300 shadow-2xl text-gray-800 mt-20 px-6 md:px-16 py-12 font-sans rounded-t-2xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <p className="flex items-center text-4xl text-primary font-bold mb-3">
            Tr
            <img src={logo} alt="logo" className="w-12 h-12 rounds" />
            dZ
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Redefining fashion for every season. Discover premium styles for
            men, women, and kids — all in one place. Elevate your wardrobe with
            timeless trends and everyday essentials.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[#060d26]">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <a href="#" className="hover:text-[#060d26] transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#060d26] transition">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#060d26] transition">
                Popular
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#060d26] transition">
                New Arrivals
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[#060d26]">
            Customer Service
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <a href="#" className="hover:text-[#060d26] transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#060d26] transition">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#060d26] transition">
                Order Tracking
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#060d26] transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[#060d26]">
            Follow Us
          </h4>
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="hover:text-[#060d26] transition">
              <Instagram size={35} className="rounds" />
            </a>
            <a href="#" className="hover:text-[#060d26] transition">
              <Facebook size={35} className="rounds" />
            </a>
            <a href="#" className="hover:text-[#060d26] transition">
              <Twitter size={35} className="rounds" />
            </a>
            <a
              href="mailto:support@trendz.com"
              className="hover:text-[#060d26] transition"
            >
              <Mail size={35} className="rounds" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} TrendZ. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
