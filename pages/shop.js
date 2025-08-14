import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import ShopHero from '@/components/ShopHero';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/utils/shopify';
import { useCart } from '@/utils/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'shorts', name: 'Shorts' },
  { id: 'hoodies', name: 'Hoodies' },
  { id: 'tees', name: 'Tees' },
  { id: 'backpacks', name: 'Backpacks' },
  { id: 'essentials', name: 'Essentials' },
];

export default function Shop() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const { addToCart, isLoading: cartLoading, isShopifyConfigured } = useCart();

  // Show email modal after 3 seconds, but only if not already submitted
  useEffect(() => {
    const hasSubmittedEmail = localStorage.getItem('wgn_email_submitted');
    if (!hasSubmittedEmail) {
      const timer = setTimeout(() => {
        setShowEmailModal(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      // Send email to Mailchimp API
      const response = await fetch('/api/mailchimp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        // Mark as submitted
        localStorage.setItem('wgn_email_submitted', 'true');
        setEmailSubmitted(true);
        
        // Close modal after 2 seconds
        setTimeout(() => {
          setShowEmailModal(false);
        }, 2000);
      } else {
        throw new Error(result.message || 'Failed to subscribe');
      }

    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Failed to subscribe. Please try again later.');
    }
  };

  // Set initial category from URL parameter
  useEffect(() => {
    if (router.query.category && categories.some(cat => cat.id === router.query.category)) {
      setSelectedCategory(router.query.category);
    }
  }, [router.query.category]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN && process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
          const shopifyProducts = await fetchProducts();
          if (shopifyProducts && shopifyProducts.length > 0) {
            const transformedProducts = shopifyProducts.map((product) => {
              // Better category detection based on product title and type
              const getProductCategory = (product) => {
                const title = product.title.toLowerCase();
                const productType = product.productType?.toLowerCase() || '';
                const tags = product.tags || [];
                
                // Check title and product type for category keywords
                if (title.includes('short') || productType.includes('short')) {
                  return 'shorts';
                } else if (title.includes('hoodie') || title.includes('sweater') || productType.includes('hoodie')) {
                  return 'hoodies';
                } else if (title.includes('tee') || title.includes('shirt') || title.includes('t-shirt') || productType.includes('shirt')) {
                  return 'tees';
                } else if (title.includes('backpack') || title.includes('bag') || productType.includes('backpack') || productType.includes('bag')) {
                  return 'backpacks';
                } else if (title.includes('pack') || title.includes('accessory') || productType.includes('accessory')) {
                  return 'essentials';
                }
                
                // Fallback: check tags for category match
                const tagCategory = tags.find(tag => 
                  categories.some(cat => cat.id === tag.toLowerCase())
                );
                
                return tagCategory?.toLowerCase() || 'all';
              };
              
              return {
                id: product.id,
                name: product.title,
                description: product.description || 'Premium WeGotNext product',
                price: product.variants[0]?.price ? `$${product.variants[0].price.amount}` : 'Price TBD',
                image: product.images[0]?.src || '/assets/placeholder.jpg',
                previewImages: product.images.slice(0, 3).map(img => img.src),
                badge: product.tags?.includes('new') ? 'New Arrival' : 
                       product.tags?.includes('bestseller') ? 'Best Seller' : 
                       product.tags?.includes('popular') ? 'Popular' : '',
                badgeColor: product.tags?.includes('new') ? 'bg-orange-500' : 
                           product.tags?.includes('bestseller') ? 'bg-orange-400' : 
                           product.tags?.includes('popular') ? 'bg-orange-300' : '',
                variants: product.variants,
                handle: product.handle,
                category: getProductCategory(product),
                colors: (
                  product.options.find(opt => opt.name.toLowerCase() === 'color')?.values.map(
                    v => typeof v === 'string' ? v : v.value
                  ) || ['#000000', '#FFFFFF', '#808080', '#FF6B00']
                ),
              };
            });
            setProducts(transformedProducts);
          }
        }
      } catch (error) {
        console.error('Error loading Shopify products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Get product counts for each category
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return products.length;
    return products.filter(product => product.category === categoryId).length;
  };

  return (
    <Layout title="WeGotNext - Shop">
      <ShopHero />
      
      {/* Category Navigation */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Desktop Categories */}
            <div className="hidden md:flex space-x-8">
              {categories.map((category) => {
                const count = getCategoryCount(category.id);
                // Hide categories with zero count
                if (count === 0 && category.id !== 'all') return null;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? 'text-black border-b-2 border-black'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {category.name} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Filter
              <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M3 12h18M3 20h18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="px-4 py-3 space-y-2">
                {categories.map((category) => {
                  const count = getCategoryCount(category.id);
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setShowFilters(false);
                      }}
                      disabled={count === 0}
                      className={`w-full px-3 py-2 text-sm font-medium rounded-md text-left ${
                        selectedCategory === category.id
                          ? 'bg-gray-100 text-black'
                          : count === 0
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {category.name} ({count})
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : (
          <>
            {!isShopifyConfigured && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <p className="text-blue-700 text-sm">
                  <strong>Demo Mode:</strong> You're viewing sample products. Configure Shopify credentials to enable real purchasing.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 px-4">
                <div className="max-w-md mx-auto">
                  <div className="mb-8">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="heading-card text-gray-900 mb-4">New Collection Dropping Soon</h3>
                    <p className="text-body text-gray-600 mb-8">
                      We're working on something amazing! Follow us on Instagram for exclusive previews and be the first to know when our new gear launches.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <a 
                      href="https://instagram.com/wegotnext" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary btn-lg w-full"
                    >
                      Follow on Instagram
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    
                    <button 
                      onClick={() => setShowEmailModal(true)}
                      className="btn-secondary w-full"
                    >
                      Get Notified When We Launch
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Email Capture Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4"
            onClick={() => setShowEmailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowEmailModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!emailSubmitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay in the Loop! 🏀</h3>
                    <p className="text-gray-600">
                      Get exclusive updates on new drops, academy events, and special offers from WeGotNext.
                    </p>
                  </div>

                  {/* Email Form */}
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="btn-primary w-full"
                    >
                      Get Updates
                    </button>
                  </form>

                  {/* Privacy Note */}
                  <p className="text-xs text-gray-500 text-center mt-4">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </>
              ) : (
                /* Success Message */
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">You're All Set! 🎉</h3>
                  <p className="text-gray-600">
                    Thanks for joining the WeGotNext family. You'll be the first to know about our latest drops and events!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
} 