import React, { useEffect, useRef } from "react";

const AudioVisualizer = () => {
  const visualizerRef = useRef(null);

  useEffect(() => {
    const visualizer = visualizerRef.current;
    const simulateAudioData = () => {
      if (visualizer) {
        // Generate random audio levels
        const randomHeight = Math.random() * 100; // Replace this with real audio data processing
        visualizer.style.height = `${randomHeight}%`;
      }
    };
    const intervalId = setInterval(simulateAudioData, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="visualizer-container">
      <div ref={visualizerRef} className="visualizer-bar"></div>
    </div>
  );
};

export default AudioVisualizer;
