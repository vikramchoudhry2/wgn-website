import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import AcademyOverview from '@/components/AcademyOverview';
import UpcomingEvents from '@/components/UpcomingEvents';
import CampFAQs from '@/components/CampFAQs';
import AcademyRegistrationModal from '@/components/AcademyRegistrationModal';

export default function Academy() {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  return (
    <Layout title="We Got Next - Academy">
      {/* Header Section */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/black-asg.png"
          alt="Academy Header"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="backdrop-blur-md bg-white/30 rounded-xl px-8 py-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-center text-white drop-shadow-lg">
              Sikh Youth All Stars
            </h1>
          </div>
        </div>
      </div>
      {/* Content Section with dark background */}
      <div className="relative w-full bg-[#0a0a0a]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center py-12">
          <AcademyOverview />
          <UpcomingEvents />
          <CampFAQs />
        </div>
      </div>
      {/* Rest of Academy content */}
      <div className="pt-32">
        <div className="bg-black text-white py-20">
          <div className="container-center">
            <div className="max-w-4xl mx-auto">
              <div className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  
                </div>
              </div>
              
              <div className="relative h-96 rounded-xl overflow-hidden mb-16">
                <Image
                  src="/assets/ASGposter.png"
                  alt="Academy in action"
                  width={1200}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
              
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-6">Join Our Academy</h2>
                <p className="text-gray-300 text-lg mb-8">
                  Ready to take your game to the next level? Join the We Got Next Academy today!
                </p>
                <button 
                  onClick={() => setIsRegistrationModalOpen(true)}
                  className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AcademyRegistrationModal 
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
      />
    </Layout>
  );
} 