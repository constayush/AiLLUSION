"use client"

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Crop, RotateCw, Sun, Contrast, Download, Check, X, Undo, Maximize2, Layers, Droplets, EyeOff, Loader2 } from 'lucide-react';

interface ImageEditorProps {
  imageUrl: string;
  onClose: () => void;
  onSave: (editedImageUrl: string) => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ imageUrl, onClose, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [grayscaleAmount, setGrayscaleAmount] = useState<number>(0);
  const [blurAmount, setBlurAmount] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(100);
  const [cropMode, setCropMode] = useState<boolean>(false);
  const [cropStart, setCropStart] = useState<{ x: number; y: number } | null>(null);
  const [cropEnd, setCropEnd] = useState<{ x: number; y: number } | null>(null);
  const [cropDimensions, setCropDimensions] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [editHistory, setEditHistory] = useState<Array<{
    brightness: number;
    contrast: number;
    rotation: number;
    grayscaleAmount: number;
    blurAmount: number;
    opacity: number;
    cropDimensions: {
      x: number;
      y: number;
      width: number;
      height: number;
    } | null;
  }>>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canvasScale, setCanvasScale] = useState<{ x: number; y: number }>({ x: 1, y: 1 });

  // Load the image when the component mounts
  useEffect(() => {
    setIsLoading(false);
    const img = new Image();
    img.crossOrigin = "anonymous"; // To avoid CORS issues
    img.src = imageUrl;
    img.onload = () => {
      setOriginalImage(img);
      
      // Initialize canvas with the image
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, img.width, img.height);
          
          // Add initial state to history
          addToHistory({
            brightness: 100,
            contrast: 100,
            rotation: 0,
            grayscaleAmount: 0,
            blurAmount: 0,
            opacity: 100,
            cropDimensions: null
          });
          
          // Calculate canvas scale for proper crop selection
          updateCanvasScale();
          
          // Set loading to false after a short delay to ensure UI is ready
          setTimeout(() => setIsLoading(false), 500);
        }
      }
    };
    
    // Handle loading errors
    img.onerror = () => {
      console.error("Error loading image");
      setIsLoading(false);
    };
    
    // Set a timeout to ensure loading state is cleared even if image fails
    const timeout = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, [imageUrl]);
  
  // Update canvas scale when window resizes
  useEffect(() => {
    window.addEventListener('resize', updateCanvasScale);
    return () => window.removeEventListener('resize', updateCanvasScale);
  }, []);

  // Apply all edits whenever any parameter changes
  useEffect(() => {
    applyEdits();
  }, [brightness, contrast, rotation, grayscaleAmount, blurAmount, opacity, cropDimensions]);
  
  const updateCanvasScale = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    setCanvasScale({
      x: canvas.width / rect.width,
      y: canvas.height / rect.height
    });
  };

  const addToHistory = (state: {
    brightness: number;
    contrast: number;
    rotation: number;
    grayscaleAmount: number;
    blurAmount: number;
    opacity: number;
    cropDimensions: {
      x: number;
      y: number;
      width: number;
      height: number;
    } | null;
  }) => {
    // If we're not at the end of the history, remove everything after current index
    if (historyIndex < editHistory.length - 1) {
      setEditHistory(editHistory.slice(0, historyIndex + 1));
    }
    
    // Add new state to history
    setEditHistory(prev => [...prev, state]);
    setHistoryIndex(prev => prev + 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevState = editHistory[historyIndex - 1];
      setBrightness(prevState.brightness);
      setContrast(prevState.contrast);
      setRotation(prevState.rotation);
      setGrayscaleAmount(prevState.grayscaleAmount);
      setBlurAmount(prevState.blurAmount);
      setOpacity(prevState.opacity);
      setCropDimensions(prevState.cropDimensions);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const applyEdits = () => {
    if (!originalImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create a temporary canvas for manipulations
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // Set dimensions based on rotation
    let useWidth = originalImage.width;
    let useHeight = originalImage.height;

    // Adjust canvas size for rotation if needed
    if (rotation % 180 !== 0) {
      canvas.width = originalImage.height;
      canvas.height = originalImage.width;
      useWidth = originalImage.height;
      useHeight = originalImage.width;
    } else {
      canvas.width = originalImage.width;
      canvas.height = originalImage.height;
    }

    tempCanvas.width = useWidth;
    tempCanvas.height = useHeight;

    // Apply rotation
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(
      originalImage,
      -originalImage.width / 2,
      -originalImage.height / 2,
      originalImage.width,
      originalImage.height
    );
    ctx.restore();

    // Get image data for further processing
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Apply brightness, contrast, grayscale, and opacity
    const factor = 259 * (contrast + 255) / (255 * (259 - contrast));
    
    for (let i = 0; i < data.length; i += 4) {
      // Brightness
      data[i] = Math.min(255, data[i] * brightness / 100);
      data[i + 1] = Math.min(255, data[i + 1] * brightness / 100);
      data[i + 2] = Math.min(255, data[i + 2] * brightness / 100);

      // Contrast
      data[i] = factor * (data[i] - 128) + 128;
      data[i + 1] = factor * (data[i + 1] - 128) + 128;
      data[i + 2] = factor * (data[i + 2] - 128) + 128;

      // Grayscale (with amount control)
      if (grayscaleAmount > 0) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const percent = grayscaleAmount / 100;
        data[i] = data[i] * (1 - percent) + avg * percent;
        data[i + 1] = data[i + 1] * (1 - percent) + avg * percent;
        data[i + 2] = data[i + 2] * (1 - percent) + avg * percent;
      }
      
      // Opacity
      data[i + 3] = data[i + 3] * opacity / 100;
    }

    // Put the modified image data back
    ctx.putImageData(imageData, 0, 0);
    
    // Apply blur if needed
    if (blurAmount > 0) {
      // We'll use a simple box blur
      const blurRadius = Math.floor(blurAmount / 10);
      if (blurRadius > 0) {
        ctx.filter = `blur(${blurRadius}px)`;
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = 'none';
      }
    }

    // Apply crop if dimensions exist
    if (cropDimensions) {
      const { x, y, width, height } = cropDimensions;
      
      // Create another temp canvas for the cropped image
      const cropCanvas = document.createElement("canvas");
      cropCanvas.width = width;
      cropCanvas.height = height;
      const cropCtx = cropCanvas.getContext("2d");
      
      if (cropCtx) {
        // Draw only the cropped portion
        cropCtx.drawImage(
          canvas,
          x, y, width, height,
          0, 0, width, height
        );
        
        // Clear the main canvas and resize it
        canvas.width = width;
        canvas.height = height;
        
        // Draw the cropped image back to the main canvas
        ctx.drawImage(cropCanvas, 0, 0);
      }
    }
    
    // Update canvas scale after edits
    updateCanvasScale();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!cropMode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const x = (e.clientX - rect.left) * canvasScale.x;
    const y = (e.clientY - rect.top) * canvasScale.y;
    
    setCropStart({ x, y });
    setCropEnd({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!cropMode || !cropStart || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const x = (e.clientX - rect.left) * canvasScale.x;
    const y = (e.clientY - rect.top) * canvasScale.y;
    
    setCropEnd({ x, y });
  };

  const handleMouseUp = () => {
    if (!cropMode || !cropStart || !cropEnd || !canvasRef.current) return;

    // Calculate crop dimensions
    const x = Math.min(cropStart.x, cropEnd.x);
    const y = Math.min(cropStart.y, cropEnd.y);
    const width = Math.abs(cropEnd.x - cropStart.x);
    const height = Math.abs(cropEnd.y - cropStart.y);
    
    // Only apply crop if the area is significant
    if (width > 10 && height > 10) {
      const newCropDimensions = { x, y, width, height };
      setCropDimensions(newCropDimensions);
      
      // Add to history
      addToHistory({
        brightness,
        contrast,
        rotation,
        grayscaleAmount,
        blurAmount,
        opacity,
        cropDimensions: newCropDimensions
      });
    }
    
    // Exit crop mode
    setCropMode(false);
    setCropStart(null);
    setCropEnd(null);
  };

  const handleBrightnessChange = (value: number) => {
    setBrightness(value);
    addToHistory({
      brightness: value,
      contrast,
      rotation,
      grayscaleAmount,
      blurAmount,
      opacity,
      cropDimensions
    });
  };

  const handleContrastChange = (value: number) => {
    setContrast(value);
    addToHistory({
      brightness,
      contrast: value,
      rotation,
      grayscaleAmount,
      blurAmount,
      opacity,
      cropDimensions
    });
  };
  
  const handleGrayscaleChange = (value: number) => {
    setGrayscaleAmount(value);
    addToHistory({
      brightness,
      contrast,
      rotation,
      grayscaleAmount: value,
      blurAmount,
      opacity,
      cropDimensions
    });
  };
  
  const handleBlurChange = (value: number) => {
    setBlurAmount(value);
    addToHistory({
      brightness,
      contrast,
      rotation,
      grayscaleAmount,
      blurAmount: value,
      opacity,
      cropDimensions
    });
  };
  
  const handleOpacityChange = (value: number) => {
    setOpacity(value);
    addToHistory({
      brightness,
      contrast,
      rotation,
      grayscaleAmount,
      blurAmount,
      opacity: value,
      cropDimensions
    });
  };

  const handleRotate = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
    
    // Add to history
    addToHistory({
      brightness,
      contrast,
      rotation: newRotation,
      grayscaleAmount,
      blurAmount,
      opacity,
      cropDimensions
    });
  };

  const handleCropClick = () => {
    setCropMode(!cropMode);
    if (cropMode) {
      setCropStart(null);
      setCropEnd(null);
    }
  };

  const resetEdits = () => {
    setBrightness(100);
    setContrast(100);
    setRotation(0);
    setGrayscaleAmount(0);
    setBlurAmount(0);
    setOpacity(100);
    setCropDimensions(null);
    
    // Add to history
    addToHistory({
      brightness: 100,
      contrast: 100,
      rotation: 0,
      grayscaleAmount: 0,
      blurAmount: 0,
      opacity: 100,
      cropDimensions: null
    });
  };

  const handleSave = () => {
    if (!canvasRef.current) return;
    
    const editedImageUrl = canvasRef.current.toDataURL("image/jpeg");
    onSave(editedImageUrl);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    const editedImageUrl = canvasRef.current.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = editedImageUrl;
    link.download = "edited-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-[2px] transition-all duration-500 ease-in z-50 flex flex-col items-center justify-center p-4"
    >
      <div className="bg-[#0f0f0f] rounded-xl w-full max-w-4xl border-4 border-[#ffffff0a] p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 p-2 rounded-lg bg-stone-700 text-white hover:text-gray-300"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <h2 className="text-xl font-bold text-white">Image Editor</h2>
          <div className="flex gap-2">
            <button 
              onClick={undo} 
              disabled={historyIndex <= 0}
              className={`p-2 rounded-full ${historyIndex <= 0 ? 'text-gray-500' : 'text-white hover:bg-gray-800'}`}
            >
              <Undo size={20} />
            </button>
            <button 
              onClick={resetEdits}
              className="p-2 rounded-full text-white hover:bg-gray-800"
            >
              <Layers size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Canvas container */}
          <div className="flex-1 relative bg-black/50 rounded-lg overflow-hidden flex items-center justify-center">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-10">
                <Loader2 size={40} className="text-white animate-spin mb-4" />
                <p className="text-white">Loading image...</p>
              </div>
            ) : (
              <>
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className="max-w-full max-h-[60vh] object-contain"
                />
                {cropMode && cropStart && cropEnd && canvasRef.current && (
                  <div 
                    className="absolute border-2 border-white pointer-events-none"
                    style={{
                      left: `${Math.min(cropStart.x, cropEnd.x) / canvasRef.current.width * 100}%`,
                      top: `${Math.min(cropStart.y, cropEnd.y) / canvasRef.current.height * 100}%`,
                      width: `${Math.abs(cropEnd.x - cropStart.x) / canvasRef.current.width * 100}%`,
                      height: `${Math.abs(cropEnd.y - cropStart.y) / canvasRef.current.height * 100}%`,
                    }}
                  />
                )}
                {cropMode && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <p className="text-white text-center p-4 bg-black/70 rounded-lg">
                      Click and drag to select crop area
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Controls */}
          <div className="w-full md:w-64 bg-[#1a1a1a] rounded-lg p-4 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white flex items-center gap-2">
                  <Sun size={16} /> Brightness
                </label>
                <span className="text-white">{brightness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => handleBrightnessChange(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white flex items-center gap-2">
                  <Contrast size={16} /> Contrast
                </label>
                <span className="text-white">{contrast}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => handleContrastChange(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white flex items-center gap-2">
                  <Maximize2 size={16} /> Grayscale
                </label>
                <span className="text-white">{grayscaleAmount}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={grayscaleAmount}
                onChange={(e) => handleGrayscaleChange(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white flex items-center gap-2">
                  <Droplets size={16} /> Blur
                </label>
                <span className="text-white">{blurAmount}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={blurAmount}
                onChange={(e) => handleBlurChange(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white flex items-center gap-2">
                  <EyeOff size={16} /> Opacity
                </label>
                <span className="text-white">{opacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => handleOpacityChange(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleRotate}
                className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white p-2 rounded-lg flex items-center justify-center gap-2"
              >
                <RotateCw size={16} /> Rotate
              </button>
              <button
                onClick={handleCropClick}
                className={`${cropMode ? 'bg-purple-700' : 'bg-[#2a2a2a] hover:bg-[#3a3a3a]'} text-white p-2 rounded-lg flex items-center justify-center gap-2`}
              >
                <Crop size={16} /> Crop
              </button>
              <button
                onClick={handleDownload}
                className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white p-2 rounded-lg flex items-center justify-center gap-2 col-span-2"
              >
                <Download size={16} /> Download
              </button>
            </div>

            <div className="mt-auto pt-4 flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 hover:bg-[#3a3a3a] bg-red-600/80 text-white p-2 rounded-lg flex items-center justify-center gap-2"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-purple-700 hover:bg-purple-800 text-white p-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Check size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageEditor;
