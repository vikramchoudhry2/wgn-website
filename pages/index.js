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
    <Layout title="We Got Next - Home">
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
