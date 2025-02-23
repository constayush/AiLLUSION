import React, { useState } from "react";
import SearchBar from "./ui/SearchBar";

interface UnsplashImage {
  id: string;
  urls: { small: string };
  alt_description: string;
}

const API_KEY = "YOUR_UNSPLASH_API_KEY";
const AI_API_URL = "YOUR_AI_IMAGE_API";

const ImageGallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [aiImages, setAiImages] = useState<string[]>([]);

  // Fetch images from Unsplash API
  const fetchUnsplashImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${API_KEY}`
      );
      const data = await response.json();
      setImages(data.results);
    } catch (error) {
      console.error("Error fetching Unsplash images:", error);
    }
  };

  const generateAiImage = async () => {
    try {
      const response = await fetch(AI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: searchTerm }),
      });
      const data = await response.json();
      setAiImages([...aiImages, data.image_url]);
    } catch (error) {
      console.error("Error generating AI image:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="main-options flex flex-col gap-4 w-full">
        <SearchBar
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />

        <div className=" w-full flex gap-4 justify-between">


        <button onClick={generateAiImage} className="text-white bg-black px-4 py-2 ">
            Generate AI Image
          </button>


          <button
            onClick={fetchUnsplashImages}
            className="text-white px-4 py-2 bg-black"
          >
            Search Unsplash
          </button>

         

        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {/* Unsplash Images */}
        {images.map((img) => (
          <div
            key={img.id}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <img
              src={img.urls.small}
              alt={img.alt_description}
              className="rounded-lg w-full"
            />
          </div>
        ))}
        {/* AI Generated Images */}
        {aiImages.map((img, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md bg-white">
            <img src={img} alt="AI Generated" className="rounded-lg w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
