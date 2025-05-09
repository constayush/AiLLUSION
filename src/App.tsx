import { BrowserRouter, Routes, Route } from "react-router";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "./components/ui/Navbar";
import Home from "./components/pages/Home";
import Generate from "./components/pages/Generate";
import InfinityArchive from "./components/pages/InfinityArchive";
import SearchPage from "./components/pages/Search";

function App() {



  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/infinity-archive" element={<InfinityArchive />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
