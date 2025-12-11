import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const WhoWeAreSection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500/20 rounded-full opacity-60 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/20 rounded-full opacity-40 blur-2xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/30 rounded-full opacity-50 animate-bounce" style={{animationDuration: '3s'}} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column: Image with heading above */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white relative"
            >
              Who We Are
              <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500" />
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] md:h-[650px] lg:h-[800px] w-full rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 border-2 border-orange-500/30"
            >
              <Image
                src="/assets/harp.jpeg"
                alt="WeGotNext"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-orange-500/20" />
            </motion.div>
          </div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
              >
                <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                  We Got Next began as an app connecting basketball players to find games efficiently. Over the years, we saw the impact of our platform and expanded into running youth basketball clinics. What started as a one-day event quickly grew into weekly clinics, starting with 15 kids and now serving over 150 in San Jose and Sacramento.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
              >
                <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                  We realized it's about more than just basketball; it's a community initiative providing a safe space for youth to learn, grow, and be themselves. Through the We Got Next camp, we've had the chance to give back to the community.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              >
                <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                  As our journey evolves, so do our goals. That's why we're excited to officially introduce WeGotNext—a mindset focused on trusting the journey, not just the results. WeGotNext transcends basketball; it inspires everyone chasing their next opportunity—small business owners, students, teachers, athletes, and minorities breaking through. We recognize that our time is now. We Got Next!
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection; 