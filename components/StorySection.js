import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const StorySection = () => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

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
  }, [isVisible]);

  // Animate background blur/scale and text position/opacity
  const bgBlur = 8 * Math.max(0, scrollProgress - 0.5) / 0.5; // Start blurring after 50% scroll, up to 8px
  const bgScale = 1 + 0.08 * scrollProgress; // up to 8% zoom
  const textTranslateY = 1100 - 1100 * scrollProgress; // from 1100px down to 0
  const textOpacity = 0.05 + 0.95 * Math.pow(scrollProgress, 1.2);

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Image with Lazy Loading */}
      {isVisible && (
        <div 
          className="absolute inset-0 w-full h-full transition-all duration-300 ease-out"
          style={{
            background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/assets/harp.jpeg') center center no-repeat`,
            backgroundSize: 'cover',
            transform: `scale(${bgScale})`,
            filter: `blur(${bgBlur}px)`,
          }}
        />
      )}

      {/* Content - Responsive for mobile */}
      <div className="relative z-10 h-full w-full flex items-center justify-center px-2 sm:px-4">
        <div 
          className="text-center transition-all duration-300 ease-out max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto bg-black/40 rounded-xl py-4 px-2 sm:px-8"
          style={{
            transform: `translateY(${textTranslateY}px)`,
            opacity: textOpacity,
          }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Our Story
          </h2>
          
          {/* Gold accent line like Who We Are section */}
          <div className="mx-auto w-24 sm:w-40 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full shadow-lg relative overflow-hidden mb-6 sm:mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-ping opacity-50"></div>
          </div>
          
          <div className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed sm:leading-relaxed md:leading-relaxed">
            <p>
              We Got Next is a non-profit organization that began as an app connecting basketball players to find games efficiently. Over the years, we saw the impact of our platform and expanded into running youth basketball clinics. What started as a one-day event quickly grew into weekly clinics, starting with 15 kids and now serving over 150 in San Jose and Sacramento.
            </p>
            <br />
            <p>
              We realized it's about more than just basketball; it's a community initiative providing a safe space for youth to learn, grow, and be themselves. Through the We Got Next camp, we've had the chance to give back to the community and expand our reach through being a registed 501(c)(3) organization.
            </p>
            <br />
            <p>
              As our journey evolves, so do our goals. That's why we're excited to officially introduce WeGotNext—a mindset focused on trusting the journey, not just the results. WeGotNext transcends basketball; it inspires everyone chasing their next opportunity—small business owners, students, teachers, athletes, and minorities breaking through. We recognize that our time is now. We Got Next!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient to blend into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
};

export default StorySection; 