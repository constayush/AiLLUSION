import React from "react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("nav") as HTMLElement;
      if (window.scrollY > 10) {
        nav.classList.add("scrolled-nav");
      } else {
        nav.classList.remove("scrolled-nav");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className="w-6xl fixed mt-16 top-0 z-50 flex items-center justify-between p-2 rounded-xl  ">
      <h1 className="text-lg font-semibold">Incognito-Art</h1>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links */}
      <ul
        className={`md:flex gap-6 absolute md:static top-[60px] left-0 w-full md:w-auto bg-[#ffffff10] md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 md:p-0 transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <li className="transition cursor-pointer hover:text-purple-400">
          <Link to="/">Home</Link>
        </li>
        <li className="transition cursor-pointer hover:text-purple-400">
          <Link to="/generate">Generate</Link>
        </li>
        <li className="transition cursor-pointer hover:text-purple-400">
          <Link to="/infinity-archive">Infinity Archive</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
