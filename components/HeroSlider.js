import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Desktop Image */}
            <div className="hidden md:block h-full">
              <div 
                className={`h-full bg-cover bg-no-repeat ${index === 1 ? 'bg-bottom' : index === 3 ? 'bg-top' : 'bg-center'}`}
                style={{ backgroundImage: `url(${slide.bgImage})` }}
              />
            </div>
            {/* Mobile Image */}
            <div className="block md:hidden h-full">
              <div 
                className={`h-full bg-cover bg-no-repeat ${index === 1 ? 'bg-bottom' : index === 3 ? 'bg-top' : 'bg-center'}`}
                style={{ backgroundImage: `url(${slide.bgImageMobile})` }}
              />
            </div>
            {/* Slide Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">We Got Next</h1>
                <Image 
                  src="/assets/swoosh.png"
                  alt="Swoosh"
                  width={200}
                  height={50}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 text-white focus:outline-none transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 text-white focus:outline-none transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full focus:outline-none transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
      {/* Social/Watch Button and Social Icons at Bottom Left */}
      <div className="absolute bottom-8 left-8 z-30 flex flex-col items-start space-y-4">
        <a 
          href="https://www.instagram.com/p/DApSS2Lv4r0/" 
          className="flex items-center space-x-3 text-white hover:text-orange-400 transition-all group text-lg md:text-xl font-semibold shadow-lg bg-black/70 px-5 py-3 rounded-full border-2 border-white/30 hover:border-orange-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-black bg-opacity-70 rounded-full p-3 group-hover:bg-orange-400 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span>Watch Our Story</span>
        </a>
        <div className="flex space-x-6 mt-2">
          <a 
            href="https://www.instagram.com/wegotnext_hoops/?hl=en" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-400 transition-all bg-black/70 p-3 rounded-full border-2 border-white/30 hover:border-orange-400 shadow-lg"
          >
            <Image 
              src="/assets/insta-white.png"
              alt="Instagram"
              width={32}
              height={32}
            />
          </a>
          <a 
            href="https://www.facebook.com/WegotnextHoops/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-400 transition-all bg-black/70 p-3 rounded-full border-2 border-white/30 hover:border-orange-400 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider; 