import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MathUtils = {
  distance: (x1: number, y1: number, x2: number, y2: number) =>
    Math.hypot(x2 - x1, y2 - y1),
};

const ImageTrail = () => {
  const images = [
    "https://cdn.pixabay.com/photo/2022/07/04/10/46/vintage-car-7300881_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/08/26/23/38/maranhao-sheets-9000410_1280.jpg",
    "https://cdn.pixabay.com/photo/2025/02/08/16/27/lunarnewyearcontest-9392710_1280.png",
    "https://cdn.pixabay.com/photo/2025/02/11/20/43/cormorant-9399801_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/12/13/21/16/bird-9266166_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/05/04/11/21/automobile-5128760_1280.jpg",
    "https://cdn.pixabay.com/photo/2025/02/07/08/46/cat-9389500_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/07/01/10/50/flycatcher-8864922_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/05/26/15/27/kid-8788962_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/06/14/22/46/milky-way-6337038_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/01/18/20/08/heart-3940561_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/12/14/15/37/aurora-borealis-9267515_1280.jpg",
  ];
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [imageQueue, setImageQueue] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    // Ensure the listener is attached to the element of type `Element`
    const element = document.querySelector(".playAni");
    if (element) {
      element.addEventListener("mousemove", handleMouseMove as EventListener);
    }

    // Cleanup function for event listener
    return () => {
      if (element) {
        element.removeEventListener(
          "mousemove",
          handleMouseMove as EventListener
        );
      }
    };
  }, []);

  useEffect(() => {
    if (!images.length) return;

    const distance = MathUtils.distance(
      mousePos.x,
      mousePos.y,
      lastMousePos.x,
      lastMousePos.y
    );

    if (distance > 150) {
      let rn = Math.floor(Math.random() * images.length);
  
      setImageQueue((prev: any): any => {

        if(prev[0]?.src === images[rn]){
          return [
            {
              id: Date.now(),
              src: images[rn+1],
              x: mousePos.x,
              y: mousePos.y,
            },
            ...prev,
          ].slice(0, 12)
        }
        else{ return [
          {
            id: Date.now(),
            src: images[rn],
            x: mousePos.x,
            y: mousePos.y,
          },
          ...prev,
        ].slice(0, 12)}
       
      }
      );
      setLastMousePos(mousePos);
    }
  }, [mousePos, lastMousePos, images]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      {imageQueue.map((img: any) => (
        <motion.img
          key={img.id}
          src={img.src}
          initial={{ opacity: 0, scale: 1, x: img.x - 40, y: img.y - 40 }}
          animate={{
            opacity: [0, 1, 0],
            x: [img.x - 40, img.x, img.x],
            y: [img.y - 40, img.y, img.y + 150],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute w-[12rem] h-[14rem] object-cover rounded-2xl shadow-lg"
        />
      ))}
    </div>
  );
};

export default ImageTrail;
