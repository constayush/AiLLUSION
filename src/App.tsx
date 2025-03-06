
import Gallery from "./components/pages/Gallery";
import Home from "./components/pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import StableDiffusionImageGenerator from "./components/pages/StableDiffusionImageGenerator";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import InfinityArchive from "./components/pages/InfinityArchive";
function App() {
  
    useEffect(() => {
      const lenis = new Lenis({
        duration: 1.2, // Adjust speed
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
        
      });
  
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
  
      return () => lenis.destroy(); // Cleanup on unmount
    }, []);
  return (
    <BrowserRouter>
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/generate" element={<StableDiffusionImageGenerator />} />
      <Route path="/infinity-archive" element={<InfinityArchive />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
