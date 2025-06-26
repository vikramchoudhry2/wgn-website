import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ShopHero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Optional: Add subtle zoom effect on scroll
    const handleScroll = () => {
      if (videoRef.current) {
        const scrolled = window.scrollY;
        const scale = 1 + (scrolled * 0.0005); // Subtle zoom effect
        videoRef.current.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[80vh] min-h-[600px] overflow-hidden bg-black">
      {/* Video Background with Fallback Image */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        >
          <source src="/assets/shop-hero.mp4" type="video/mp4" />
        </video>
        {/* Fallback Image */}
        <Image
          src="/assets/wgn5.png"
          alt="WeGotNext Lifestyle"
          fill
          priority
          className="object-cover opacity-90"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-start px-4">
        {/* Shorts Main Image - leftmost */}
        <div className="absolute left-[42%] top-28 transform -translate-x-1/2 rotate-12 w-72 h-72 md:w-96 md:h-96 z-10">
          <div className="relative w-full h-full">
            <Image
              src="/assets/shorts.png"
              alt="WeGotNext Shorts"
              fill
              className="object-contain drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.3))' }}
            />
          </div>
        </div>
        {/* Britt Shorts Image - middle */}
        <div className="absolute left-[64%] top-32 transform -translate-x-1/2 -rotate-6 w-72 h-72 md:w-96 md:h-96 z-10">
          <div className="relative w-full h-full">
            <Image
              src="/assets/britt-shorts.png"
              alt="Britt Shorts"
              fill
              className="object-contain drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.3))' }}
            />
          </div>
        </div>
        {/* Rise Image - rightmost */}
        <div className="absolute left-[84%] top-32 transform -translate-x-1/2 rotate-12 w-100 h-100 md:w-96 md:h-96 z-10">
          <div className="relative w-full h-full">
            <Image
              src="/assets/rise.png"
              alt="Shorts Rise"
              fill
              className="object-contain drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.3))' }}
            />
          </div>
        </div>
        {/* Text Content with Creative Layout */}
        <div className="max-w-5xl mx-auto relative mt-32 ml-20 md:ml-10 z-18" style={{ zIndex: 20 }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight text-left space-y-2">
            <span className="block">Built for</span>
            <span className="block relative">Hoopers
              <span className="inline-block align-baseline ml-2 w-6 h-6 md:w-8 md:h-8 relative" style={{ transform: 'translateY(6px)' }}>
                <Image src="/assets/BALL.png" alt="Ball" fill className="object-contain" />
              </span>
            </span>
            <span className="block mt-2">Worn</span>
            <span className="block relative">Everywhere
              <span className="inline-block align-baseline ml-2 w-6 h-6 md:w-8 md:h-8 relative" style={{ transform: 'translateY(6px)' }}>
                <Image src="/assets/BALL.png" alt="Ball" fill className="object-contain" />
              </span>
            </span>
          </h1>
          <div className="mt-8">
            <a
              href="#products"
              className="inline-flex items-center text-lg md:text-xl text-white hover:text-orange-400 transition-colors duration-300"
            >
              Shop the Drop
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Category Badges */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-6 md:gap-8 lg:gap-12 flex-wrap px-4">
          {['Shorts', 'Hoodies', 'Tees', 'Backpacks', 'Essentials'].map((category) => (
            <Link
              key={category}
              href={`/shop?category=${category.toLowerCase()}`}
              className="px-4 py-2 md:px-6 md:py-2 text-sm md:text-lg text-white/90 hover:text-white border border-white/30 hover:border-white/60 rounded-full transition-colors duration-300 font-semibold shadow-lg bg-black/40 backdrop-blur-md"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopHero; 