import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';

const Layout = ({ children, title = 'WeGotNext' }) => {
  useEffect(() => {
    // Add smooth scroll class to body
    document.body.classList.add('smooth-scroll');
    
    // Force mobile navigation on mobile devices
    const isMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      
      // Check for mobile user agents
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      // Check for touch capability
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Check for small screen width (even with zoom)
      const isSmallScreen = width <= 1024;
      
      // Check for portrait orientation
      const isPortrait = window.matchMedia && window.matchMedia("(orientation: portrait)").matches;
      
      return isMobileUA || (isTouchDevice && isSmallScreen) || (isPortrait && isSmallScreen);
    };
    
    // Apply mobile class immediately
    if (isMobile()) {
      document.body.classList.add('force-mobile-nav');
    }
    
    // Listen for orientation/resize changes
    const handleResize = () => {
      if (isMobile()) {
        document.body.classList.add('force-mobile-nav');
      } else {
        document.body.classList.remove('force-mobile-nav');
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      document.body.classList.remove('smooth-scroll', 'force-mobile-nav');
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>{title}</title>
        <meta name="description" content="WeGotNext - Basketball Academy, Community & Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/assets/WGN.png"
          as="image"
          type="image/png"
        />
        
        {/* Optimize loading */}
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        
        {/* Performance hints */}
        <meta name="theme-color" content="#000000" />
      </Head>
      
      <Navbar />
      <main className="relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 