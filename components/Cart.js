import React, { useState } from 'react';
import { useCart } from '@/utils/CartContext';
import Image from 'next/image';

const Cart = ({ isOpen, onClose }) => {
  const { 
    checkout, 
    updateCartItem, 
    removeFromCart, 
    getCartTotal, 
    getCartSubtotal,
    isLoading 
  } = useCart();

  console.log('Cart component rendered with isOpen:', isOpen);
  console.log('Cart checkout state:', checkout);

  // Color-to-image mapping for cart display
  const getCartItemImage = (item) => {
    const productTitle = item.title.toLowerCase();
    const variantTitle = item.variant.title.toLowerCase();
    
    // Parse variant title to extract color - matches ProductCard logic
    const parseVariantTitle = (title) => {
      const parts = title.split(' / ');
      if (productTitle.includes('short')) {
        // Shorts format: "l / white / blue" -> color="white / blue"
        return parts.length > 2 ? `${parts[1]} / ${parts[2]}` : parts[1];
      } else {
        // Hoodie format: "l / army green" -> color="army green"
        return parts[1];
      }
    };

    const color = parseVariantTitle(variantTitle);
    
    if (productTitle.includes('hoodie') && color) {
      const hoodieImages = {
        'mustard': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/ScreenShot2022-02-14at9.01.19PM.png',
        'black': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/anamika_black.png',
        'pale pink': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/Salmon_Pink.png',
        'pink': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/anamika_pink.png',
        'chestnut': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/chestnut_brown.png',
        'army green': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/olive_green.png',
        'heather grey': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/heather_gray.png',
        'blue mist': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/blue_mist.png',
      };
      const imageUrl = hoodieImages[color.toLowerCase()];
      return imageUrl || item.variant.image?.src;
    }
    
    if (productTitle.includes('short') && color) {
      const shortsImages = {
        'white / red': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/files/red_white_shorts.jpg',
        'white / blue': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/files/white_blue_shorts.jpg',
        'yellow / blue': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/files/blue_yellow_shorts.jpg',
        'black / gold': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/files/black_shorts.jpg',
      };
      const imageUrl = shortsImages[color.toLowerCase()];
      return imageUrl || item.variant.image?.src;
    }
    
    // Fallback to variant image or placeholder
    return item.variant.image?.src || '/assets/placeholder.png';
  };

  const handleCheckout = () => {
    if (checkout && checkout.webUrl) {
      window.open(checkout.webUrl, '_blank');
    }
  };

  if (!isOpen) return null;

  const cartItems = checkout?.lineItems || [];
  const cartTotal = getCartTotal();
  const subtotal = getCartSubtotal();

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden" style={{ zIndex: 99999, position: 'fixed' }}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 transition-opacity duration-300" 
        onClick={onClose}
        style={{ 
          zIndex: 99999,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(2px)'
        }}
      ></div>
      
      {/* Cart Panel */}
      <div 
        className={`fixed right-0 top-0 h-screen w-full sm:max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          zIndex: 100000,
          backgroundColor: '#ffffff',
          boxShadow: '-10px 0 25px -5px rgba(0, 0, 0, 0.3)',
          border: 'none',
          opacity: 1,
          height: '100vh',
          minHeight: '100vh',
          maxWidth: '100vw'
        }}
      >
        <div className="flex h-full flex-col w-full" style={{ backgroundColor: '#ffffff' }}>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-3 sm:px-4 py-4 sm:py-6 bg-gray-50" style={{ backgroundColor: '#f9fafb' }}>
            <h2 className="text-base sm:text-lg font-medium text-gray-900">
              Shopping Cart {cartTotal > 0 && `(${cartTotal})`}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex-1 flex items-center justify-center px-3 sm:px-4" style={{ backgroundColor: '#ffffff' }}>
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-500">Loading cart...</p>
              </div>
            </div>
          )}

          {/* Cart Items */}
          {!isLoading && (
            <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6" style={{ backgroundColor: '#ffffff' }}>
              {cartItems.length === 0 ? (
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                  <p className="mt-1 text-sm text-gray-500">Start shopping to add items to your cart.</p>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 sm:space-x-4">
                      <div className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={getCartItemImage(item)}
                          alt={item.title}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{item.variant.title}</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">
                          ${item.variant.price.amount}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <button
                          onClick={() => updateCartItem(item.id, item.quantity - 1)}
                          disabled={isLoading || item.quantity <= 1}
                          className="text-gray-400 hover:text-gray-500 disabled:opacity-50 p-1"
                        >
                          <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="text-xs sm:text-sm text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItem(item.id, item.quantity + 1)}
                          disabled={isLoading}
                          className="text-gray-400 hover:text-gray-500 disabled:opacity-50 p-1"
                        >
                          <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          disabled={isLoading}
                          className="text-red-400 hover:text-red-500 disabled:opacity-50 ml-1 sm:ml-2 p-1"
                        >
                          <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 px-3 sm:px-4 py-4 sm:py-6" style={{ backgroundColor: '#ffffff' }}>
              <div className="flex justify-between text-sm sm:text-base font-medium text-gray-900 mb-3 sm:mb-4">
                <p>Subtotal ({cartTotal} items)</p>
                <p>${subtotal}</p>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
              >
                {isLoading ? 'Processing...' : 'Checkout'}
              </button>
              <p className="mt-2 text-center text-xs sm:text-sm text-gray-500">
                Secure checkout powered by Shopify
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart; 