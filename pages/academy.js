import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Academy() {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const coreValues = [
    { name: 'Teamwork', color: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'Respect', color: 'bg-green-500 hover:bg-green-600' },
    { name: 'Discipline', color: 'bg-purple-500 hover:bg-purple-600' },
    { name: 'Excellence', color: 'bg-orange-500 hover:bg-orange-600' },
    { name: 'Growth', color: 'bg-red-500 hover:bg-red-600' },
    { name: 'Community', color: 'bg-yellow-500 hover:bg-yellow-600' }
  ];

  const faqs = [
    {
      question: 'Who can join the camp?',
      answer: 'Our camp is open to players of all skill levels, ages 5-18. We welcome beginners to advanced players looking to improve their game.'
    },
    {
      question: 'When and where is the camp held?',
      answer: 'Camps are held on Sunday 4:00-7PM in Natomas, Sacramento. Beginner sessions are 4:00-5:00 PM, 14U sessions are 5:00-6:30PM, and 18U sessions are 6:30-8PM.'
    },
    {
      question: 'What should my child bring?',
      answer: 'Players should bring basketball shoes, comfortable athletic wear, a water bottle, and a positive attitude. We provide basketballs and training equipment.'
    },
    {
      question: 'How can I register?',
      answer: 'Registration is easy! Click the "Register Now" button on any event or contact us directly. Early bird discounts available for advance registration.'
    }
  ];

  const coaches = [
    {
      name: 'Coach Harpinder',
      image: '/assets/coach.png',
      bio: '10+ years coaching youth basketball'
    },
    {
      name: 'Coach Rob',
      image: '/assets/rob.jpeg',
      bio: 'Youth Basketball Coach'
    },
    {
      name: 'Coach Manny Sekhon',
      image: '/assets/manny1.png',
      bio: 'Youth Basketball Coach'
    },
    {
      name: 'Coach Mandeep',
      image: '/assets/mandeep.png',
      bio: 'Elite trainer focusing on skill development'
    },
    {
      name: 'Coach Manny Purewal',
      image: '/assets/mannyk1.png',
      bio: 'Program organizer and coordinator'
    }
  ];

  const players = [
    {
      name: 'Harji Atwal',
      image: '/assets/harji.png',
      posY: 10,
    },
    {
      name: 'Armaan Saini',
      image: '/assets/saini.JPG',
      posY: 5,
    },
    {
      name: 'Shabd Thind',
      image: '/assets/shabd.JPG',
      posY: 10,

    },
    {
      name: 'Nishan Hayer',
      image: '/assets/nishan.jpg',
      posY: 40,
    },
    {
        name: 'Jasmeet Singh',
        image: '/assets/jasmeet.jpg',
        posY: 60,
      },
      {
        name: 'Prabhroop Singh',
        image: '/assets/roop.jpg',
        posY: 60,
      },
      {
        name: 'Aaron Gidda',
        image: '/assets/gidda.jpg',
        posY: 60,
      },
      {
        name: 'Abhijot Bajwa',
        image: '/assets/aj.png',
        posY: 55,
      },
      {
        name: 'Sahib Randhawa',
        image: '/assets/sahib1.jpeg',
        posY: 35,
      },
      {
        name: 'Rohin Purewal',
        image: '/assets/rohin.png',
        posY: 30,
      },
      {
        name: 'Jaskaran Klotia',
        image: '/assets/klotia.png',
        posY: 30,
      },
      {
        name: 'Taranjit Sanghera',
        image: '/assets/tj2.png',
        posY: 35,
      },
      {
        name: 'Karam Sekhon',
        image: '/assets/karm.png',
        posY: 45,
      },
      {
        name: 'Haafiz M.',
        image: '/assets/haafiz1.png',
        posY: 35,
      },
      {
        name: 'Gurvin Chahal',
        image: '/assets/gurvin.png',
        posY: 50,
      },
      {
        name: 'Gurshan Singh',
        image: '/assets/gurshan.jpg',
        posY: 50,
      },
      {
        name: 'Sahibjit Nagra',
        image: '/assets/sahibjit.jpg',
        posY: 50,
      },
      {
        name: 'Harvin Chahal',
        image: '/assets/harvin.jpg',
        posY: 50,
      }
  ];

  // Sort players by requested priority order, then keep the rest
  const priorityNames = ['harji','jasmeet','shabd','jaskaran','nishan','abhi','sahib','nirwaan','roop','aaron','rohin','harvin','gurvin','gurshan','sahibjit'];
  const rankedPlayers = players.map((player, index) => {
    const lower = player.name.toLowerCase();
    const rankIndex = priorityNames.findIndex((key) => lower.includes(key));
    return { player, index, rank: rankIndex === -1 ? 1000 + index : rankIndex };
  });
  const sortedPlayers = rankedPlayers.sort((a, b) => a.rank - b.rank || a.index - b.index).map((x) => x.player);

  return (
    <Layout
      title="Academy — WeGotNext"
      description="Train with WeGotNext Academy. Elite coaching, character development, and a community-first program for youth hoopers."
      canonical="/academy"
      ogImage="/assets/WeGotNext-logo.png"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'SportsOrganization',
        name: 'WeGotNext Academy',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/academy`,
        sport: 'Basketball',
      }}
    >
      {/* Hero Banner */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-black">
        <div className="absolute inset-0">
        <Image
          src="/assets/black-asg.png"
            alt="18U WeGotNext Academy in Los Angeles, 6/7"
          fill
            className="object-cover opacity-70"
          priority
        />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="heading-hero text-white mb-6"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            WeGotNext<br />
            <span className="text-orange-500">Academy</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-body text-gray-200 mb-8 max-w-2xl"
          >
            Join WeGotNext Academy, where basketball is more than just a game. It's a family.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => window.open('https://registration.teamsnap.com/form/68596', '_blank')}
            className="btn-primary btn-lg"
          >
            Register Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>
      </section>

      {/* Academy Overview */}
      <section className="py-16 bg-gradient-to-b from-gray-900 via-black to-slate-900 relative overflow-hidden">
        {/* Dynamic animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500/20 rounded-full opacity-60 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/20 rounded-full opacity-40 blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/30 rounded-full opacity-50 animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-yellow-500/20 rounded-full opacity-40 animate-ping" style={{animationDelay: '2s'}}></div>
          
          {/* Floating particles */}
          <div className="absolute top-20 left-1/3 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
      </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 lg:-ml-8 border-2 border-orange-500/30"
            >
              <Image
                src="/assets/tourney.jpg"
                alt="Team huddle photo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-orange-500/20"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="heading-section text-white mb-8 relative">
                <span className="relative z-10">
                  What We're About
                  <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
                </span>
              </h2>
              
              <div className="space-y-8">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20">
                  <p className="text-body text-gray-200 leading-relaxed">
                    WeGotNext Academy isn't just about basketball training – it's about building character, 
                    discipline, and the mindset of a champion. Our comprehensive programs combine elite-level 
                    skill development with life lessons that extend far beyond the court.
                  </p>
                </div>
                
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20">
                  <p className="text-body text-gray-200 leading-relaxed">
                    Whether you're just starting your basketball journey or looking to take your game to the 
                    next level, our experienced coaches provide personalized training that adapts to your 
                    unique strengths and goals. We believe every player has untapped potential waiting to be unleashed.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gradient-to-b from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Moving particles */}
          <div className="absolute top-10 left-10 w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-40 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-white mb-12 relative"
          >
            Our Core Values
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full"></div>
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${value.color} text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 cursor-pointer transform shadow-lg hover:shadow-2xl backdrop-blur-sm border border-white/20 relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="relative z-10">{value.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Basketball is Family */}
      <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-slate-900 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s'}}></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-yellow-500/25 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-3 border border-orange-500/30 group-hover:border-orange-500/60 transition-all duration-500">
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                    src="/assets/family-moment.jpg"
                    alt="Basketball teammates helping each other up - Basketball is Family"
                    width={600}
                    height={400}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column: Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-white leading-tight relative"
              >
                Basketball is 
                <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"> Family</span>
                <div className="absolute -bottom-3 left-0 w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    At WeGotNext Academy, we believe that basketball is more than just a game—it's about building bonds that last a lifetime. When one of us falls, we all reach out to help them back up. This is the foundation of everything we do.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    Every practice, every game, and every moment we share together strengthens the bonds that make us not just teammates, but brothers and sisters united by our love for the game and respect for each other.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Basketball Camp FAQs */}
      <section className="py-16 bg-gradient-to-b from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Subtle animated pattern background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 80px)`
          }}></div>
          
          {/* Floating orbs */}
          <div className="absolute top-20 left-20 w-20 h-20 bg-green-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-40 right-40 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12 relative"
          >
            Basketball Camp FAQs
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300"
              >
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between transition-colors"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <motion.svg
                    animate={{ rotate: openFAQ === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </motion.svg>
                </motion.button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-300 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-t border-gray-700/30">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
              </div>
            </div>
      </section>

      {/* Meet the Coaches */}
      <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-slate-900 relative overflow-hidden">
        {/* Enhanced dark background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-orange-500/15 rounded-full blur-2xl animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Additional floating elements */}
          <div className="absolute top-20 right-20 w-6 h-6 bg-orange-400/30 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-32 left-32 w-4 h-4 bg-blue-400/40 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/3 left-1/6 w-3 h-3 bg-purple-400/50 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
          
          {/* Subtle animated grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(249, 115, 22, 0.1) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12 relative"
          >
            Meet the Coaches
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500/80 to-blue-500/80 rounded-full"></div>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group cursor-pointer"
              >
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 border-4 border-white/20 group-hover:border-orange-400/60">
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    className={`group-hover:scale-110 transition-transform duration-500 ${
                      coach.name === 'Coach Rob' ? 'object-cover object-[center_5%]' :
                      coach.name === 'Coach Manny' && coach.image.includes('manny.jpg') ? 'object-cover object-[center_15%]' :
                      coach.name === 'Coach Manny' && coach.image.includes('manny1.jpg') ? 'object-cover object-[left_0%]' :
                      'object-cover object-center'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating ring animation */}
                  <div className="absolute inset-0 rounded-full border-2 border-orange-400/0 group-hover:border-orange-400/50 scale-110 group-hover:scale-125 transition-all duration-500"></div>
                </div>
                <motion.h3 
                  whileHover={{ scale: 1.1 }}
                  className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300"
                >
                  {coach.name}
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 group-hover:border-orange-400/40 transition-all duration-300"
                >
                  <p className="text-gray-200 text-sm font-medium">
                    {coach.bio}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Players */}
      <section className="py-16 bg-gradient-to-b from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Dynamic floating elements with enhanced animations */}
        <div className="absolute inset-0">
          {/* Large animated orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 right-32 w-40 h-40 bg-teal-500/15 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-500/25 rounded-full blur-xl animate-pulse" style={{animationDuration: '3s', animationDelay: '2s'}}></div>
          
          {/* Small floating particles */}
          <div className="absolute top-16 left-1/4 w-4 h-4 bg-emerald-400 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute bottom-40 right-1/4 w-6 h-6 bg-teal-400 rounded-full animate-ping" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '3.2s'}}></div>
          <div className="absolute top-1/3 right-1/5 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{animationDelay: '4.2s'}}></div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)`
          }}></div>
      </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12 relative"
          >
            Meet the Players
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedPlayers.map((player, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -10, rotateX: 5, scale: 1.02 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100 
                }}
                className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 cursor-pointer group border border-gray-700/50 hover:border-emerald-400/60 relative"
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-all duration-500 rounded-2xl"></div>
                
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={player.image}
                    alt={player.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: `center ${player.posY || 50}%` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-emerald-500/20 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  {/* Player role badge */}
                  <div className="absolute top-3 right-3 bg-emerald-500/80 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-white text-xs font-semibold">{player.role}</span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-gray-800/95 to-gray-900/95 relative">
                  <motion.h3 
                    whileHover={{ scale: 1.05 }}
                    className="font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors duration-300"
                  >
                    {player.name}
                  </motion.h3>
                  <p className="text-sm text-gray-400 mb-2 group-hover:text-gray-300 transition-colors duration-300">
                    {player.role}
                  </p>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className="h-px bg-gradient-to-r from-emerald-500 to-cyan-500 mb-2"
                  ></motion.div>
                  <p className="text-sm text-emerald-400 font-semibold group-hover:text-emerald-300 transition-colors duration-300">
                    {player.stats}
                  </p>
                  
                  {/* Animated corner accent */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {isRegistrationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold mb-4">Register for Academy</h3>
            <p className="text-gray-600 mb-6">
              Ready to join WeGotNext Academy? Fill out our registration form and we'll get back to you with more details.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsRegistrationModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle registration logic here
                  setIsRegistrationModalOpen(false);
                }}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Register
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
} 