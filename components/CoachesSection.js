import React from 'react';

const coaches = [
  {
    name: 'Harpinder Singh',
    image: '/assets/u14.png',
    bio: 'Founding WeGotNext in 2017, Harpinder sought to change the life of kids through basketball like his was by his first coach, Creighton Lane. His passion for basketball has never waivered, and in the process has led WeGotNext from an app, to a basketball camp in Sacramento and San Jose. The camp has seen more than 200 kids come through, and continues to expand year over year.'
  },
  {
    name: 'Mandeep Sahota',
    image: '/assets/magic.png',
    bio: 'Mandeep Sahota has been a coach at the WeGotNext Basketball camp in Sacramento since 2021. A 4 year starter for Wilcox High School basketball in Santa Clara, she now teaches in Elk Grove, and is the coach for the school basketball team.'
  },
  {
    name: 'Coach Name 3',
    image: '/assets/placeholder-coach.png',
    bio: 'Coach biography and details will be added here. This section will include their background, experience, and contributions to the WeGotNext Basketball program.'
  },
  {
    name: 'Coach Name 4',
    image: '/assets/placeholder-coach.png',
    bio: 'Coach biography and details will be added here. This section will include their background, experience, and contributions to the WeGotNext Basketball program.'
  },
];

export default function CoachesSection() {
  return (
    <section className="w-full py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>Meet the Coaches</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {coaches.map((coach, idx) => (
          <div key={coach.name} className="group relative rounded-2xl overflow-hidden shadow-lg bg-white/5 border border-white/10 aspect-[3/4] cursor-pointer">
            <img src={coach.image} alt={coach.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-4" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>{coach.name}</h3>
              <p className="text-white/90 text-base md:text-lg font-medium">{coach.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 