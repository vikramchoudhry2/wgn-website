import React, { useRef, useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import ParallaxSlider from '@/components/ParallaxSlider';
import { motion } from 'framer-motion';

const celebrities = [
  {
    id: 1,
    name: 'Fateh',
    image: '/assets/fateh1.png',
    description: 'Music Artist & Basketball Enthusiast',
    category: 'Artist'
  },
  {
    id: 2,
    name: 'JTA',
    image: '/assets/jta.png',
    description: 'Professional Basketball Player',
    category: 'Athlete'
  },
  {
    id: 3,
    name: 'Phil Handy',
    image: '/assets/phil.png',
    description: 'Basketball Coach',
    category: 'NBA Coach'
  },
  {
    id: 4,
    name: 'Bone Collector',
    image: '/assets/bone-collector.png',
    description: 'Streetball Legend',
    category: 'AND 1'
  }
];

const supportTeam = [
  'Bone Collector', 'Phil Handy', 'Juan Toscano Anderson', 'Fateh Singh',
  'Nightwing', 'Preet Chahal', 'Anamika Dubb', 'Sukhman Gill',
  'Amandeep Kang', 'Jay Trak', 'Britt Lucio'
];

export default function Celebs() {
  const leftBallRef = useRef(null);
  const rightBallRef = useRef(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = 600;
      const leftBase = 60;
      const rightBase = 240;
      const leftRotation = Math.max(-120, -scrollY / maxScroll * 120);
      const rightRotation = Math.min(120, scrollY / maxScroll * 120);
      
      if (leftBallRef.current) {
        leftBallRef.current.style.transform = `translateY(-30%) rotate(${leftBase + leftRotation}deg)`;
      }
      if (rightBallRef.current) {
        rightBallRef.current.style.transform = `translateY(-40%) rotate(${rightBase + rightRotation}deg)`;
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Send email to Mailchimp API
      const response = await fetch('/api/mailchimp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        // Mark as submitted
        setEmailSubmitted(true);
        
        // Store in localStorage to prevent re-submission
        localStorage.setItem('wgn_community_email_submitted', 'true');
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setEmailSubmitted(false);
          setEmail('');
        }, 3000);
      } else {
        throw new Error(result.message || 'Failed to subscribe');
      }
      
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      title="Community — WeGotNext"
      description="Highlights, partnerships, and stories from the WeGotNext community. Explore our events, champions, and culture."
      canonical="/community"
      ogImage="/assets/celebs.png"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'WeGotNext Community',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/community`,
      }}
    >
      {/* Enhanced Video Header Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          src="/assets/bone.MOV"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 z-5"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white drop-shadow-2xl mb-6" 
            style={{fontFamily: 'Playfair Display, serif', letterSpacing: '0.05em'}}
          >
            WeGotNext
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {/* Clean elegant animated line */}
            <div className="mx-auto w-40 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full shadow-lg relative overflow-hidden mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-ping opacity-50"></div>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Building community through basketball, one connection at a time
          </motion.p>
        </motion.div>
        
        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Support Structure Section */}
      <section className="relative w-full bg-gradient-to-br from-black via-gray-900 to-black py-24 overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Rotating background images */}
        <img 
          ref={leftBallRef} 
          src="/assets/puneet-bg.png" 
          alt="Basketball Swoosh" 
          className="hidden md:block absolute left-[-60px] top-1/4 w-52 z-0 transition-transform duration-75" 
          style={{transform: 'translateY(-30%)'}} 
        />
        <img 
          ref={rightBallRef} 
          src="/assets/wgn-balls.png" 
          alt="Basketball Swoosh" 
          className="hidden md:block absolute right-[-80px] top-[-40px] w-72 z-0 transition-transform duration-75" 
          style={{transform: 'translateY(-40%) rotate(240deg)'}} 
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Enhanced Text + Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight" 
                  style={{fontFamily: 'Playfair Display, serif'}}
                >
                  We wouldn't be here without the greatest
                  <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"> support structure</span>
                  <br />- our people
                </motion.h2>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full max-w-md"
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-2 border border-orange-500/30 group-hover:border-orange-500/60 transition-all duration-500">
                  <img 
                    src="/assets/sg.png" 
                    alt="Support Person" 
                    className="rounded-xl shadow-2xl w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right Column: Enhanced Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                >
                  <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                    We're incredibly fortunate to have such outstanding individuals representing our brand every single day. Striving to be more than just a brand is no small task—and it's often taken the belief and commitment of key people to make it happen.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                >
                  <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-6">
                    What makes it truly special is how many have embraced our vision from the very beginning. For that, we're deeply grateful. We're especially thankful for those who consistently show up to support the camp and serve as exceptional role models for the kids, including:
                  </p>
                </motion.div>
              </div>
              
              {/* Enhanced Support Team List */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30"
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full animate-pulse"></div>
                  Our Champions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {supportTeam.map((member, index) => (
                    <motion.div
                      key={member}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-500/10 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
                      <span className="text-white font-medium">{member}</span>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1 + supportTeam.length * 0.1 }}
                    className="flex items-center gap-3 p-2 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-orange-300 font-bold italic">And so many more!</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <ParallaxSlider />

      {/* Enhanced Community Showcase Section */}
      <section className="bg-gradient-to-br from-black via-gray-950 to-slate-900 text-white py-20 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s', animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-500/25 rounded-full blur-xl animate-pulse" style={{animationDuration: '3s', animationDelay: '2s'}}></div>
        </div>
        
        <div className="container-center relative z-10">
          {/* Enhanced Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-6"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              Our Community
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> Champions</span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '200px' }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-8"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto"
            >
              We Got Next is proud to be connected with amazing athletes, celebrities, and community leaders who share our passion for basketball and community building. Here are some of the incredible individuals who have been part of our journey.
            </motion.p>
          </motion.div>
          
          {/* Enhanced Celebrity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {celebrities.map((celeb, index) => (
              <motion.div
                key={celeb.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-700/50 hover:border-blue-500/50">
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-semibold">{celeb.category}</span>
                  </div>
                  
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden">
                    <Image 
                      src={celeb.image}
                      alt={celeb.name}
                      fill
                      className={`transition-transform duration-700 group-hover:scale-110 ${
                        celeb.image.includes('fateh1.png') ? 'object-cover object-[center_0%]' :
                        celeb.image.includes('jta.png') ? 'object-cover object-[center_10%]' :
                        celeb.image.includes('bone-collector.png') ? 'object-cover object-[center_20%]' :
                        'object-cover'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/95 transition-all duration-500" />
                    
                    {/* Enhanced overlay content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <motion.h3 
                        whileHover={{ scale: 1.05 }}
                        className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300"
                      >
                        {celeb.name}
                      </motion.h3>
                      <p className="text-gray-300 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                        {celeb.description}
                      </p>
                      
                      {/* Animated progress line */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="mt-3 h-px bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500 rounded-2xl pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Featured Videos Section */}
          <div className="space-y-20">
            {/* Juan Toscano Anderson Video */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 hover:border-orange-500/30 transition-all duration-500"
            >
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <video
                    src="/assets/jta-video.mov"
                    controls
                    className="relative rounded-2xl w-full bg-black shadow-2xl border-2 border-orange-500/30 group-hover:border-orange-500/60 transition-all duration-500"
                    poster="/assets/jta1.png"
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
                      Juan Toscano Anderson
                    </h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mb-6"></div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
                    <p className="text-white text-lg md:text-xl leading-relaxed italic" style={{fontFamily: 'Playfair Display, serif'}}>
                      "When you go ask your parents for advice or your friends for advice or your big brother for advice, you kind of want the answer and there's no answer. You got to work hard. That's a non-negotiable, but you also have to be a good person. You have to treat people the right way. You have to be respectful because when you're not a good person, opportunities close for you, doors close for you."
                    </p>
                  </div>
                  
                  <motion.a 
                    href="http://Journeytoachieve.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300 text-lg"
                  >
                    Visit His Foundation
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>

            {/* Bone Collector Video */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-500"
            >
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:order-2 relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <video
                    src="/assets/bone-practice.mov"
                    controls
                    className="relative rounded-2xl w-full bg-black shadow-2xl border-2 border-purple-500/30 group-hover:border-purple-500/60 transition-all duration-500"
                    poster="/assets/bone-collector.png"
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="lg:order-1 space-y-6"
                >
                  <div>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
                      Bone Collector
                    </h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6"></div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                    <p className="text-white text-lg md:text-xl leading-relaxed italic" style={{fontFamily: 'Playfair Display, serif'}}>
                      "People see me just have the ball on a string all the time. It doesn't just happen overnight. Hard work and passion for what I do from a young age have brought me to where I am today."
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Join Our Community email box removed per request */}
        </div>
      </section>
    </Layout>
  );
} 