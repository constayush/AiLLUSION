import { useEffect, useState } from "react";
import { Menu, Scale, X } from "lucide-react"; // Icons for menu toggle
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import gif1 from "../../assets/gif1.gif";
import { motion, useScroll } from "motion/react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import { easeIn } from "motion";
function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 500, y: 300 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const spotlightArr = [
    "https://images.unsplash.com/photo-1740021546242-8b718a3e0459?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1739536176048-caa7190dba66?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3OHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1739433438008-df0254a1d143?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNDV8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1739733901481-2c0074e33ede?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMDR8fHxlbnwwfHx8fHw%3D",
  ];
  const infinity_archive_imgs_Arr = [
    {
      img: "https://images.unsplash.com/photo-1740004731264-3cde5c198cc2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
      height: 10,
    },
    {
      img: "https://images.unsplash.com/photo-1740475339769-664748d1193e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",
      height: 13,
    },
    {
      img: "https://images.unsplash.com/photo-1734968433963-38e57eb6e10e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDd8fHxlbnwwfHx8fHw%3D",
      height: 16,
    },
    {
      img: "https://images.unsplash.com/photo-1738807992185-76ab3a0573c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjN8fHxlbnwwfHx8fHw%3D",
      height: 14,
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1673213853811-e74d420f0b4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNTJ8fHxlbnwwfHx8fHw%3D",
      height: 20,
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1664543649372-6e2ec0e0bfff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODh8fHxlbnwwfHx8fHw%3D",
      height: 11,
    },
    {
      img: "https://images.unsplash.com/photo-1740274478303-74116631f710?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOTN8fHxlbnwwfHx8fHw%3D",
      height: 16,
    },
    {
      img: "https://images.unsplash.com/photo-1739390644387-4d96dc9a957b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMzB8fHxlbnwwfHx8fHw%3D",
      height: 13,
    },
    {
      img: "https://images.unsplash.com/photo-1740165886179-c2be3d6447ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNDV8fHxlbnwwfHx8fHw%3D",
      height: 14,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: easeIn }}
      className="hero overflow-x-hidden w-full min-h-screen flex flex-col justify-center items-center relative"
    >
      <motion.span
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.85, ease: easeIn }}
        className="grid-bg z-0 absolute min-w-full min-h-screen"
      ></motion.span>

      {/* Navbar //width problem responsive*/}

      <Navbar />
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }} // Start off-screen
        animate={{ opacity: 1, x: 0 }} // Animate to normal
        exit={{ opacity: 0, x: 50 }} // Animate out
        transition={{ duration: 0.65 }} // Speed
        className="hero-con  relative max-w-5xl mt-40 text-center flex flex-col justify-center items-center gap-12 px-4"
      >
        <motion.div className="holo-bg -z-2 absolute min-w-[40%] min-h-screen"></motion.div>
        <span className="-z-3 absolute blur-[100px] bg-[#292142] w-[40%] h-full"></span>
        <div className="w-full flex relative grid-bg flex-col gap-2 items-center justify-center">
          <motion.div
            id="cursor"
            className="absolute -z-2 w-[70%] h-full blur-[250px] transition-all duration-0  bg-[#9f03ff] pointer-events-none noselect"
           transition={{ stiffness: 100 }}
            animate={{ x: cursorPosition.x - 700, y: cursorPosition.y - 200 }}
          />
          <motion.div
            id="cursor"
            className="absolute -z-2 w-[70%] h-full blur-[250px] transition-all duration-0 bg-[#ff09094e] pointer-events-none noselect"
            initial={{ x: cursorPosition.x - 700, y: cursorPosition.y - 200 }}
            animate={{ x: cursorPosition.x - 900, y: cursorPosition.y - 400 }}
          />
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
          <Link to="/generate">
            {" "}
            <button className="btn-gradient w-fit font-semibold px-6 py-2 flex gap-2 items-center rounded-md shadow-md ">
              Generate now
              <ArrowRight size={20}></ArrowRight>
            </button>
          </Link>
          <button className="border border-solid px-6 py-2 rounded-md hover:bg-[#ffffff15] transition">
            Learn More
          </button>
        </div>
      </motion.div>

      {/* Video Section */}
      <motion.div 
       initial={{ opacity: 0, x: 50 }} // Start off-screen
       animate={{ opacity: 1, x: 0 }} // Animate to normal
       exit={{ opacity: 0, x: 50 }} // Animate out
       transition={{ duration: 0.65 }} // Speed
      className="video-con max-w-6xl mt-12 relative h-[50vh] md:h-screen flex justify-center items-center bg-[#ffffff0b] overflow-hidden p-4">
        <div 
        
        className="absolute -z-1 w-full h-full bg-gradient-to-b from-[#e4e4e489] to-[#2424244c] border-2 border-[#ffffff55] rounded-xl"></div>

        <div
         
          className="vid-con perspective-distant transform-[3d]  w-full h-full flex justify-center items-center p-1 "
        >
          <video
            autoPlay
            loop
            muted
            src="../public/bgvid.mp4"
            className=" w-full h-full object-cover rounded-[.5rem] border-2 border-[#ffffff44]"
          />
        </div>
      </motion.div>

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

        <div className="spotlight grid md:grid-cols-2 lg:grid-cols-2 mx-2 lg:mx-0 grid-cols-1 gap-11">
          {spotlightArr.map((e, index) => (
            <div
              key={index}
              className="spotlight-cards aspect-square w-[100%] h-[100%] relative p-3 flex justify-center items-center"
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

      <div className="w-full min-h-[50vh]  flex justify-center items-center relative mt-12 mx-2 ">
        <div
          data-scroll
          data-scroll-speed="1.2"
          className="absolute -z-1 w-[90%] h-[50%] bg-[#a109ff9c] blur-[400px] "
        ></div>

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
      <Footer />
    </motion.div>
  );
}

export default Home;
