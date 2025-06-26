import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ShopHero = () => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if desktop on mount
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = videoRef.current?.parentElement;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    // Optional: Add subtle zoom effect on scroll
    const handleScroll = () => {
      if (videoRef.current) {
        const scrolled = window.scrollY;
        const scale = 1 + (scrolled * 0.0003); // More subtle zoom effect
        videoRef.current.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <div className="relative h-[80vh] min-h-[600px] overflow-hidden bg-black">
      {/* Video Background with Lazy Loading */}
      <div className="absolute inset-0 w-full h-full">
        {isVisible && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            poster="/assets/wgn5.png"
            preload="metadata"
          >
            <source src="/assets/shop-hero.mp4" type="video/mp4" />
          </video>
        )}
        
        {/* Fallback Image - Always loaded for LCP */}
        <Image
          src="/assets/wgn5.png"
          alt="WeGotNext Lifestyle"
          fill
          priority
          className="object-cover opacity-90"
          sizes="100vw"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-start px-4">
        {/* Product Images - 3 images positioned for desktop */}
        {isDesktop && (
          <>
            {/* Shorts Main Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 12 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute right-[45%] top-28 transform -translate-x-1/2 w-80 h-80 lg:w-96 lg:h-96 z-10"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/assets/shorts.png"
                  alt="WeGotNext Shorts"
                  fill
                  className="object-contain drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.3))' }}
                  sizes="(max-width: 1024px) 320px, 384px"
                  quality={85}
                  priority={false}
                />
              </div>
            </motion.div>
            
            {/* Britt Shorts Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute right-[25%] top-32 transform -translate-x-1/2 w-80 h-80 lg:w-96 lg:h-96 z-10"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/assets/britt-shorts.png"
                  alt="Britt Shorts"
                  fill
                  className="object-contain drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.3))' }}
                  sizes="(max-width: 1024px) 320px, 384px"
                  quality={85}
                  priority={false}
                />
              </div>
            </motion.div>
            
            {/* Rise Image - Added back */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 12 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute right-[5%] top-32 transform -translate-x-1/2 w-80 h-80 lg:w-96 lg:h-96 z-10"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/assets/rise.png"
                  alt="Rise Shorts"
                  fill
                  className="object-contain drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.3))' }}
                  sizes="(max-width: 1024px) 320px, 384px"
                  quality={85}
                  priority={false}
                />
              </div>
            </motion.div>
          </>
        )}

        {/* Text Content - Left on both desktop and mobile */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 max-w-md z-20 text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black text-white leading-none mb-4"
          >
            Built for<br />
            <span className="text-orange-500">Hoopers.</span><br />
            Worn<br />
            Everywhere.
          </motion.h1>
        </div>

        {/* Floating Basketball Icons - Optimized */}
        {isVisible && (
          <>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute right-12 top-20 w-12 h-12 animate-bounce z-10" 
              style={{ animationDelay: '0.5s' }}
            >
              <Image 
                src="/assets/BALL.png" 
                alt="Basketball" 
                fill 
                className="object-contain" 
                sizes="48px"
                quality={75}
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute right-32 bottom-32 w-8 h-8 animate-pulse z-10" 
              style={{ animationDelay: '1s' }}
            >
              <Image 
                src="/assets/BALL.png" 
                alt="Basketball" 
                fill 
                className="object-contain" 
                sizes="32px"
                quality={75}
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopHero; 