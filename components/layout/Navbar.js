import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartIcon from '../CartIcon';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/assets/WGN.png" 
              alt="We Got Next logo" 
              width={80} 
              height={32} 
              className="h-8 w-auto" 
            />
          </Link>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-orange-400 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link href="/shop" className="text-white hover:text-orange-400 font-medium transition-colors duration-200">
              Shop
            </Link>
            <Link href="/academy" className="text-white hover:text-orange-400 font-medium transition-colors duration-200">
              Academy
            </Link>
            <Link href="/celebs" className="text-white hover:text-orange-400 font-medium transition-colors duration-200">
              Community
            </Link>
            <Link href="/donation" className="text-white hover:text-orange-400 font-medium transition-colors duration-200">
              Donate
            </Link>
            <CartIcon />
          </div>
          
          {/* Mobile Menu Button and Cart - Only visible on mobile */}
          <div className="flex md:hidden items-center space-x-3">
            <CartIcon />
            <button 
              className="text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - Only visible on mobile when open */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-80 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-black/95 backdrop-blur-sm border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            <Link 
              href="/" 
              className="block px-3 py-3 text-white hover:text-orange-400 hover:bg-white/5 rounded-md font-medium transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/shop" 
              className="block px-3 py-3 text-white hover:text-orange-400 hover:bg-white/5 rounded-md font-medium transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/academy" 
              className="block px-3 py-3 text-white hover:text-orange-400 hover:bg-white/5 rounded-md font-medium transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Academy
            </Link>
            <Link 
              href="/celebs" 
              className="block px-3 py-3 text-white hover:text-orange-400 hover:bg-white/5 rounded-md font-medium transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              href="/donation" 
              className="block px-3 py-3 text-white hover:text-orange-400 hover:bg-white/5 rounded-md font-medium transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 