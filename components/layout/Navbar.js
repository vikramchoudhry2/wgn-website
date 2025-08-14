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
    <>
      {/* Desktop Navbar - Only visible on desktop */}
      <nav className={`hidden lg:block fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/assets/WeGotNext-logo.png" 
                alt="WeGotNext logo" 
                width={80} 
                height={32} 
                className="h-8 w-auto" 
              />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-orange-400 font-medium transition-colors duration-200">
                Home
              </Link>
              <Link href="/shop" className="text-white hover:text-orange-400 font-medium transition-colors duration-200">
                Shop
              </Link>
              <Link href="/academy" className="text-white hover:text-orange-400 font-medium transition-colors duration-200">
                Academy
              </Link>
              <Link href="/community" className="text-white hover:text-orange-400 font-medium transition-colors duration-200">
                Community
              </Link>
              <Link href="/donation" className="text-white hover:text-orange-400 font-medium transition-colors duration-200">
                Donate
              </Link>
              <CartIcon />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - Much bigger logo and proper touch targets */}
      <nav className={`lg:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-black/50 backdrop-blur-sm'}`}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Logo - Much bigger for readability */}
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/assets/WeGotNext-logo.png" 
                alt="WeGotNext logo" 
                width={120} 
                height={48} 
                className="h-12 w-auto" 
              />
            </Link>
            
            {/* Mobile Right Side - Proper touch targets (44px minimum) */}
            <div className="flex items-center space-x-3">
              <div className="min-w-[44px] min-h-[44px] flex items-center justify-center">
                <CartIcon />
              </div>
              <button 
                className="min-w-[44px] min-h-[44px] p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 active:scale-95 flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <svg 
                  className={`w-7 h-7 text-white transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-black/98 backdrop-blur-lg border-t border-white/10 shadow-2xl">
            <div className="px-4 py-6 space-y-2">
              <Link 
                href="/" 
                className="flex items-center px-5 py-4 text-white hover:text-orange-400 hover:bg-white/10 rounded-xl font-medium transition-all duration-200 text-responsive-xl min-h-[44px]"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/shop" 
                className="flex items-center px-5 py-4 text-white hover:text-orange-400 hover:bg-white/10 rounded-xl font-medium transition-all duration-200 text-responsive-xl min-h-[44px]"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/academy" 
                className="flex items-center px-5 py-4 text-white hover:text-orange-400 hover:bg-white/10 rounded-xl font-medium transition-all duration-200 text-responsive-xl min-h-[44px]"
                onClick={() => setIsMenuOpen(false)}
              >
                Academy
              </Link>
              <Link 
                href="/community" 
                className="flex items-center px-5 py-4 text-white hover:text-orange-400 hover:bg-white/10 rounded-xl font-medium transition-all duration-200 text-responsive-xl min-h-[44px]"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              <Link 
                href="/donation" 
                className="flex items-center px-5 py-4 text-white hover:text-orange-400 hover:bg-white/10 rounded-xl font-medium transition-all duration-200 text-responsive-xl min-h-[44px]"
                onClick={() => setIsMenuOpen(false)}
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar; 