import React, { useState, useMemo, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Donation() {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [campaign, setCampaign] = useState({ title: '', description: '', image: '' });

  const givebutterUrl = process.env.NEXT_PUBLIC_GIVEBUTTER_URL || '';

  const amountValue = useMemo(() => {
    // Prefer preset; fall back to custom; sanitize to numbers only
    const numeric = (selectedAmount || customAmount || '').toString().replace(/[^0-9.]/g, '');
    return numeric ? parseFloat(numeric) : '';
  }, [selectedAmount, customAmount]);

  useEffect(() => {
    const fetchMeta = async () => {
      if (!givebutterUrl) return;
      try {
        const params = new URLSearchParams({ url: givebutterUrl });
        const res = await fetch(`/api/givebutter-meta?${params.toString()}`);
        if (!res.ok) return;
        const data = await res.json();
        setCampaign({
          title: data.title || 'Support Our Mission',
          description: data.description || '',
          image: data.image || '',
        });
      } catch (e) {
        // Silent fail
      }
    };
    fetchMeta();
  }, [givebutterUrl]);

  const openGivebutterCheckout = () => {
    if (!givebutterUrl) {
      console.warn('Givebutter URL is not configured. Set NEXT_PUBLIC_GIVEBUTTER_URL in your environment.');
      return;
    }
    const url = amountValue ? `${givebutterUrl}${givebutterUrl.includes('?') ? '&' : '?'}amount=${amountValue}` : givebutterUrl;
    window.open(url, '_blank');
  };

  return (
    <Layout
      title="Donate — WeGotNext"
      description="Support WeGotNext programs and youth development. Your donation funds scholarships, facilities, mentors, and community events."
      canonical="/donation"
      ogImage="/assets/donation.png"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'DonateAction',
        name: 'Donate to WeGotNext',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/donation`,
        recipient: {
          '@type': 'Organization',
          name: 'WeGotNext',
        },
      }}
    >
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/dono1.png"
            alt="Support WeGotNext"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
        </div>
        
        <div className="relative z-10 text-center px-4 py-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="heading-hero text-white mb-6"
          >
            {campaign.title || 'Support Our Mission'}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mx-auto w-40 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full shadow-lg relative overflow-hidden mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-30"></div>
            </div>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Help us empower the next generation through basketball, mentorship, and community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative bg-gradient-to-b from-black via-gray-900 to-slate-900 text-white py-16 md:py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s', animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-500/25 rounded-full blur-xl animate-pulse" style={{animationDuration: '3s', animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Impact Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white relative">
                  Why Your Support Matters
                  <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500" />
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  At <strong className="text-white">WeGotNext Basketball</strong>, we believe in more than just building basketball players — we're building future leaders. Our program provides young athletes with the tools they need to succeed on the court and in life.
                </p>
              </motion.div>

              {/* Impact Cards */}
              <div className="space-y-4">
                {[
                  { icon: '🏟️', title: 'Facilities & Equipment', desc: 'Cover gym rentals and training gear' },
                  { icon: '👨‍🏫', title: 'Expert Coaching', desc: 'Bring in special guest coaches and mentors' },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/40 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-300">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Every Dollar Counts</h3>
                <p className="text-gray-200 leading-relaxed">
                  Every contribution, no matter the size, makes a direct impact. By donating, you're helping ensure that every child has the opportunity to learn, grow, and play in a positive, supportive environment — regardless of their financial situation.
                </p>
              </motion.div>
            </div>

            {/* Right Column - Donation Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="sticky top-24"
            >
              <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-orange-500/30 shadow-2xl">
                <h2 className="text-3xl font-bold mb-8 text-center text-white">Make Your Donation</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Select Amount</label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {['25', '50', '100'].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setSelectedAmount(amount)}
                          className={`py-3 rounded-xl font-semibold transition-all duration-300 ${
                            selectedAmount === amount
                              ? 'bg-orange-500 text-white ring-2 ring-orange-400 scale-105'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
                          }`}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center rounded-xl overflow-hidden border border-gray-700 focus-within:border-orange-500 transition-all duration-300">
                      <span className="bg-gray-800 px-4 py-3 text-gray-300 font-semibold">$</span>
                      <input 
                        type="text" 
                        inputMode="decimal"
                        value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(''); }}
                        placeholder="Custom amount" 
                        className="bg-gray-800 flex-1 py-3 px-4 outline-none text-white placeholder-gray-500"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={openGivebutterCheckout}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      <span>Donate with Givebutter</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                    <p className="text-xs text-gray-400 mt-3 text-center">
                      🔒 Secure payment processing via Givebutter
                    </p>
                  </div>

                  <div className="border-t border-gray-700 pt-6">
                    <div className="bg-black/40 rounded-xl p-4 space-y-2">
                      <h4 className="font-semibold text-white mb-3">Ways to Give:</h4>
                      <div className="space-y-2 text-sm text-gray-300">
                        <p>💚 <strong>One-Time Gift</strong> – Make an impact today</p>
                        <p>📅 <strong>Monthly Support</strong> – Join our recurring supporters</p>
                        <p>🤝 <strong>Sponsorships</strong> – Partner with us long-term</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 text-center pt-4">
                    Your donation may be tax-deductible. Receipt will be sent to your email.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
