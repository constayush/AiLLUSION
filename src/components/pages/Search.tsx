import React, { useState } from "react";
import { motion } from "framer-motion";
import WaitingImg from "/waiting.gif";
import axios from "axios";
import SpeechToText from "../ui/STT";
import { Search, Download, RefreshCcw } from "lucide-react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

const SearchPage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // Track the current page for pagination

  // Pixabay API endpoint
  const API_URL = "https://pixabay.com/api/";
  const PIXABAY_API_KEY = `${import.meta.env.VITE_PIXABAY_KEY}`;

  const generateImage = async (newSearch = true) => {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get(API_URL, {
        params: {
          key: PIXABAY_API_KEY,
          q: prompt, // URL-encode the search query
          per_page: 16, // Fetch 16 images
          image_type: "photo", // Only fetch photos
          safesearch: true, // Enable SafeSearch
          page: newSearch ? 1 : page + 1, // Use page 1 for new searches, increment for "Generate More"
        },
      });

      if (response.data.hits.length === 0) {
        setError("No images found for the given prompt.");
        return;
      }

      // Update the image URLs
      if (newSearch) {
        setImageUrls(response.data.hits.map((hit: any) => hit.largeImageURL));
        setPage(1); // Reset to page 1 for new searches
      } else {
        setImageUrls((prevUrls): any => [
          ...prevUrls,
          ...response.data.hits.map((hit:any) => hit.largeImageURL),
        ]);
        setPage((prevPage) => prevPage + 1); // Increment the page for "Generate More"
      }
    } catch (err: any) {
      console.error(
        "Error fetching images:",
        err.response
          ? {
              status: err.response.status,
              data: err.response.data,
              headers: err.response.headers,
            }
          : err
      );
      setError(
        err.response?.data?.errors?.join(", ") ||
          "Failed to fetch images. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (url: any) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated-image_INCOGNITO-ART.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="min-w-4xl">
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {[...Array(16)].map((_, index) => (
          <div
            key={index}
            className="skeleton rounded animate-pulse bg-white min-w-30 h-48"
          >
            hey
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    
    className="generate-con grid-bg w-full mt-40 flex flex-col items-center">
      <div className="generate max-w-6xl  p-4 gap-4 flex flex-col items-center">
        <h1 className="hero-heading text-4xl md:text-6xl text-center">
          Search for What do you want<span className="text-[#d788ff]">.</span>
        </h1>
        <p className="text-center md:text-lg md:w-[60%] mb-6">
          Find the perfect image instantly with Pixabay! Search millions of
          high-quality, royalty-free photos at your fingertips.
        </p>
       
        <motion.div 
             initial={{ y: 100 }}  
             animate={{ y: 0 }}
             transition={{ duration: 0.3 , ease: "easeIn"}}
        className="w-full border-2 border-[#ffffff44] rounded-xl p-4 flex flex-col items-center justify-center bg-black">
          
        <div className="w-full">
            <motion.div
         
            className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
             
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt (e.g., 'a futuristic cityscape')"
                className="w-full p-4 border-2 border-[#ffffff7e] rounded-4xl"
              />

              <div className="btns flex  items-center gap-4 font-semibold">
                <button
                  onClick={()=>generateImage(true)}
                  disabled={isLoading}
                  className="w-full bg-[#0f0f0f] text-white p-2 rounded-full "
                >
                  {isLoading ? "Generating..." :  <Search />}
                </button>
                <SpeechToText onTextGenerated={setPrompt} />
              </div>
            </motion.div>{error && <p className="text-red-500 mt-2 animate-pulse">{error}</p>}
          </div>
          {isLoading ? (
            <SkeletonLoader />
          ) : (

            imageUrls.length <= 0 ?
            
            (<div className="w-full relative flex  items-center justify-center">
 <h1 className="absolute z-10  text-[#ffffff92] animate-pulse">( waiting for a prompt )</h1>
 <img className="object-cover w-full max-h-[10rem] rounded-xl brightness-10" src={WaitingImg} />

            </div>):( <div className="max-w-6xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                {
                  imageUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative group border rounded-lg border-[#ffffff3c]"
                    >
                      <img
                        src={url}
                        alt={`Generated AI Art ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg shadow-lg"
                      />
                      <button
                        onClick={() => handleDownload(url)}
                        className="absolute bottom-2 right-2 bg-black/50 text-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Download className="size-4" />
                      </button>
                    </div>
                  ))
                } 
              </div>
              {imageUrls.length > 0 && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => generateImage(false)} // Fetch more images
                    disabled={isLoading}
                    className="btn grid-bg flex justify-center items-center gap-2 font-semibold bg-[#101010] p-2 rounded-md"
                  >
                    Generate More <RefreshCcw className="size-4" />
                  </button>
                </div>
              )}
            </div>)
          
          )}
        </motion.div>
      </div>
      <Footer />
    </motion.div>
    
  );
};

export default SearchPage;
