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
    isLoading,
    isShopifyConfigured,
    error 
  } = useCart();

  // Debug logging when cart opens
  React.useEffect(() => {
    if (isOpen) {
      console.log('🛒 Cart opened');
      console.log('🏪 Shopify configured:', isShopifyConfigured);
      console.log('🛍️ Checkout object:', checkout);
      console.log('📦 Line items:', checkout?.lineItems);
      console.log('📊 Cart total:', getCartTotal());
      console.log('❌ Error state:', error);
    }
  }, [isOpen, checkout, isShopifyConfigured, error]);

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
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div className="flex h-full flex-col relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white">
            <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
            {!isShopifyConfigured ? (
              <div className="text-center py-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <svg className="mx-auto h-12 w-12 text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-sm font-medium text-blue-900">Demo Mode</h3>
                  <p className="text-sm text-blue-700 mt-1">Cart functionality requires Shopify configuration.</p>
                </div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-sm text-gray-500">Start shopping to add items to your cart.</p>
                <button
                  onClick={onClose}
                  className="mt-4 inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={getCartItemImage(item)}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.variant.title}</p>
                      <p className="text-sm font-medium text-gray-900">
                        ${item.variant.price.amount}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCartItem(item.id, item.quantity - 1)}
                        disabled={isLoading || item.quantity <= 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 rounded"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="text-sm text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItem(item.id, item.quantity + 1)}
                        disabled={isLoading}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 rounded"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        disabled={isLoading}
                        className="p-1 text-red-400 hover:text-red-600 disabled:opacity-50 ml-2 rounded"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && isShopifyConfigured && (
            <div className="border-t border-gray-200 px-6 py-4 bg-white">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal ({cartTotal} items)</p>
                <p>${subtotal}</p>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                {isLoading ? 'Processing...' : 'Checkout'}
              </button>
              <p className="mt-2 text-center text-sm text-gray-500">
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