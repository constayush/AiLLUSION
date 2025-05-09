import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion, useScroll } from "motion/react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import { easeIn } from "motion";
import { Search } from "lucide-react";
import SpeachToText from "../ui/STT";
import DemoVid from "/waiting.gif";
import ImageTrail from "../ui/HoverGrid";
import ImgT from "../ui/HoverGrid";
import { InfinityIcon, MoveRightIcon } from "lucide-react";
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
      exit={{ opacity: 0 }}
      className="home-con p-4 md:p-0  min-h-screen w-full mt-40 flex flex-col items-center"
    >
      <span className="w-full h-full absolute grid-bg -z-1"></span>
      <div className="home relative max-w-6xl min-h-screen p-2 gap-4 flex flex-col items-center">
        <span className="absolute bg-gradients -z-1 bg-[#ffffff] w-[30%] h-[28%]  blur-[200px] "></span>
        <span className="absolute bg-gradients -z-2 bg-[#008cff] w-[30%] h-[28%]  blur-[200px] "></span>

        <div className="hero-texts relative flex flex-col justify-center items-center gap-4 text-center">
          <motion.span
            animate={{ x: cursorPosition.x - 600, y: cursorPosition.y - 200 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
            className="follow-cursor absolute -z-1 bg-[#9a02ff] right-0 w-[70%] h-[70%]  blur-[200px] "
          ></motion.span>
          <motion.span
            animate={{ x: cursorPosition.x - 600, y: cursorPosition.y - 200 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
            className="follow-cursor absolute -z-1 bg-[#ff0202] left-0 w-[70%] h-[70%]  blur-[200px] "
          ></motion.span>
          <h1 className="hero-heading text-4xl md:text-7xl ">
            Discover. Create. Explore.
          </h1>
          <p className="hero-paragraph text-lg md:w-[60%]">
            Turn your ideas into stunning visuals! Get high-quality images from
            Pexels or create unique AI-generated artwork in seconds!
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
          <Link to='/search'>
          <button className="border border-solid px-1 md:px-6 py-5 rounded-md ">
            Search now
          </button></Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 200 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          animate={{ opacity: 1, y: 0 }}
          className="masonry mt-6 relative "
        >
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
        </motion.div>

        <div className="generate-promo mt-16 flex flex-col gap-4 w-full relative  justify-center items-center">
          <h1 className="text-5xl text-center">✨laverage power of AI </h1>
          <p className=" text-lg text-[#ffffffdc] text-center">
            Create stunning visuals with the power of AI.
          </p>

          <div className="flex   flex-col md:flex-row w-full mt-6 gap-12">
            {/* <img
              className=" aspect-square  opacity-15 w-full border rounded-2xl"
              src={DemoVid}
            ></img> */}

            <div className=" bg-stone-400/10 w-full  p-12  flex flex-col gap-4 rounded-2xl text-lg">
              <p>
                Powered by{" "}
                <a target="_blank" href="https://stability.ai/">
                  stability.ai
                </a>
              </p>

              <ul className="flex flex-col gap-4  text-[#ffffffdc]">
              <li>✓ <strong>Easy & Fast</strong> – Just type your idea and generate images in seconds.</li>
  <li>✓ <strong>Unique Creations</strong> – Every image is AI-generated, making it one of a kind.</li>
  <li>✓ <strong>High-Quality Output</strong> – Get crisp, detailed visuals for any use.</li>
  <li>✓ <strong>Edit generated images on the go.</strong> – Adjust brightness, contrast, and more.</li>
  <li>✓ <strong>Make generated images yours</strong> – Download, use it on your desired place.</li>
  <li>💡 <strong>Try it now!</strong> Enter your prompt and watch creativity unfold.</li>

                <Link
                  className="w-full flex justify-center items-center"
                  to="/generate"
                >
                  <button className="btn-gradient w-full text-center font-semibold px-1 md:px-3 py-2 flex gap-2  justify-center items-center rounded-md shadow-md ">
                    Generate now
                    <ArrowRight size={20}></ArrowRight>
                  </button>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div className="generate-promo mt-16 flex flex-col gap-4 w-full relative  justify-center items-center">
          <h1 className="text-5xl text-center">🚀Fuel Your Vision with Real-World Search.</h1>
          <p className=" text-lg text-[#ffffffdc] text-center">
            Search stunning visuals with the power of PEXELS.
          </p>

          <div className="flex   flex-col md:flex-row w-full mt-6 gap-12">
         

            <div className=" bg-stone-400/10 w-full  p-12  flex flex-col gap-4 rounded-2xl text-lg">
              <p>
                Powered by{" "}
                <a target="_blank" href="https://www.pexels.com/">
                Pexels API
                </a>
              </p>

              <ul className="flex flex-col gap-4  text-[#ffffffdc]">
              <li>✓ <strong>Instant Access</strong> – Search millions of real-world images in a flash.</li>
  <li>✓ <strong>Authentic Visuals</strong> – Real photos by real photographers, ready to inspire.</li>
  <li>✓ <strong>High-Quality Results</strong> – Get sharp, stunning imagery for any project.</li>
  <li>✓ <strong>No Prompt Stress</strong> – No need to describe the perfect image—just find it.</li>
  <li>✓ <strong>Free to Use</strong> – Download and use without worrying about licenses.</li>
  <li>🚀 <strong>Explore Now!</strong> Search your idea and let the real world do the magic.</li>
                <Link
                  className="w-full flex justify-center items-center"
                  to="/search"
                >
                  <button className="btn-gradient w-full text-center font-semibold px-1 md:px-3 py-2 flex gap-2  justify-center items-center rounded-md shadow-md ">
                    Search now
                    <ArrowRight size={20}></ArrowRight>
                  </button>
                </Link>
              </ul>
            </div>
          </div>
        </div>


        <div className="search-promo  mt-16 flex flex-col justify-center items-center gap-4 w-full bg-black border-6 border-[#ffffff2c] rounded-xl p-6">
        <span className="absolute bg-gradients -z-1 bg-[#ff0a505a] w-[90%] h-[8%]  blur-[200px] "></span>
      <span className="absolute bg-gradients -z-1 bg-[#ba32fe] w-[60%] h-[12%]  blur-[200px] "></span>
      <span className="absolute bg-gradients -z-1 bg-[#6ef5ff2f] w-[90%] h-[22%]  blur-[900px] "></span>
          <h1 className="text-5xl text-center">
            Unlock a World of Free Images
          </h1>
          <p className="text-center text-[#ffffffdc] text-lg">
            Millions of Free Images, One Search Away
          </p>

          <div className="w-full">
            <motion.div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Enter a prompt (e.g., 'a futuristic cityscape')"
                className="w-full p-4 border-2 border-[#ffffff7e] rounded-4xl"
              />

              <div className="btns flex  items-center gap-4 font-semibold">
                <button className="w-full bg-[#0f0f0f] text-white p-2 rounded-full h-full ">
                  <MoveRightIcon />
                </button>
              </div>
            </motion.div>
            {/* {error && <p className="text-red-500 mt-2 animate-pulse">{error}</p>} */}
          </div>

          <div
            className="w-full playAni relative h-fit 
          gap-12 flex justify-center items-center grid-bg"
          >
            <ImgT />
            <InfinityIcon
              color="#ffffff20"
              className=" animate-pulse  w-full h-[30rem] "
            />
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}

export default Home;
