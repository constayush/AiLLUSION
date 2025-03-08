import React, { useState } from "react";
import { motion } from "framer-motion";
import WaitingImg from "/waitingTemp.webp";
import axios from "axios";
import SpeechToText from "../ui/STT";
import { Search, Download, RefreshCcw, Send } from "lucide-react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

const Generate = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(WaitingImg);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Hugging Face API endpoint for Stable Diffusion
  const API_URL =
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5";

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
        {
          inputs: prompt.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HUGGING_FACE_TOKEN}`, 
          },
          responseType: "blob", // Response is a binary image
        }
      );

      // Convert the binary image data to a URL
      const imageBlob = new Blob([response.data], { type: "image/png" });
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
    } catch (err:any) {
      console.error(
        "Error generating image:",
        err.response ? err.response.data : err
      );
      setError(
        err.response?.data?.error ||
          "Failed to generate image. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl || imageUrl === WaitingImg) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "generated-image.png"; // Default to PNG format
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    
    className="generate-con grid-bg w-full mt-40 flex flex-col items-center">
      <div className="generate max-w-6xl min-h-screen p-4 gap-4 flex flex-col items-center">
        <h1 className="hero-heading text-4xl md:text-6xl text-center">
          What do you want to imagine<span className="text-[#d788ff]"> ?</span>
        </h1>
        <p className="text-center md:text-lg  md:w-[60%] mb-6" >Turn your words into stunning AI-generated images in seconds! Just type, create, and watch your imagination come to life</p>

        <motion.div 
          initial={{ y: 100 }}  
          animate={{ y: 0 }}
          transition={{ duration: 0.3 , ease: "easeIn"}}
        className="w-full border-2 border-[#ffffff44] rounded-xl p-4 flex flex-col items-center justify-center bg-black">
          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
             
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt (e.g., 'a futuristic cityscape')"
                className="w-full p-4 border-2 border-[#ffffff7e] rounded-4xl"
              />

              <div className="btns flex  items-center gap-4 font-semibold">
                <button
                  onClick={generateImage}
                  disabled={isLoading}
                  className="w-full bg-[#0f0f0f] text-white p-2 rounded-full "
                >
                  {isLoading ? "Generating..." :  <Search />}
                </button>
                <SpeechToText onTextGenerated={setPrompt} />
              </div>
            </div>{error && <p className="text-red-500 text-center mt-2 animate-pulse">{error}</p>}
          </div>

          <div className="relative flex items-bottom justify-center"><img className="aspect-square rounded-xl" src={imageUrl} alt="" />
         
          </div>

{imageUrl !== WaitingImg ?  <div className="flex gap-4 mt-4"><button
              onClick={handleDownload}
              className="btn grid-bg flex justify-center items-center p-2 gap-2 font-semibold bg-[#101010]"
            >
              Download <Download />
            </button>
            <button
              onClick={generateImage}
              className="btn grid-bg flex justify-center items-center p-2 gap-2 font-semibold bg-[#101010]"
            >
              Re-generate <RefreshCcw />
            </button></div>:""}

        </motion.div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Generate;
