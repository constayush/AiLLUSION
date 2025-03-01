import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for menu toggle
import { ArrowRight } from "lucide-react";

import LocomotiveScroll from 'locomotive-scroll';
import gif1 from "../../assets/gif1.gif";
import { motion, useScroll } from "motion/react"
function Home() {

  const { scrollYProgress } = useScroll(); 
  const locomotiveScroll = new LocomotiveScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const spotlightArr = [
    "https://images.unsplash.com/photo-1740021546242-8b718a3e0459?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1739536176048-caa7190dba66?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3OHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1739433438008-df0254a1d143?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNDV8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1739733901481-2c0074e33ede?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMDR8fHxlbnwwfHx8fHw%3D",
  ];
  const infinity_archive_imgs_Arr = [
    { img: "https://images.unsplash.com/photo-1740004731264-3cde5c198cc2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8", height: 10 },
    { img: "https://images.unsplash.com/photo-1740475339769-664748d1193e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D", height: 13 },
    { img: "https://images.unsplash.com/photo-1734968433963-38e57eb6e10e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDd8fHxlbnwwfHx8fHw%3D", height: 16 },
    { img: "https://images.unsplash.com/photo-1738807992185-76ab3a0573c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjN8fHxlbnwwfHx8fHw%3D", height: 14 },
    { img: "https://plus.unsplash.com/premium_photo-1673213853811-e74d420f0b4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNTJ8fHxlbnwwfHx8fHw%3D", height: 20 },
    { img: "https://plus.unsplash.com/premium_photo-1664543649372-6e2ec0e0bfff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODh8fHxlbnwwfHx8fHw%3D", height: 11 },
    { img: "https://images.unsplash.com/photo-1740274478303-74116631f710?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOTN8fHxlbnwwfHx8fHw%3D", height: 16 },
    { img: "https://images.unsplash.com/photo-1739390644387-4d96dc9a957b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMzB8fHxlbnwwfHx8fHw%3D", height: 13 },
    { img: "https://images.unsplash.com/photo-1740165886179-c2be3d6447ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNDV8fHxlbnwwfHx8fHw%3D", height: 14 }
  ];
  
  
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
      <span className="grid-bg z-0 absolute min-w-full min-h-screen"></span>

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
        <div data-scroll data-scroll-speed="1.2"  className="holo-bg -z-2 absolute min-w-[40%] min-h-screen"></div>
        <span data-scroll data-scroll-speed="2"   className="-z-3 absolute blur-[100px] bg-[#292142] w-[40%] h-full"></span>
        <div className="w-full flex relative grid-bg flex-col gap-2 items-center justify-center">
          <div data-scroll data-scroll-speed="2"  className="absolute -z-2 w-[60%] h-full blur-[150px] bg-[#a109ffc6]"></div>
          <h1 className="text-4xl  md:text-8xl leading-tight cermo-font">
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
      <div   className="video-con max-w-6xl mt-12 relative h-[50vh] md:h-screen flex justify-center items-center bg-[#ffffff0b] overflow-hidden p-4">
        <div className="absolute -z-1 w-full h-full bg-gradient-to-b from-[#e4e4e489] to-[#2424244c] border-2 border-[#ffffff55] rounded-xl"></div>

        <motion.div 
  
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="vid-con perspective-distant transform-3d  w-full h-full flex justify-center items-center p-1 ">
          <video
            autoPlay
            loop
            muted
            src="../public/bgvid.mp4"
            className=" w-full h-full object-cover rounded-[.5rem] border-2 border-[#ffffff44]"
          />
        </motion.div>
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

      <div className="max-w-6xl  flex flex-col justify-around gap-12 mt-12 md:p-4 lg:p-0">
        <h1 className="text-8xl tracking-wide cermo-font text-center md:text-left font-bold">
          Spotlight.
        </h1>

        <div className="spotlight grid md:grid-cols-2 lg:grid-cols-4  grid-cols-1 gap-11">
          {spotlightArr.map((e, index) => (
            <div
              key={index}
              className="spotlight-cards aspect-square w-64 h-64 relative p-3 flex justify-center items-center"
            >
              <div className="w-full h-full absolute -z-1 bg-gradient-to-b from-[#c8e6ffb3] to-[#ffffff4c] rounded-lg"></div>
              <img
                className="w-full h-full object-cover border-[#ffffff63] rounded-[.5rem]"
                src={e}
                alt="Spotlight"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full min-h-[50vh]  flex justify-center items-center relative mt-12 ">
        <div data-scroll data-scroll-speed="1.5" className="absolute -z-1 w-[90%] h-[50%] section-gradient blur-[200px] "></div>

        <div className="w-6xl flex justify-between p-4 lg:p-0 gap-5">
          <div className="flex flex-col justify-center  ">
            <h1 className="text-2xl md:text-5xl -font">
              Turn Your Imagination into Reality
            </h1>
            <h1 className="text-2xl md:text-4xl mt-6 text-[#edd7fc77] -font">
              {" "}
              & Share Anonymously!
            </h1>
            <button className="btn-gradient mt-6 w-fit font-semibold  flex gap-2 items-center rounded-md shadow-md hover:bg-[#000000] transition">
              Generate now
              <ArrowRight size={20}></ArrowRight>
            </button>
          </div>

          <div className=" ">
            <img
              src={gif1}
              alt=""
              className="w-full h-full rounded-xl aspect-video object-cover"
            />
          </div>
        </div>
        <hr className="w-full absolute bottom-0 border-[#ffffff1d]" />
      </div>

      <div className="w-6xl mt-12 flex flex-col relative cermo-font">
        <span className="absolute translate-x-[50%]  translate-y-[50%] w-[50%] h-[50%] rounded-full scale-[.7] -z-1 blur-[400px] bg-[#f73715bb]"></span>
      <h1 className="beH1 text-8xl tracking-wide mb-12 text-center  ">
          Be featured in Infinity Archive,
          <span className="text-[#edd7fc98]"> Get Upvoted!</span>
        </h1>

        <div className="masonry lg:p-0 p-4">
          {infinity_archive_imgs_Arr.map((e, index) => (
            <div key={index} className="mb-4 break-inside-avoid">
              <img
                src={e.img}
                alt={`Featured ${index}`}
                className={`w-full object-cover rounded-lg`}
                style={{ height: `${e.height}rem` }}
              />
            </div>
          ))}
        </div>

        <span className="w-[101%] h-[4%] absolute bottom-0 blur-[400px] -z-1 bg-[#00e1ff]"></span>

      </div>
      <footer className="w-full  min-h-[25vh]  flex flex-col justify-center  relative mt-12">
        <div className="absolute -z-1 w-[90%] h-[50%] section-gradient blur-[200px] "></div>
        <hr className="border-[#ffffff33] w-full" />
        <div className="w-full flex justify-between items-center gap-4 grid-bg py-8 px-16">
          <h1 className="text-3xl">Incognito Art</h1>
          <a target="_blank" href="https://www.x.com/ayushKodes">
            Made by Ayush
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
