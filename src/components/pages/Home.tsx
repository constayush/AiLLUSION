import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for menu toggle
import { ArrowRight } from "lucide-react";
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
      <div className="grid-bg z-0 absolute min-w-full min-h-screen"></div>
      {/* Navbar //width problem responsive*/}
      <nav className="w-6xl fixed mt-16 top-0 z-50 flex items-center justify-between p-2 rounded-xl  ">
        <h1 className="text-lg font-semibold">Incognito-Art</h1>

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
          <li className="transition cursor-pointer hover:text-purple-400">
            Home
          </li>
          <li className="transition cursor-pointer hover:text-purple-400">
            Generate
          </li>
          <li className="transition cursor-pointer hover:text-purple-400">
            Infinity Archive
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="hero-con relative max-w-5xl mt-40 text-center flex flex-col justify-center items-center gap-12 px-4">
        <div className="holo-bg -z-1 absolute min-w-[60%] min-h-screen"></div>

        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <h1 className="text-3xl md:text-6xl leading-tight">
            Explore<span className="text-[#c757ff]">.</span> Discover
            <span className="text-[#c757ff]">.</span> Create
            <span className="text-[#c757ff]">.</span>
          </h1>
          <p className="text-lg md:text-2xl max-w-[80%] md:max-w-[60%] text-center text-gray-300">
            Utilize generative AI and a distinctive set of tools to bring your
            ideas to life and share them with the world.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 ">
        <button className="btn-gradient w-fit font-semibold px-6 py-2 flex gap-2 items-center rounded-md shadow-md ">
              Generate now
              <ArrowRight size={20}></ArrowRight>
            </button>
          <button className="border border-solid px-6 py-2 rounded-md hover:bg-[#ffffff15] transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Video Section */}
      <div className="video-con max-w-6xl mt-12 relative h-[50vh] md:h-screen flex justify-center items-center bg-[#ffffff0b] overflow-hidden p-4">

        <div className="absolute -z-1 w-full h-full bg-gradient-to-b from-[#e4e4e4b3] to-[#2424244c] border-2 border-[#ffffff55] rounded-xl"></div>

        <div className="vid-con w-full h-full flex justify-center items-center p-1 ">
          <video
            autoPlay
            loop
            muted
            src="../public/bgvid.mp4"
            className=" w-full h-full object-cover rounded-[.5rem] border-2 border-[#ffffff44]"
          />
        </div>
      </div>

      {/* Video Credits */}
      <a
        className="text-[#717171] italic mt-1 z-2"
        href="https://www.instagram.com/abhijeetsinghvirdii/"
        target="_blank"
        rel="noopener noreferrer"
      >
        video credits - @abhijeet
      </a>

      <div className="max-w-6xl flex flex-col justify-center gap-12 mt-12">
        <h1 className="text-4xl text-center md:text-left">Spotlight.</h1>

        <div className="spotlight min-w-full flex flex-col md:flex-row  gap-10 justify-center items-center">
          <div className="spotlight-cards aspect-square w-64 h-64 relative p-3 flex justify-center items-center">
            <div className="w-full h-full absolute -z-1 bg-gradient-to-b from-[#5bb5ffb3] to-[#ffffff4c] rounded-lg"></div>
            <img
              className="w-full h-full object-cover border-[#ffffff63] rounded-[.5rem]"
              src="https://images.unsplash.com/photo-1739775225955-ba1ba496d28d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="spotlight-cards aspect-square w-64 h-64 relative p-3 flex justify-center items-center">
            <div className="w-full h-full absolute -z-1 bg-gradient-to-b from-[#5bb5ffb3] to-[#ffffff4c] rounded-lg"></div>
            <img
              className="w-full h-full object-cover rounded-[.5rem]"
              src="https://images.unsplash.com/photo-1740257862940-66edfed66a6a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="spotlight-cards aspect-square w-64 h-64 relative p-3 flex justify-center items-center">
            <div className="w-full h-full absolute -z-1 bg-gradient-to-b from-[#5bb5ffb3] to-[#ffffff4c] rounded-lg"></div>
            <img
              className="w-full h-full object-cover rounded-[.5rem]"
              src="https://images.unsplash.com/photo-1739741432363-8f5fa6ef4e7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1NHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="spotlight-cards aspect-square w-64 h-64 relative p-3 flex justify-center items-center">
            <div className="w-full h-full absolute -z-1 bg-gradient-to-b from-[#5bb5ffb3] to-[#ffffff5c] rounded-lg"></div>
            <img
              className="w-full h-full object-cover rounded-[.5rem]"
              src="https://images.unsplash.com/photo-1739775225955-ba1ba496d28d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="w-full min-h-[50vh]  flex justify-center items-center relative mt-12">
        <div className="absolute -z-1 w-[90%] h-[50%] section-gradient blur-[200px] "></div>

        <div className="max-w-6xl flex justify-between gap-2">
          <div className="flex flex-col justify-center ">
            <h1 className="text-4xl">Turn Your Imagination into Reality</h1>
            <h1 className="text-4xl text-[#ffffff77]"> & Share Anonymously!</h1>
            <button className="btn-gradient mt-12 w-fit font-semibold px-6 py-2 flex gap-2 items-center rounded-md shadow-md hover:bg-[#000000] transition">
              Generate now
              <ArrowRight size={20}></ArrowRight>
            </button>
          </div>

          <div className=" ">
            <img
              src="https://images.unsplash.com/photo-1740239431349-c5c00588150b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
              alt=""
              className="w-full h-full rounded-xl aspect-video object-cover"
            />
          </div>
        </div>
      </div>

      <footer className="w-full min-h-[25vh]  flex flex-col justify-center  relative mt-12">
        <div className="absolute -z-1 w-[90%] h-[50%] section-gradient blur-[200px] "></div>
        <hr className="border-[#ffffff33] w-full"/>
        <div className="w-full flex justify-between items-center py-8 px-16">

        <h1 className="text-3xl">Incognito Art</h1>
        <a target="_blank" href="https://www.x.com/ayushKodes">Made by Ayush</a>


        </div>
        </footer>

        
    </div>
  );
}

export default Home;
