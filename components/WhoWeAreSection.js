import React from 'react';
import RollingGallery from './RollingGallery';

const WhoWeAreSection = () => {
  return (
    <section className="bg-black py-8 md:py-12 overflow-hidden">
      <div className="container-center mb-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Who We Are</h2>
          <div className="mx-auto w-40 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-ping opacity-50"></div>
          </div>
        </div>
      </div>
      <RollingGallery autoplay={true} pauseOnHover={true} />
    </section>
  );
};

export default WhoWeAreSection; 