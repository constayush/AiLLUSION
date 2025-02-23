import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for menu toggle

function Home() {
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
    <div className="hero w-full min-h-screen flex flex-col justify-center items-center relative">
      {/* Navbar //width problem responsive*/} 
      <nav className="w-6xl fixed mt-16 top-0 z-50 flex items-center justify-between p-2 rounded-xl  ">
        <h1 className="text-lg font-semibold">Incognito-Art</h1>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <ul className={`md:flex gap-6 absolute md:static top-[60px] left-0 w-full md:w-auto bg-[#ffffff10] md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 md:p-0 transition-all duration-300 ${isMenuOpen ? "block" : "hidden"}`}>
          <li className="transition cursor-pointer hover:text-purple-400">Home</li>
          <li className="transition cursor-pointer hover:text-purple-400">Generate</li>
          <li className="transition cursor-pointer hover:text-purple-400">Infinity Archive</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="hero-con max-w-5xl mt-40 text-center flex flex-col justify-center items-center gap-6 px-4">
        <h1 className="text-5xl md:text-6xl leading-tight">
          Explore<span className="text-[#c757ff]">.</span> Discover
          <span className="text-[#c757ff]">.</span> Create
          <span className="text-[#c757ff]">.</span>
        </h1>
        <p className="text-lg md:text-2xl max-w-[80%] md:max-w-[60%] text-gray-300">
          Utilize generative AI and a distinctive set of tools to bring your
          ideas to life and share them with the world.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button className="bg-[#ffffff3a] font-semibold px-6 py-2 rounded-md shadow-md hover:bg-[#ffffff5a] transition">
            Generate now
          </button>
          <button className="border border-solid px-6 py-2 rounded-md hover:bg-[#ffffff15] transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Video Section */}
      <div className="video-con w-full md:max-w-6xl mt-20 rounded-xl relative h-[50vh] md:h-screen flex justify-center items-center bg-[#ffffff0b] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          src="../public/bgvid.mp4"
          className="absolute w-full h-full object-cover rounded-xl"
        ></video>
      </div>

      {/* Video Credits */}
      <a
        className="text-[#717171] italic mt-4"
        href="https://www.instagram.com/abhijeetsinghvirdii/"
        target="_blank"
        rel="noopener noreferrer"
      >
        video credits - @abhijeet
      </a>
    </div>
  );
}

export default Home;
