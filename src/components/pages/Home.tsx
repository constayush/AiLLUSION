import { useEffect, useState } from "react";
import { Menu, Scale, X } from "lucide-react"; // Icons for menu toggle
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion, useScroll } from "motion/react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import { easeIn } from "motion";
import { Search } from "lucide-react";
import SpeachToText from "../ui/STT";
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
    <div className="home-con  grid-bg min-h-screen w-full mt-40 flex flex-col items-center">
      <div className="home relative max-w-6xl min-h-screen p-2 gap-4 flex flex-col items-center">
        <span className="absolute bg-gradients -z-1 bg-[#ffffff] w-[30%] h-[50%]  blur-[200px] "></span>
        <span className="absolute bg-gradients -z-2 bg-[#008cff] w-[30%] h-[50%]  blur-[200px] "></span>

        <div className="hero-texts relative flex flex-col justify-center items-center gap-4 text-center">
          <motion.span
            animate={{ x: cursorPosition.x - 600, y: cursorPosition.y - 200 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            className="follow-cursor absolute -z-1 bg-[#9a02ff] right-0 w-[70%] h-[70%]  blur-[200px] "
          ></motion.span>
          <motion.span
            animate={{ x: cursorPosition.x - 600, y: cursorPosition.y - 200 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            className="follow-cursor absolute -z-1 bg-[#ff0202] left-0 w-[70%] h-[70%]  blur-[200px] "
          ></motion.span>
          <h1 className="hero-heading text-4xl md:text-7xl ">
            Discover. Create. Explore.
          </h1>
          <p className="hero-paragraph text-lg md:w-[60%]">
            Turn your ideas into stunning visuals! Get high-quality images from
            Pixabay or create unique AI-generated artwork in seconds!
          </p>
        </div>

        

        <div className="cta-con flex gap-2 md:gap-4 max-w-full">
          <Link to="/generate">
            {" "}
            <button className="btn-gradient w-fit font-semibold px-1 md:px-6 py-5 flex gap-2 items-center rounded-md shadow-md ">
              Generate now
              <ArrowRight size={20}></ArrowRight>
            </button>
          </Link>
          <button className="border border-solid px-1 md:px-6 py-5 rounded-md ">
            Learn More
          </button>
        </div>

        <div className="masonry mt-6 ">
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
      </div>
    </div>
  );
}

export default Home;
