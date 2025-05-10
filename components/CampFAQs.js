import React, { useState } from 'react';

const faqs = [
  {
    q: 'Who can join the basketball camp?',
    emoji: '🏀',
    a: 'Our camp is open to boys and girls ages 7-17. We group players by age and skill level to ensure everyone gets the most out of their experience.'
  },
  {
    q: 'When and where is the camp held?',
    emoji: '📅',
    a: "The camp is held every summer at our main facility. Check our website for this year's dates and location details."
  },
  {
    q: 'What should my child bring?',
    emoji: '💧',
    a: 'Campers should bring basketball shoes, athletic clothing, a water bottle, and a positive attitude! All basketballs and training equipment are provided.'
  },
  {
    q: 'How can I register?',
    emoji: '📞',
    a: 'You can register online through our website. Visit the Academy page and click the "Register Now" button to get started.'
  },
];

export default function CampFAQs() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="w-full mt-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-wide uppercase text-white" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>
          Basketball Camp FAQs
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={faq.q}
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:bg-white/10"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left group focus:outline-none"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <span className="flex items-center gap-4 text-xl md:text-2xl font-semibold text-white">
                    <span className="text-2xl md:text-3xl">{faq.emoji}</span>
                    <span className="font-bold" style={{fontFamily: 'Roxboroughcf, sans-serif'}}>{faq.q}</span>
                  </span>
                  <span className="ml-4 flex items-center">
                    <span className={`transition-transform duration-300 text-3xl text-white/70 group-hover:text-[#FFC24B] ${isOpen ? 'rotate-45 text-[#FFC24B]' : ''}`}>+</span>
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={`faq-panel-${idx}`}
                    className="bg-white/5 px-6 py-6 text-base md:text-lg text-white/90 animate-fadeIn border-t border-white/10"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 