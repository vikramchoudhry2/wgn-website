import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const cards = [
  {
    id: 1,
    title: 'Shop',
    image: '/assets/SHOP.png',
    link: '/shop',
  },
  {
    id: 2,
    title: 'Academy',
    image: '/assets/sac.png',
    link: '/academy',
  },
  {
    id: 3,
    title: 'Community',
    image: '/assets/community.png',
    link: '/celebs',
  },
];

const WhoWeAreSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !contentRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const contentWidth = contentRef.current.scrollWidth - window.innerWidth;
      
      // Check if section is in viewport
      if (top < windowHeight && top > -height) {
        // Calculate scroll progress within the section
        const scrollPosition = window.scrollY;
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = height;
        
        // Calculate progress (0 to 1)
        const progress = Math.min(
          1,
          Math.max(0, (scrollPosition - sectionTop + windowHeight) / (sectionHeight + windowHeight))
        );
        
        // Apply transform to content
        const translateX = -contentWidth * progress;
        contentRef.current.style.transform = `translateX(${translateX}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section ref={sectionRef} className="bg-black py-20 md:py-28 overflow-hidden">
      <div className="container-center mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Who We Are</h2>
          <Image 
            src="/assets/swoosh.png"
            alt="Divider"
            width={200}
            height={50}
            className="mx-auto"
          />
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          ref={contentRef}
          className="flex transition-transform duration-300 ease-out pl-8 md:pl-12"
          style={{ willChange: 'transform' }}
        >
          {cards.map((card) => (
            <Link 
              key={card.id}
              href={card.link}
              className="relative flex-shrink-0 mx-4 group"
            >
              <div className="relative overflow-hidden rounded-lg" style={{ width: '600px', height: '500px' }}>
                <div className="absolute inset-0 bg-black bg-opacity-25 group-hover:bg-opacity-0 transition-all duration-300" />
                <Image 
                  src={card.image}
                  alt={card.title}
                  width={600}
                  height={500}
                  className="w-[600px] h-[360px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection; 