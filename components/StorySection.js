import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const StorySection = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.min(Math.max(1 - rect.top / windowHeight, 0), 1);
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate background blur/scale and text position/opacity
  const bgBlur = 8 * Math.max(0, scrollProgress - 0.5) / 0.5; // Start blurring after 50% scroll, up to 8px
  const bgScale = 1 + 0.08 * scrollProgress; // up to 8% zoom
  const textTranslateY = 1100 - 1100 * scrollProgress; // from 900px down to 0
  const textOpacity = 0.05 + 0.95 * Math.pow(scrollProgress, 1.2); // more gradual fade-in

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Background image with blur/zoom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-0"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/assets/harp.jpeg') center center no-repeat`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          filter: `blur(${bgBlur}px) scale(${bgScale})`,
          transform: `scale(${bgScale})`,
          transition: 'filter 0.2s, transform 0.2s',
        }}
      />
      {/* Content above background */}
      <div className="relative z-10 container-center">
        <div
          className="text-center mb-8"
          style={{
            transform: `translateY(${textTranslateY}px)`,
            opacity: textOpacity,
            transition: 'transform 0.2s, opacity 0.2s',
          }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Our Story</h2>
          <Image 
            src="/assets/swoosh.png"
            alt="Divider"
            width={150}
            height={20}
            className="mx-auto"
          />
        </div>
        <div
          className="max-w-3xl mx-auto"
          style={{
            transform: `translateY(${textTranslateY}px)`,
            opacity: textOpacity,
            transition: 'transform 0.2s, opacity 0.2s',
          }}
        >
          <p className="text-gray-300 text-lg leading-relaxed">
            We Got Next began as an app connecting basketball players to find games efficiently. Over the years, we saw the impact of our platform and expanded into running youth basketball clinics. What started as a one-day event quickly grew into weekly clinics, starting with 15 kids and now serving over 150 in San Jose and Sacramento. 
            <br /><br />
            We realized it's about more than just basketball; it's a community initiative providing a safe space for youth to learn, grow, and be themselves. Through the We Got Next camp, we've had the chance to give back to the community.
            <br /><br />
            As our journey evolves, so do our goals. That's why we're excited to officially introduce WeGotNext—a mindset focused on trusting the journey, not just the results. WeGotNext transcends basketball; it inspires everyone chasing their next opportunity—small business owners, students, teachers, athletes, and minorities breaking through. We recognize that our time is now. We Got Next!
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection; 