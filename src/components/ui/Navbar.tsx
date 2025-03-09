import React from "react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router";
import { Search } from "lucide-react";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector(".nav") as HTMLElement;
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
    <nav className="w-full fixed z-50 top-0 left-0 mt-8 p-1 md:p-0 md:mt-16  flex justify-center items-center">
      <div className="w-5xl  nav  flex items-center justify-between p-4 md:p-2 rounded-xl  ">
        <h1 className="text-lg font-semibold text-[#f5e0ff]">Incognito-Art</h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

       


        {/* Navigation Links */}
        <ul
          className={`md:flex gap-6 absolute md:static top-[60px] left-0 w-full md:w-auto bg-[#ffffff10] md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 md:p-0 transition-all duration-300 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <li className="transition  cursor-pointer ">
            <NavLink
             className={({isActive})=> `${isActive ? "text-[#d788ff]  tracking-widest" : ""} btn-flip`}
              data-front="Home"
              data-back="Home"
              to="/"
            ></NavLink>
          </li>
          <li className="transition cursor-pointer ">
            <NavLink
              className={({isActive})=> `btn-flip ${isActive ? "text-[#d788ff] tracking-widest" : ""}`}
              data-front="Generate"
              data-back="Generate"
              to="/generate"
            ></NavLink>
          </li>
          <li className="transition cursor-pointer ">
            <NavLink
              className={({isActive})=> `btn-flip ${isActive ? "text-[#d788ff] tracking-widest" : ""}`}
              data-front="Search"
              data-back="Search"
              to="/search"
            ></NavLink>
          </li>
          {/* <li className="transition cursor-pointer hover:text-purple-400">
          <Link to="/infinity-archive">Infinity Archive</Link>
        </li> */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
