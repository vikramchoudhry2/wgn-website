import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    bgImage: '/assets/phil.png',
    bgImageMobile: '/assets/phil.png',
  },
  {
    id: 2,
    bgImage: '/assets/rise.png',
    bgImageMobile: '/assets/rise.png',
  },
  {
    id: 3,
    bgImage: '/assets/celebs.png',
    bgImageMobile: '/assets/celebs.png',
  },
  {
    id: 4,
    bgImage: '/assets/anamika2.png',
    bgImageMobile: '/assets/anamika2.png',
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!isLoaded) {
    // Loading skeleton
    return (
      <section className="relative h-screen bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.bgImage}
              alt="WeGotNext"
              fill
              className="object-cover"
              priority={index === 0} // Only prioritize first slide
              sizes="100vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            WeGotNext
          </h1>
          {/* Gold accent line like Who We Are section */}
          <div className="mx-auto w-40 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-ping opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-orange-500 scale-125' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Social Media Link */}
      <div className="absolute bottom-8 right-8 z-20">
        <Link
          href="https://instagram.com/wegotnext"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300"
        >
          <Image 
            src="/assets/insta-white.png" 
            alt="Instagram" 
            width={24} 
            height={24}
            className="w-6 h-6"
          />
        </Link>
      </div>
    </section>
  );
};

export default HeroSlider; 