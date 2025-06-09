import React from 'react';

const players = [
  { name: 'Player 1', image: '/assets/placeholder-player.png', year: '2024', height: `6'1"`, position: 'Guard', number: 3 },
  { name: 'Player 2', image: '/assets/placeholder-player.png', year: '2024', height: `5'11"`, position: 'Forward', number: 7 },
  { name: 'Player 3', image: '/assets/placeholder-player.png', year: '2025', height: `6'2"`, position: 'Center', number: 12 },
  { name: 'Player 4', image: '/assets/placeholder-player.png', year: '2023', height: `5'9"`, position: 'Guard', number: 1 },
  { name: 'Player 5', image: '/assets/placeholder-player.png', year: '2024', height: `6'0"`, position: 'Forward', number: 5 },
  { name: 'Player 6', image: '/assets/placeholder-player.png', year: '2025', height: `6'3"`, position: 'Center', number: 15 },
  { name: 'Player 7', image: '/assets/placeholder-player.png', year: '2023', height: `5'10"`, position: 'Guard', number: 2 },
  { name: 'Player 8', image: '/assets/placeholder-player.png', year: '2024', height: `6'1"`, position: 'Forward', number: 8 },
  { name: 'Player 9', image: '/assets/placeholder-player.png', year: '2025', height: `6'2"`, position: 'Center', number: 13 },
  { name: 'Player 10', image: '/assets/placeholder-player.png', year: '2023', height: `5'8"`, position: 'Guard', number: 4 },
  { name: 'Player 11', image: '/assets/placeholder-player.png', year: '2024', height: `6'0"`, position: 'Forward', number: 6 },
  { name: 'Player 12', image: '/assets/placeholder-player.png', year: '2025', height: `6'3"`, position: 'Center', number: 14 },
];

export default function PlayersSection() {
  return (
    <section className="w-full py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>Meet the Players</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {players.map((player, idx) => (
          <div key={player.name + idx} className="group relative rounded-2xl overflow-hidden shadow-lg bg-white/5 border border-white/10 aspect-[3/4] cursor-pointer">
            <img src={player.image} alt={player.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>{player.name}</h3>
              <div className="text-white/90 text-base md:text-lg font-medium space-y-1">
                <div><span className="font-semibold">Year:</span> {player.year}</div>
                <div><span className="font-semibold">Height:</span> {player.height}</div>
                <div><span className="font-semibold">Position:</span> {player.position}</div>
                <div><span className="font-semibold">Number:</span> {player.number}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 