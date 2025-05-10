import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black bg-opacity-90' : 'bg-transparent'}`}>
      <div className="container-center flex items-center justify-between py-4">
        <Link href="/" className="flex-shrink-0">
          <Image src="/assets/WGN.png" alt="We Got Next logo" width={90} height={35} className="h-auto" />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="nav-item font-medium">Home</Link>
          <Link href="/shop" className="nav-item font-medium">Shop</Link>
          <Link href="/academy" className="nav-item font-medium">Academy</Link>
          <Link href="/celebs" className="nav-item font-medium">Community</Link>
          <Link href="/donation" className="nav-item font-medium">Donate</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 pt-2 pb-4">
          <div className="flex flex-col space-y-4 px-4">
            <Link href="/" className="nav-item font-medium py-2">Home</Link>
            <Link href="/shop" className="nav-item font-medium py-2">Shop</Link>
            <Link href="/academy" className="nav-item font-medium py-2">Academy</Link>
            <Link href="/celebs" className="nav-item font-medium py-2">Community</Link>
            <Link href="/donation" className="nav-item font-medium py-2">Donate</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 