import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';

const Layout = ({
  children,
  title = 'WeGotNext',
  description = 'WeGotNext - Basketball Academy, Community & Shop',
  ogImage,
  canonical,
  noIndex = false,
  structuredData,
}) => {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const canonicalUrl = canonical || (siteUrl ? `${siteUrl}${router.asPath || ''}` : undefined);
  const socialImage = ogImage || '/assets/WGN.png';
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
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
        <link rel="icon" href="/favicon.ico" />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        {canonicalUrl && <link rel="alternate" hrefLang="en" href={canonicalUrl} />}
        {/* Preconnects for performance */}
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//cdn.shopify.com" />
        
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

        {/* Open Graph / Twitter */}
        <meta property="og:type" content="website" />
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="WeGotNext" />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:alt" content="WeGotNext" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialImage} />

        {/* JSON-LD structured data */}
        {structuredData ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        ) : (
          siteUrl && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Organization',
                  name: 'WeGotNext',
                  url: siteUrl,
                  logo: `${siteUrl}/assets/WeGotNext-logo.png`,
                  sameAs: [
                    'https://www.instagram.com/wegotnextacademy',
                    'https://www.tiktok.com/@wegotnextacademy',
                    'https://www.youtube.com/@wegotnextacademy',
                    'https://twitter.com/wegotnextacademy',
                  ],
                }),
              }}
            />
          )
        )}
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