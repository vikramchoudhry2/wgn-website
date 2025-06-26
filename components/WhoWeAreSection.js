import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const cards = [
  {
    id: 1,
    title: 'Shop',
    image: '/assets/SHOP.png',
    link: '/shop',
  },
  {
    id: 2,
    title: 'Academy',
    image: '/assets/sac.png',
    link: '/academy',
  },
  {
    id: 3,
    title: 'Community',
    image: '/assets/community.png',
    link: '/celebs',
  },
];

const WhoWeAreSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentTranslateX, setCurrentTranslateX] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !contentRef.current || isUserInteracting) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const contentWidth = contentRef.current.scrollWidth - window.innerWidth;
      
      // Check if section is in viewport
      if (top < windowHeight && top > -height) {
        // Calculate scroll progress within the section
        const scrollPosition = window.scrollY;
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = height;
        
        // Calculate progress (0 to 1)
        const progress = Math.min(
          1,
          Math.max(0, (scrollPosition - sectionTop + windowHeight) / (sectionHeight + windowHeight))
        );
        
        // Apply transform to content
        const translateX = -contentWidth * progress;
        setCurrentTranslateX(translateX);
        contentRef.current.style.transform = `translateX(${translateX}px)`;
      }
    };

    // Touch/Mouse event handlers
    const handleStart = (clientX) => {
      setIsDragging(true);
      setIsUserInteracting(true);
      setStartX(clientX);
      setScrollLeft(currentTranslateX);
      if (contentRef.current) {
        contentRef.current.style.transition = 'none';
      }
    };

    const handleMove = (clientX) => {
      if (!isDragging || !contentRef.current) return;
      
      const deltaX = clientX - startX;
      const newTranslateX = scrollLeft + deltaX;
      const maxTranslateX = 0;
      const minTranslateX = -(contentRef.current.scrollWidth - window.innerWidth);
      
      // Constrain the movement
      const constrainedTranslateX = Math.min(maxTranslateX, Math.max(minTranslateX, newTranslateX));
      
      setCurrentTranslateX(constrainedTranslateX);
      contentRef.current.style.transform = `translateX(${constrainedTranslateX}px)`;
    };

    const handleEnd = () => {
      setIsDragging(false);
      if (contentRef.current) {
        contentRef.current.style.transition = 'transform 0.3s ease-out';
      }
      
      // Reset user interaction after a delay to allow scroll-based animation to resume
      setTimeout(() => {
        setIsUserInteracting(false);
      }, 1000);
    };

    // Mouse events
    const handleMouseDown = (e) => {
      e.preventDefault();
      handleStart(e.clientX);
    };

    const handleMouseMove = (e) => {
      handleMove(e.clientX);
    };

    const handleMouseUp = () => {
      handleEnd();
    };

    // Touch events
    const handleTouchStart = (e) => {
      handleStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      handleEnd();
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    
    const contentElement = contentRef.current;
    if (contentElement) {
      // Mouse events
      contentElement.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      // Touch events
      contentElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      contentElement.addEventListener('touchmove', handleTouchMove, { passive: false });
      contentElement.addEventListener('touchend', handleTouchEnd);
      
      // Prevent default drag behavior on images
      contentElement.style.userSelect = 'none';
      contentElement.style.webkitUserSelect = 'none';
    }
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      
      if (contentElement) {
        contentElement.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        
        contentElement.removeEventListener('touchstart', handleTouchStart);
        contentElement.removeEventListener('touchmove', handleTouchMove);
        contentElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isDragging, startX, scrollLeft, currentTranslateX, isUserInteracting]);
  
  return (
    <section ref={sectionRef} className="bg-black py-8 md:py-12 overflow-hidden">
      <div className="container-center mb-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Who We Are</h2>
          <div className="mx-auto w-40 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-ping opacity-50"></div>
          </div>
        </div>
      </div>
      
      {/* Swipe indicator */}
      <div className="text-center mb-4">
        <p className="text-gray-400 text-sm">
          <span className="hidden md:inline">Scroll or drag</span>
          <span className="md:hidden">Swipe</span>
          {' '}to explore
        </p>
      </div>
      
      <div className="relative overflow-hidden cursor-grab active:cursor-grabbing">
        <div 
          ref={contentRef}
          className="flex transition-transform duration-300 ease-out pl-8 md:pl-12"
          style={{ 
            willChange: 'transform',
            touchAction: 'pan-y pinch-zoom' // Allow vertical scroll but handle horizontal
          }}
        >
          {cards.map((card) => (
            <Link 
              key={card.id}
              href={card.link}
              className="relative flex-shrink-0 mx-4 group"
              onClick={(e) => {
                // Prevent navigation if user was dragging
                if (isDragging) {
                  e.preventDefault();
                }
              }}
            >
              <div className="relative overflow-hidden rounded-lg" style={{ width: '600px', height: '500px' }}>
                <div className="absolute inset-0 bg-black bg-opacity-25 group-hover:bg-opacity-0 transition-all duration-300" />
                <Image 
                  src={card.image}
                  alt={card.title}
                  width={600}
                  height={500}
                  className="w-[600px] h-[360px] object-cover pointer-events-none"
                  draggable={false}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {cards.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-gray-600 transition-colors duration-300"
            style={{
              backgroundColor: Math.abs(currentTranslateX) > (index * 500) ? '#fb923c' : '#4b5563'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default WhoWeAreSection; 