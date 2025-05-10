import React, { useState, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import ShopHero from '@/components/ShopHero';

const products = [
  {
    name: 'WeGotNext Shorts v3',
    description: 'Premium basketball shorts designed for performance and comfort. Perfect for both training and game day.',
    price: '$45.00',
    image: '/assets/shorts.png',
    badge: 'New Arrival',
    badgeColor: 'bg-orange-500',
    previewImages: [
      '/assets/rise.png',
      '/assets/shorts.png',
      '/assets/britt-shorts.png',
    ],
  },
  {
    name: 'WeGotNext Hoodie',
    description: 'Lightweight, breathable hoodies that keep you comfortable on and off the court. Available in multiple colors.',
    price: '$65.00',
    image: '/assets/anamika.png',
    badge: 'Best Seller',
    badgeColor: 'bg-orange-400',
    previewImages: [
      '/assets/britt-pose.png',
      '/assets/hoodie.png',
      '/assets/britt.png',
    ],
  },
  {
    name: 'WeGotNext Shirt',
    description: 'Premium quality shirts featuring our signature designs. Perfect for everyday wear and team events.',
    price: '$35.00',
    image: '/assets/preet.png',
    badge: '',
    badgeColor: '',
    previewImages: [
      '/assets/shirt.png',
      '/assets/shirt.png',
      '/assets/shirt.png',
    ],
  },
  {
    name: 'Hoop Pack',
    description: 'Stylish and functional backpack with dedicated compartments for shoes and accessories. Perfect for the gym or travel.',
    price: '$55.00',
    image: '/assets/vish_sole.png',
    badge: 'Popular',
    badgeColor: 'bg-orange-300',
    previewImages: [
      '/assets/sole.png',
      '/assets/spack.png',
      '/assets/vish_sole.png',
    ],
  },
];

export default function Shop() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const cardRefs = useRef([]);

  // Helper to get the top offset of a card relative to the grid container
  const getCardOffset = (idx) => {
    if (!cardRefs.current[idx]) return 0;
    const cardRect = cardRefs.current[idx].getBoundingClientRect();
    const gridRect = cardRefs.current[0]?.parentNode?.getBoundingClientRect();
    return cardRect.top - (gridRect?.top || 0);
  };

  return (
    <Layout title="We Got Next - Shop">
      <ShopHero />
      <div
        className="min-h-screen py-12"
        style={{
          background: 'linear-gradient(135deg, #181818 0%, #232323 100%)',
        }}
      >
        <div className="container-center max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white">WeGotNext Collection</h1>
            <p className="text-lg text-gray-200 mb-6">
              Premium basketball apparel and accessories designed for the modern athlete.
            </p>
          </div>
          <div className="relative">
            {/* Preview panel for hovered product */}
            {hoveredIdx !== null && products[hoveredIdx].previewImages && (
              <div
                className={`hidden md:flex flex-col gap-4 absolute z-30`}
                style={{
                  top: getCardOffset(hoveredIdx),
                  left:
                    hoveredIdx % 2 === 0
                      ? '-410px'
                      : undefined,
                  right:
                    hoveredIdx % 2 === 1
                      ? '-410px'
                      : undefined,
                  height: cardRefs.current[hoveredIdx]?.offsetHeight || 'auto',
                }}
              >
                {products[hoveredIdx].previewImages.map((img, i) => (
                  <div key={i} className="w-96 h-96 rounded-xl overflow-hidden shadow-lg bg-black/80">
                    <Image src={img} alt="" width={384} height={384} className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, #181818 0%, #232323 100%)' }}>
              {products.map((product, idx) => (
                <div
                  key={product.name}
                  ref={el => (cardRefs.current[idx] = el)}
                  className="bg-white/95 rounded-xl shadow-lg overflow-hidden relative flex flex-col max-w-sm mx-auto"
                  style={{ minHeight: '520px', width: '100%' }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="relative h-80 md:h-1000 w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="w-full h-full"
                    />
                    {product.badge && (
                      <span
                        className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white rounded-full ${product.badgeColor}`}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between p-6">
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900">{product.name}</h3>
                      <p className="text-gray-700 mb-4 text-base">{product.description}</p>
                    </div>
                    <div className="flex items-end justify-between mt-2">
                      <span className="text-lg font-bold text-orange-600">{product.price}</span>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 