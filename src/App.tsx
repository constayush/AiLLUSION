
import "./App.css";

function App() {
  return (
    <div className="hero w-full min-h-[100vh] flex flex-col justify-center items-center relative">
      <nav className=" min-w-6xl fixed top-0 mt-16 flex justify-between">
        <h1 className="text-lg">AiLLUSION</h1>
        <ul className="flex gap-4">
          <li className=" transition tracking-wider cursor-pointer hover:text-purple-400">Home</li>
          <li className=" transition tracking-wider cursor-pointer hover:text-purple-400">Generate</li>
          <li className=" transition tracking-wider cursor-pointer hover:text-purple-400">Gallery</li>
        </ul>
      </nav>

      <div className="hero-con max-w-5xl mt-40  flex flex-col justify-center items-center gap-4 ">
        <h1 className="text-6xl">
          Explore<span className="text-[#c757ff]">.</span> Discover
          <span className="text-[#c757ff]">.</span> Create
          <span className="text-[#c757ff]">.</span>
        </h1>
        <p className="text-2xl w-[60%] text-center">
          Utilize generative AI and a distinctive set of tools to bring your
          ideas to life and share them with the world.
        </p>

        <div className="flex gap-4 mt-8">
          <button className=" bg-[#ffffff3a] font-semibold  shadow-blur shadow-[#00000084]">
            {" "}
            Generate now
          </button>
          <button className="border border-solid">Learn More</button>
        </div>
      </div>

      <div className="video-con min-w-6xl mt-20 rounded-xl  relative h-screen flex justify-center items-center aspect-square bg-[#ffffff0b]">
        <video
          autoPlay
          loop
          muted
          src="../public/bgvid.mp4"
          className="bg-vid absolute z-[-1] w-full h-full rounded-xl"
        ></video>
      </div>

      <a
        className="text-[#717171] italic "
        href="https://www.instagram.com/abhijeetsinghvirdii/"
        target="_blank"
      >
        {" "}
        video credits - @abhijeet
      </a>
    </div>
  );
}

export default App;
