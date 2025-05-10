import React from 'react';

const coreValues = [
  'Teamwork',
  'Sportsmanship',
  'Respect',
  'Discipline',
  'Hard Work',
];

export default function AcademyOverview() {
  return (
    <div className="container-center max-w-7xl mx-auto px-4">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-8 md:p-20 flex flex-col gap-10 min-h-[28rem] md:min-h-[34rem] mt-0">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-left text-[#FFC24B] tracking-tight" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>
          <span role="img" aria-label="basketball">🏀</span> ACADEMY OVERVIEW
        </h2>
        <div className="text-base md:text-lg text-white leading-relaxed text-left font-medium">
          WeGotNext Basketball Academy offers a fun and innovative approach for players to enhance their basketball skills while learning new techniques and strategies. Enjoyment is key to mastering new skills, and our basketball camps provide an engaging environment where players can develop their abilities. These camps blend learning with enjoyment, focusing on all facets of the game and the overall development of each player. Key skills taught at our camps include ball handling, shooting, competitive league play, and much more.
          <br /><br />
          In addition to skill development, basketball camps serve as excellent social environments for players. Participants share common goals and interests, fostering opportunities to build lifelong friendships and connections that might not otherwise occur. These new relationships also present challenges, as players compete against others with varying skill levels. Throughout the experience, players will learn the importance of teamwork and collaboration with teammates of diverse talents, gaining a deeper appreciation for sportsmanship and becoming effective team players.
        </div>
        <div className="bg-[#23192b]/80 rounded-xl p-8 mt-4 flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-6 text-white text-center">Our Core Values</h3>
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 w-full">
            {coreValues.map((value) => (
              <div
                key={value}
                className="px-8 py-3 rounded-full bg-[#2d2237] text-white text-lg font-semibold shadow-md border border-white/10 whitespace-nowrap"
                style={{fontFamily: 'Roxboroughcf, sans-serif'}}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 