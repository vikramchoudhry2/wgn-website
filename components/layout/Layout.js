import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';

const Layout = ({ children, title = 'We Got Next' }) => {
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
    <div>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="description" content="We Got Next - Basketball Community" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout; 