import React, { useState } from 'react';
import { useCart } from '@/utils/CartContext';
import Cart from './Cart';

const CartIcon = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartTotal } = useCart();

  const cartTotal = getCartTotal();

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-2 text-white hover:text-orange-300 transition-colors"
        aria-label="Shopping cart"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        {cartTotal > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartTotal}
          </span>
        )}
      </button>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default CartIcon; 