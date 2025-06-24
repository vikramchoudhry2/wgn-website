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
  
  // Calculate translation with increased movement
  const startX = windowWidth / 2 + 1500; // Increased from 500 to 1500 for more movement
  const topTextX = startX * (1 - scrollPosition * 1.5); // Multiply by 1.5 to allow crossing over
  const bottomTextX = -startX * (1 - scrollPosition * 1.5); // Multiply by 1.5 to allow crossing over
  const textOpacity = 0.3 + (scrollPosition * 0.7); // Add opacity effect

  return (
    <div ref={containerRef} className="relative bg-black py-10 overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-[30vh] space-y-0">
        {/* Top Text */}
        <div 
          className="text-right w-full -mb-2"
          style={{
            transform: `translateX(${topTextX}px)`,
            transition: 'transform 0.15s ease-out',
            position: 'relative',
            zIndex: scrollPosition > 0.5 ? 1 : 2 // Change z-index when crossing over
          }}
        >
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold" 
            style={{ 
              fontFamily: 'Playfair Display, serif', 
              color: '#808080', // Changed to medium grey
              opacity: textOpacity
            }}
          >
            We Got Next
          </h1>
        </div>
        
        {/* Bottom Text */}
        <div 
          className="text-left w-full -mt-2"
          style={{
            transform: `translateX(${bottomTextX}px)`,
            transition: 'transform 0.15s ease-out',
            position: 'relative',
            zIndex: scrollPosition > 0.5 ? 2 : 1 // Change z-index when crossing over
          }}
        >
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold" 
            style={{ 
              fontFamily: 'Playfair Display, serif', 
              color: '#808080', // Changed to medium grey
              opacity: textOpacity
            }}
          >
            We Got Next
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll; 