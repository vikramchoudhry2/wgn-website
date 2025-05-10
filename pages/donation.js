import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';

export default function Donation() {
  return (
    <Layout title="We Got Next - Donate">
      <div className="pt-20">
        <div className="bg-black text-white py-20">
          <div className="container-center">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Support Our Mission</h1>
              <Image 
                src="/assets/swoosh.png"
                alt="Swoosh"
                width={200}
                height={50}
                className="mx-auto"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <div>
                <div className="relative h-96 rounded-xl overflow-hidden mb-6">
                  <Image
                    src="/assets/wgn-dono.png"
                    alt="Donation impact"
                    width={1200}
                    height={700}
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <h2 className="text-3xl font-bold mb-4">Why Donate?</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Your donation directly supports our youth basketball programs, community outreach initiatives, and scholarships for underprivileged youth. With your help, we can continue to provide a safe space for kids to learn, grow, and develop their basketball skills.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">150+</h3>
                    <p className="text-gray-400">Kids in our weekly programs</p>
                  </div>
                  
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">2</h3>
                    <p className="text-gray-400">Cities with active programs</p>
                  </div>
                  
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">100%</h3>
                    <p className="text-gray-400">Of donations go to programs</p>
                  </div>
                  
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">5+</h3>
                    <p className="text-gray-400">Years of community impact</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Make Your Donation</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Donation Amount</label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md">$25</button>
                      <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md">$50</button>
                      <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md">$100</button>
                    </div>
                    <div className="flex items-center rounded-md overflow-hidden">
                      <span className="bg-gray-800 px-3 py-2 text-gray-300">$</span>
                      <input 
                        type="text" 
                        placeholder="Other amount" 
                        className="bg-gray-800 flex-1 py-2 px-3 outline-none text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Personal Information</label>
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="bg-gray-800 w-full py-2 px-3 rounded-md mb-3 outline-none text-white"
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="bg-gray-800 w-full py-2 px-3 rounded-md mb-3 outline-none text-white"
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number (Optional)" 
                      className="bg-gray-800 w-full py-2 px-3 rounded-md outline-none text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
                    <div className="space-y-2">
                      <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md w-full flex items-center justify-center">
                        <span>Credit Card</span>
                      </button>
                      <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md w-full flex items-center justify-center">
                        <span>PayPal</span>
                      </button>
                    </div>
                  </div>
                  
                  <button className="bg-white text-black font-bold py-3 px-6 rounded-full w-full hover:bg-gray-200 transition-colors">
                    Donate Now
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