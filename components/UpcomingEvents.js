import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const events = [
  {
    date: 'May 25, 2025',
    emoji: '🏀',
    title: 'Spring Camp Registration Open',
    details: 'Registration for our Spring Basketball Camp opens on May 25, 2025. Secure your spot early for skill development, fun, and competition! Open to all ages and skill levels.'
  },
  {
    date: 'May 11, 2025',
    emoji: '🤾‍♂️',
    title: '3v3 Tournament',
    details: 'Join our annual 3v3 Tournament! Teams compete for prizes and bragging rights. All skill levels welcome. Register your team today!'
  },
  {
    date: 'June 6-8, 2025',
    emoji: '🏀',
    title: 'PBA LA Tournament',
    details: 'Our biggest event of the year! Compete against top players and showcase your skills on the court.'
  },
  {
    date: 'July, 2025',
    emoji: '🏆',
    title: 'Celebrity/All Star Game',
    details: "Don't miss our Celebrity/All Star Game featuring special guests, exciting matchups, and entertainment for the whole family!"
  },
];

export default function UpcomingEvents() {
  const [openIdx, setOpenIdx] = useState(null);

  // Close modal on outside click
  const handleBackdropClick = (e) => {
    if (e.target.id === 'event-modal-backdrop') setOpenIdx(null);
  };

  // Close modal on Escape key
  useEffect(() => {
    if (openIdx === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpenIdx(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openIdx]);

  // Modal JSX
  const modal = openIdx !== null ? (
    <div
      id="event-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-[#23192b] via-[#2d2237] to-[#181c24] bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl px-8 py-10 max-w-xl w-full relative animate-fadeIn flex flex-col items-center text-center">
        <button
          className="absolute top-4 right-4 text-2xl text-white hover:text-orange-400 focus:outline-none"
          onClick={() => setOpenIdx(null)}
          aria-label="Close"
        >
          ×
        </button>
        <div className="text-4xl md:text-5xl mb-4 flex items-center justify-center">{events[openIdx].emoji}</div>
        <div className="text-2xl md:text-3xl font-extrabold text-white mb-4" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>{events[openIdx].title}</div>
        <div className="text-white text-base md:text-lg leading-relaxed mb-2">{events[openIdx].details}</div>
      </div>
    </div>
  ) : null;

  return (
    <section className="w-full mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 flex items-center gap-4 text-[#FFC24B] tracking-tight" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>
          <span role="img" aria-label="basketball">🏀</span> UPCOMING EVENTS & KEY DATES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, idx) => (
            <button
              key={event.title}
              className="rounded-2xl bg-[#2d2237] hover:bg-[#3a2947] transition-colors shadow-lg px-6 py-8 flex flex-col items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
              onClick={() => setOpenIdx(idx)}
              style={{ minHeight: '180px' }}
            >
              <div className="text-lg font-bold text-[#FFC24B] mb-4" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>{event.date}</div>
              <div className="text-2xl md:text-3xl mb-2">{event.emoji}</div>
              <div className="text-xl md:text-2xl font-extrabold text-white text-center" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>{event.title}</div>
            </button>
          ))}
        </div>
      </div>
      {typeof window !== 'undefined' && ReactDOM.createPortal(modal, document.body)}
    </section>
  );
} 