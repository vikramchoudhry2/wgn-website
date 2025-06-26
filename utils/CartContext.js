import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { createCheckout, addToCheckout, updateCheckout, removeFromCheckout, fetchCheckout } from './shopify';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHECKOUT':
      return {
        ...state,
        checkout: action.payload,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'SET_SHOPIFY_AVAILABLE':
      return {
        ...state,
        shopifyAvailable: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

const initialState = {
  checkout: null,
  isLoading: false,
  error: null,
  shopifyAvailable: false,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Check if Shopify is properly configured
  const isShopifyConfigured = () => {
    return !!(
      process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN && 
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    );
  };

  // Initialize checkout on mount
  useEffect(() => {
    const initializeCheckout = async () => {
      console.log('🚀 Initializing cart checkout...');
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Check if Shopify is configured
      if (!isShopifyConfigured()) {
        console.log('❌ Shopify not configured - running in demo mode');
        console.log('   Domain:', process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN);
        console.log('   Token:', process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'Present' : 'Missing');
        dispatch({ type: 'SET_SHOPIFY_AVAILABLE', payload: false });
        return;
      }

      console.log('✅ Shopify is configured, creating checkout...');

      // Check if there's an existing checkout in localStorage
      const existingCheckoutId = localStorage.getItem('shopify_checkout_id');
      
      if (existingCheckoutId) {
        console.log('🔍 Found existing checkout ID:', existingCheckoutId);
        try {
          const existingCheckout = await fetchCheckout(existingCheckoutId);
          if (existingCheckout && !existingCheckout.completedAt) {
            console.log('✅ Using existing checkout:', existingCheckout.id);
            console.log('📦 Existing cart items:', existingCheckout.lineItems?.length || 0);
            dispatch({ type: 'SET_CHECKOUT', payload: existingCheckout });
            dispatch({ type: 'SET_SHOPIFY_AVAILABLE', payload: true });
            return;
          } else {
            console.log('⚠️ Existing checkout is completed or invalid, creating new one');
            localStorage.removeItem('shopify_checkout_id');
          }
        } catch (error) {
          console.error('❌ Error fetching existing checkout:', error);
          localStorage.removeItem('shopify_checkout_id');
        }
      }
      
      // Create new checkout if none exists or existing one is completed
      try {
        console.log('🆕 Creating new checkout...');
        const newCheckout = await createCheckout();
        if (newCheckout && newCheckout.id) {
          console.log('✅ New checkout created:', newCheckout.id);
          localStorage.setItem('shopify_checkout_id', newCheckout.id);
          dispatch({ type: 'SET_CHECKOUT', payload: newCheckout });
          dispatch({ type: 'SET_SHOPIFY_AVAILABLE', payload: true });
        } else {
          throw new Error('Failed to create checkout - no ID returned');
        }
      } catch (error) {
        console.error('❌ Shopify checkout creation failed:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Shopify unavailable - running in demo mode' });
        dispatch({ type: 'SET_SHOPIFY_AVAILABLE', payload: false });
      }
    };

    initializeCheckout();
  }, []);

  const addToCart = async (variantId, quantity = 1) => {
    console.log('🛒 addToCart called with:', { variantId, quantity });
    console.log('🏪 Shopify available:', state.shopifyAvailable);
    console.log('🛍️ Current checkout:', state.checkout?.id);
    
    if (!state.shopifyAvailable || !state.checkout) {
      console.log('❌ Demo mode - cart functionality disabled');
      console.log('   - Shopify available:', state.shopifyAvailable);
      console.log('   - Checkout exists:', !!state.checkout);
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const lineItemsToAdd = [{
        variantId,
        quantity,
      }];

      console.log('📦 Adding line items:', lineItemsToAdd);
      const updatedCheckout = await addToCheckout(state.checkout.id, lineItemsToAdd);
      console.log('✅ Updated checkout received:', updatedCheckout);
      
      if (updatedCheckout && updatedCheckout.lineItems) {
        console.log('📦 New cart items count:', updatedCheckout.lineItems.length);
        console.log('📦 Line items:', updatedCheckout.lineItems);
      }
      
      dispatch({ type: 'SET_CHECKOUT', payload: updatedCheckout });
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const updateCartItem = async (lineItemId, quantity) => {
    if (!state.shopifyAvailable || !state.checkout) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const lineItemsToUpdate = [{
        id: lineItemId,
        quantity,
      }];

      const updatedCheckout = await updateCheckout(state.checkout.id, lineItemsToUpdate);
      dispatch({ type: 'SET_CHECKOUT', payload: updatedCheckout });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const removeFromCart = async (lineItemId) => {
    if (!state.shopifyAvailable || !state.checkout) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const updatedCheckout = await removeFromCheckout(state.checkout.id, [lineItemId]);
      dispatch({ type: 'SET_CHECKOUT', payload: updatedCheckout });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const getCartTotal = () => {
    if (!state.checkout || !state.checkout.lineItems) return 0;
    return state.checkout.lineItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    if (!state.checkout || !state.checkout.subtotalPrice) return '0.00';
    return state.checkout.subtotalPrice.amount;
  };

  const value = {
    ...state,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartTotal,
    getCartSubtotal,
    isShopifyConfigured: state.shopifyAvailable,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 