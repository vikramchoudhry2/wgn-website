import React, { useState, useMemo, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';

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
      <div className="pt-20">
        <div className="bg-black text-white py-20">
          <div className="container-center">
            <div className="text-center mb-12">
              <h1 className="heading-hero text-white font-bold mb-4">{campaign.title || 'Support Our Mission'}</h1>
              <div className="mx-auto w-40 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-ping opacity-50"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <div>
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-black">
                  <Image
                    src="/assets/donation1.png"
                    alt="Donation impact"
                    fill
                    className="object-contain"
                  />
                </div>
                
                <h2 className="text-3xl font-bold mb-4">Why Donate?</h2>
                <div className="text-gray-300 text-lg leading-relaxed mb-6 space-y-4">
                  <h3 className="text-white text-2xl font-semibold">Support WeGotNext Basketball</h3>
                  <p>
                    At <strong>WeGotNext Basketball</strong>, we believe in more than just building basketball players — we’re building future leaders. Our program provides young athletes with the tools they need to succeed on the court and in life, focusing on skill development, academic excellence, teamwork, and character.
                  </p>

                  <h4 className="text-white text-xl font-semibold">Your support helps us:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide scholarships for players in need</li>
                    <li>Cover gym rental fees and equipment costs</li>
                    <li>Bring in special guest coaches and mentors</li>
                    <li>Offer academic tutoring and life skills workshops</li>
                    <li>Fund travel expenses for tournaments and competitions</li>
                  </ul>

                  <h4 className="text-white text-xl font-semibold">Why Your Donation Matters</h4>
                  <p>
                    Every contribution, no matter the size, makes a direct impact. By donating, you’re helping ensure that every child has the opportunity to learn, grow, and play in a positive, supportive environment — regardless of their financial situation.
                  </p>

                  <h4 className="text-white text-xl font-semibold">Ways to Give</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>One-Time Gift</strong> – Make a difference today with a single donation</li>
                    <li><strong>Monthly Support</strong> – Join our community of ongoing supporters</li>
                    <li><strong>Sponsorship Opportunities</strong> – Partner with us to fund teams, events, or player scholarships</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  
                </div>
              </div>
              
              <div className="bg-gray-900 p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Make Your Donation</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Donation Amount</label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <button onClick={() => setSelectedAmount('25')} className={`bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md ${selectedAmount === '25' ? 'ring-2 ring-brand-500' : ''}`}>$25</button>
                      <button onClick={() => setSelectedAmount('50')} className={`bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md ${selectedAmount === '50' ? 'ring-2 ring-brand-500' : ''}`}>$50</button>
                      <button onClick={() => setSelectedAmount('100')} className={`bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md ${selectedAmount === '100' ? 'ring-2 ring-brand-500' : ''}`}>$100</button>
                    </div>
                    <div className="flex items-center rounded-md overflow-hidden">
                      <span className="bg-gray-800 px-3 py-2 text-gray-300">$</span>
                      <input 
                        type="text" 
                        inputMode="decimal"
                        value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(''); }}
                        placeholder="Other amount" 
                        className="bg-gray-800 flex-1 py-2 px-3 outline-none text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
                    <div className="space-y-2">
                      <button onClick={openGivebutterCheckout} className="btn-primary w-full">
                        Donate with Givebutter
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">Payments are securely processed via Givebutter.</p>
                  </div>
                  
                  <button onClick={openGivebutterCheckout} className="btn-tertiary w-full">
                    Donate Now {amountValue ? `(USD $${amountValue})` : ''}
                  </button>
                  
                  <p className="text-sm text-gray-400 text-center">
                    Your donation may be tax-deductible. We'll send a receipt to your email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 