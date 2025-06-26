import React, { useState, useEffect } from 'react';
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

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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

  if (isMobile) {
    // --- SIMPLE MOBILE CART ---
    return (
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        width: '100vw', height: '100vh',
        background: '#fff',
        zIndex: 100000,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid #eee' }}>
          <span style={{ fontSize: 22, fontWeight: 700 }}>Cart</span>
          <button onClick={onClose} style={{ fontSize: 28, background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>&times;</button>
        </div>
        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>Your cart is empty</div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                <img src={item.variant.image?.src || '/assets/placeholder.png'} alt={item.title} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, marginRight: 12, border: '1px solid #eee' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{item.title}</div>
                  <div style={{ color: '#666', fontSize: 13 }}>{item.variant.title}</div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>${item.variant.price.amount}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 8 }}>
                  <button onClick={() => updateCartItem(item.id, item.quantity + 1)} disabled={isLoading} style={{ fontSize: 18, width: 28, height: 28, borderRadius: 14, border: '1px solid #ccc', background: '#fafafa', marginBottom: 2 }}>+</button>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{item.quantity}</span>
                  <button onClick={() => updateCartItem(item.id, item.quantity - 1)} disabled={isLoading || item.quantity <= 1} style={{ fontSize: 18, width: 28, height: 28, borderRadius: 14, border: '1px solid #ccc', background: '#fafafa', marginTop: 2 }}>-</button>
                  <button onClick={() => removeFromCart(item.id)} disabled={isLoading} style={{ fontSize: 13, color: '#e00', background: 'none', border: 'none', marginTop: 4, cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Checkout Button */}
        <div style={{ padding: 16, borderTop: '1px solid #eee', background: '#fff' }}>
          <button
            onClick={() => checkout && checkout.webUrl && window.open(checkout.webUrl, '_blank')}
            disabled={isLoading || cartItems.length === 0}
            style={{
              width: '100%',
              padding: '18px 0',
              fontSize: 20,
              fontWeight: 700,
              background: '#ff6600',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              cursor: isLoading || cartItems.length === 0 ? 'not-allowed' : 'pointer',
              opacity: isLoading || cartItems.length === 0 ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Processing...' : `Checkout${cartItems.length ? ` ($${subtotal})` : ''}`}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden" style={{ zIndex: 99999, position: 'fixed' }}>
      {/* Backdrop - only visible on desktop */}
      <div 
        className="absolute inset-0 bg-black/70 transition-opacity duration-300 hidden md:block" 
        onClick={onClose}
        style={{ 
          zIndex: 99999,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(2px)'
        }}
      ></div>
      
      {/* Cart Panel - Always fullscreen on mobile, sidebar on desktop */}
      <div 
        className={`fixed bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          zIndex: 100000,
          backgroundColor: '#fff',
          ...(isMobile
            ? {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                maxWidth: '100vw',
                maxHeight: '100vh',
                position: 'fixed',
              }
            : {
                width: 400,
                right: 0,
                left: 'auto',
                top: 0,
                bottom: 0,
                height: '100vh',
                position: 'fixed',
              }),
        }}
      >
        <div className="flex h-full flex-col" style={{ backgroundColor: '#ffffff' }}>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-8 md:px-4 py-10 md:py-4 bg-gray-50" style={{ backgroundColor: '#f9fafb' }}>
            <h2 className="text-3xl md:text-lg font-bold md:font-medium text-gray-900">
              Shopping Cart {cartTotal > 0 && `(${cartTotal})`}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-4 md:p-2 rounded-xl md:rounded-md hover:bg-gray-100 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="h-10 w-10 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
              <div className="text-center">
                <div className="animate-spin rounded-full h-20 w-20 md:h-8 md:w-8 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-8 md:mt-2 text-xl md:text-sm text-gray-500">Loading cart...</p>
              </div>
            </div>
          )}

          {/* Cart Items */}
          {!isLoading && (
            <div className="flex-1 overflow-y-auto px-8 md:px-4 py-12 md:py-6" style={{ backgroundColor: '#ffffff' }}>
              {cartItems.length === 0 ? (
                <div className="text-center py-20 md:py-12">
                  <svg className="mx-auto h-24 w-24 md:h-12 md:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 className="mt-8 md:mt-2 text-2xl md:text-sm font-semibold md:font-medium text-gray-900">Your cart is empty</h3>
                  <p className="mt-4 md:mt-1 text-lg md:text-sm text-gray-500">Start shopping to add items to your cart.</p>
                </div>
              ) : (
                <div className="space-y-12 md:space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-8 md:space-x-4 bg-white p-6 md:p-0 rounded-2xl md:rounded-none shadow-md md:shadow-none border md:border-none">
                      <div className="h-28 w-28 md:h-16 md:w-16 flex-shrink-0 overflow-hidden rounded-xl md:rounded-md border-2 md:border border-gray-200">
                        <Image
                          src={getCartItemImage(item)}
                          alt={item.title}
                          width={112}
                          height={112}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl md:text-sm font-semibold md:font-medium text-gray-900 mb-2 md:mb-1 leading-tight">{item.title}</h3>
                        <p className="text-base md:text-xs text-gray-500 mb-3 md:mb-1 leading-relaxed">{item.variant.title}</p>
                        <p className="text-2xl md:text-sm font-bold md:font-semibold text-gray-900">
                          ${item.variant.price.amount}
                        </p>
                      </div>
                      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2">
                        <div className="flex items-center space-x-4 md:space-x-2 bg-gray-50 md:bg-transparent rounded-2xl md:rounded-none px-6 py-4 md:px-0 md:py-0 border md:border-none">
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity - 1)}
                            disabled={isLoading || item.quantity <= 1}
                            className="text-gray-400 hover:text-gray-500 disabled:opacity-50 p-3 md:p-1 rounded-full md:rounded-none bg-white md:bg-transparent shadow-lg md:shadow-none border md:border-none"
                          >
                            <svg className="h-8 w-8 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="text-2xl md:text-sm text-gray-900 font-bold md:font-medium min-w-[50px] md:min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity + 1)}
                            disabled={isLoading}
                            className="text-gray-400 hover:text-gray-500 disabled:opacity-50 p-3 md:p-1 rounded-full md:rounded-none bg-white md:bg-transparent shadow-lg md:shadow-none border md:border-none"
                          >
                            <svg className="h-8 w-8 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          disabled={isLoading}
                          className="text-red-400 hover:text-red-500 disabled:opacity-50 p-3 md:p-1 rounded-full md:rounded-none bg-red-50 md:bg-transparent border border-red-200 md:border-none shadow-lg md:shadow-none"
                        >
                          <svg className="h-8 w-8 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
            <div className="border-t-2 md:border-t border-gray-200 px-8 md:px-4 py-12 md:py-6 bg-gray-50 md:bg-white flex flex-col md:block items-center justify-center md:items-stretch md:justify-start" style={{ backgroundColor: 'var(--footer-bg, #f9fafb)' }}>
              <div className="flex justify-between text-2xl md:text-base font-bold md:font-semibold text-gray-900 mb-8 md:mb-4 w-full md:w-auto">
                <p>Subtotal ({cartTotal} items)</p>
                <p>${subtotal}</p>
              </div>
              <div className="flex justify-center w-full md:block">
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-auto md:w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold md:font-semibold py-6 md:py-3 px-12 md:px-4 rounded-2xl md:rounded-lg transition-colors text-2xl md:text-base shadow-xl md:shadow-none border-2 border-orange-600 md:border-none mx-auto"
                >
                  {isLoading ? 'Processing...' : 'Checkout'}
                </button>
              </div>
              <p className="mt-6 md:mt-2 text-center text-base md:text-sm text-gray-500">
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