import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import ShopHero from '@/components/ShopHero';
import { fetchProducts } from '@/utils/shopify';
import { useCart } from '@/utils/CartContext';

// Fallback products in case Shopify is not configured
const fallbackProducts = [
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
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [usingShopify, setUsingShopify] = useState(false);
  const cardRefs = useRef([]);
  const { addToCart, isLoading: cartLoading, isShopifyConfigured } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Check if Shopify is configured
        if (process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN && process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
          const shopifyProducts = await fetchProducts();
          if (shopifyProducts && shopifyProducts.length > 0) {
            // Transform Shopify products to match our format
            const transformedProducts = shopifyProducts.map((product, index) => ({
              id: product.id,
              name: product.title,
              description: product.description || 'Premium WeGotNext product',
              price: product.variants[0]?.price ? `$${product.variants[0].price.amount}` : 'Price TBD',
              image: product.images[0]?.src || fallbackProducts[index % fallbackProducts.length].image,
              badge: index === 0 ? 'New Arrival' : index === 1 ? 'Best Seller' : index === 3 ? 'Popular' : '',
              badgeColor: index === 0 ? 'bg-orange-500' : index === 1 ? 'bg-orange-400' : index === 3 ? 'bg-orange-300' : '',
              previewImages: product.images.slice(0, 3).map(img => img.src) || fallbackProducts[index % fallbackProducts.length].previewImages,
              variants: product.variants,
              handle: product.handle,
            }));
            setProducts(transformedProducts);
            setUsingShopify(true);
          }
        }
      } catch (error) {
        console.error('Error loading Shopify products:', error);
        // Keep using fallback products
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Helper to get the top offset of a card relative to the grid container
  const getCardOffset = (idx) => {
    if (!cardRefs.current[idx]) return 0;
    const cardRect = cardRefs.current[idx].getBoundingClientRect();
    const gridRect = cardRefs.current[0]?.parentNode?.getBoundingClientRect();
    return cardRect.top - (gridRect?.top || 0);
  };

  const handleAddToCart = async (product) => {
    if (usingShopify && isShopifyConfigured && product.variants && product.variants.length > 0) {
      // Use Shopify variant ID
      await addToCart(product.variants[0].id, 1);
    } else {
      // For fallback products, show a message
      alert('This is a demo product. Configure Shopify credentials to enable real purchasing!');
    }
  };

  if (loading) {
    return (
      <Layout title="We Got Next - Shop">
        <ShopHero />
        <div className="min-h-screen py-12 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #181818 0%, #232323 100%)' }}>
          <div className="text-white text-xl">Loading products...</div>
        </div>
      </Layout>
    );
  }

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
            {!usingShopify && (
              <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
                <p className="text-blue-200 text-sm">
                  <strong>Demo Mode:</strong> You're viewing sample products. To enable real purchasing, follow the setup guide in <code>SHOPIFY_SETUP.md</code>.
                </p>
              </div>
            )}
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
                  key={product.id || product.name}
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
                      <button 
                        onClick={() => handleAddToCart(product)}
                        disabled={cartLoading}
                        className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors"
                      >
                        {cartLoading ? 'Adding...' : (usingShopify && isShopifyConfigured) ? 'Add to Cart' : 'Demo Product'}
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