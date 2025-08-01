import React, { useState, useEffect } from 'react';
import { useCart } from '@/utils/CartContext';
import Cart from './Cart';

const CartIcon = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartTotal, checkout } = useCart();

  const cartTotal = getCartTotal();

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMobile && checkout && checkout.webUrl) {
      window.open(checkout.webUrl, '_blank');
      return;
    }
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <button
        onClick={handleCartClick}
        className="relative p-3 text-white hover:text-orange-300 transition-all duration-200 active:scale-95 rounded-lg hover:bg-white/10"
        aria-label="Shopping cart"
        type="button"
      >
        <svg
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        {cartTotal > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
            {cartTotal}
          </span>
        )}
      </button>
      {isCartOpen && !isMobile && (
        <Cart isOpen={isCartOpen} onClose={handleCartClose} />
      )}
    </>
  );
};

export default CartIcon; 