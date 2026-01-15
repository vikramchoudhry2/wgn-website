import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const FeatureCards = () => {
  const features = [
    {
      title: 'Shop',
      image: '/assets/SHOP.png',
      link: '/shop',
      gradient: 'from-orange-500/20 to-red-500/20',
      hoverGradient: 'group-hover:from-orange-500/40 group-hover:to-red-500/40',
      borderColor: 'border-orange-500/30 group-hover:border-orange-500/60'
    },
    {
      title: 'Academy',
      image: '/assets/sac.png',
      link: '/academy',
      gradient: 'from-blue-500/20 to-purple-500/20',
      hoverGradient: 'group-hover:from-blue-500/40 group-hover:to-purple-500/40',
      borderColor: 'border-blue-500/30 group-hover:border-blue-500/60'
    },
    {
      title: 'Community',
      image: '/assets/community.png',
      link: '/community',
      gradient: 'from-green-500/20 to-teal-500/20',
      hoverGradient: 'group-hover:from-green-500/40 group-hover:to-teal-500/40',
      borderColor: 'border-green-500/30 group-hover:border-green-500/60'
    }
  ];

  return (
    <section className="relative py-12 md:py-24 bg-gradient-to-b from-slate-900 via-gray-900 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link href={feature.link}>
                <div className={`relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer border ${feature.borderColor} h-full`}>
                  {/* Background gradient glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} ${feature.hoverGradient} transition-all duration-500`} />
                  
                  {/* Card Image - Full Card */}
                  <div className="relative h-[280px] sm:h-[320px] md:h-80 lg:h-[400px] overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 33vw, 400px"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;


