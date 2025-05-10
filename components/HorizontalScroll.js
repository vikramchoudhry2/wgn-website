import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    // Set window width for responsive animation
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if the section is in viewport
      if (top < windowHeight && top > -height) {
        // Calculate progress (0 to 1) based on how far the section is from the top of viewport
        const progress = 1 - (top / windowHeight);
        setScrollPosition(Math.max(0, Math.min(progress, 1)));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Calculate translation so text starts off-screen and moves to center
  const startX = windowWidth / 2 + 500; // 400px buffer for even farther movement
  const topTextX = startX * (1 - scrollPosition);
  const bottomTextX = -startX * (1 - scrollPosition);

  return (
    <div ref={containerRef} className="relative bg-black py-20 overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-2">
        {/* Top Text */}
        <div 
          className="text-right w-full"
          style={{
            transform: `translateX(${topTextX}px)`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold" style={{ fontFamily: 'Roxboroughcf, sans-serif', color: '#e0e0e0' }}>We Got Next</h1>
        </div>
        
        {/* Bottom Text */}
        <div 
          className="text-left w-full"
          style={{
            transform: `translateX(${bottomTextX}px)`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold" style={{ fontFamily: 'Roxboroughcf, sans-serif', color: '#e0e0e0' }}>We Got Next</h1>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll; 