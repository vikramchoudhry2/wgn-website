import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-16 overflow-hidden">
      {/* Circular design element */}
      <div className="absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2 opacity-30">
        <Image 
          src="/assets/wgn-balls.png" 
          alt="Decorative circle" 
          width={600} 
          height={600}
          className="animate-spin-slow rounded-full" 
        />
      </div>
      
      <div className="container-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/">
              <Image 
                src="/assets/WeGotNext-logo.png" 
                alt="We Got Next Logo" 
                width={80} 
                height={80}
              />
            </Link>
          </div>
          
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link href="/shop" className="text-white hover:text-gray-300 transition-all">Shop</Link>
            <Link href="/academy" className="text-white hover:text-gray-300 transition-all">Academy</Link>
          </div>
          
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link href="/celebs" className="text-white hover:text-gray-300 transition-all">Community</Link>
            <Link href="/donation" className="text-white hover:text-gray-300 transition-all">Donate</Link>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} WeGotNext - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 