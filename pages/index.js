import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSlider from '@/components/HeroSlider';
import WhoWeAreSection from '@/components/WhoWeAreSection';
import FeatureCards from '@/components/FeatureCards';

export default function Home() {
  return (
    <Layout
      title="WeGotNext — Basketball Academy, Community & Shop"
      description="WeGotNext empowers youth through basketball training, community events, and premium apparel. Join the academy, explore our community, and shop the latest drops."
      canonical="/"
      ogImage="/assets/WeGotNext-logo.png"
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
      {/* Hero Image Carousel - Full-width, responsive with autoplay and manual controls */}
      <HeroSlider />
      
      {/* Who We Are Section - Two-column layout with fade-in animations */}
      <WhoWeAreSection />
      
      {/* Three Feature Cards - Shop, Academy, Community */}
      <FeatureCards />
    </Layout>
  );
}
