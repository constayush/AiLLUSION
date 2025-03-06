import React, { useState } from "react";
import { easeInOut, easeOut, motion } from "motion/react";
import WaitingImg from "../../../public/waitingTemp.webp";
import axios from "axios";
import "../../Generate.css";
import SpeechToText from "../ui/STT";
import { Search } from "lucide-react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import TempImg from "../../../public/temp.svg";
import { easeIn } from "motion";
import { Download, RefreshCcw } from "lucide-react";
import { BackgroundGradientAnimation } from "../ui/gradAni";

const StableDiffusionImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(WaitingImg);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");



  // Hugging Face API token and endpoint
  const API_TOKEN = "";
  const API_URL =
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1";

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        API_URL,
        { inputs: enhancePrompt(prompt) },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          responseType: "blob", // To handle image data
        }
      );

      // Convert the image blob to a URL
      const imageUrl = URL.createObjectURL(response.data);
      setImageUrl(imageUrl);
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const enhancePrompt = (userPrompt: string) => {
    return `A highly detailed, ultra-realistic digital painting of ${userPrompt}, cinematic lighting, intricate textures, 4K resolution, masterpiece.`;
  };

  return (
    <motion.div
      
      className="generate-con overflow-x-hidden grid-bg relative w-full flex flex-col justify-center items-center"
    >
      <Navbar />

      
      <div className=" mt-40 flex flex-col items-center justify-center min-h-screen  p-4 relative">
        <h1 className="text-6xl cermo-font font-bold mb-6">
          What do you want to imagine<span className="text-[#c757ff]"> ?</span>
        </h1>
        <motion.span initial={{scale:0}} animate={{scale: 1}} transition={{duration:.7, ease: easeOut}} className="bg-blue-400 blur-[420px] w-[60%] h-[70%] absolute -z-2" />
        <motion.span initial={{scale:0}} animate={{scale: 1}} transition={{duration:.7, ease: easeOut}} className="bg-pink-500 blur-[280px] w-[35%] h-[60%] absolute -z-1" />
       
         
        <motion.div
         initial={{opacity:0}}
         animate={{opacity: 1}}
         transition={{duration:.7, ease: easeOut}}
          className="p-12  min-w-full min-h-screen bg-black border-1 border-[#ffffff44] flex flex-col items-center justify-top pt-12 rounded-2xl shadow-2xl"
        >
          <div className="w-full max-w-md ">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Search className=" size-8" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt (e.g., 'a futuristic cityscape')"
                className="w-full p-2 border border-gray-300 rounded-md "
              />
            </div>

            <div className="btns flex mt-2 items-center gap-4 font-semibold">
              <button
                onClick={generateImage}
                disabled={isLoading}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              >
                {isLoading ? "Generating..." : "Generate Image"}
              </button>

              <SpeechToText onTextGenerated={(text) => setPrompt(text)} />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <div className="flex flex-col gap-8 mt-8">
            <img
              src={imageUrl}
              alt="Generated AI Art"
              className="min-w-full h-auto min-h-[30rem] rounded-lg shadow-lg"
            />

            <button className="btn grid-bg flex justify-center items-center gap-2 font-semibold bg-[#101010]">
              Download <Download />
            </button>
            <button className="btn grid-bg flex justify-center items-center gap-2 font-semibold bg-[#101010]">
              Re-generate
              <RefreshCcw />
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default StableDiffusionImageGenerator;
