import React, { useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import HeroSlider from '@/components/HeroSlider';
import HorizontalScroll from '@/components/HorizontalScroll';
import StorySection from '@/components/StorySection';
import WhoWeAreSection from '@/components/WhoWeAreSection';
import ScrollScript from '@/components/ScrollScript';

export default function Home() {
  return (
    <Layout
      title="WeGotNext — Basketball Academy, Community & Shop"
      description="WeGotNext empowers youth through basketball training, community events, and premium apparel. Join the academy, explore our community, and shop the latest drops."
      canonical="/"
      ogImage="/assets/WGN.png"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'WeGotNext',
        url: process.env.NEXT_PUBLIC_SITE_URL || '',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/shop?search={query}`,
          'query-input': 'required name=query',
        },
      }}
    >
      {/* Hero Slider */}
      <HeroSlider />
      
      {/* Horizontal Scroll Sections */}
      <HorizontalScroll />
      
      {/* Our Story Section */}
      <StorySection />
      
      
      {/* Who We Are Section */}
      <WhoWeAreSection />
      
      {/* Scroll Script for animations */}
      <ScrollScript />
    </Layout>
  );
}
