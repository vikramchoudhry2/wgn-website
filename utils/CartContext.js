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
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Check if Shopify is configured
      if (!isShopifyConfigured()) {
        console.log('Shopify not configured - running in demo mode');
        dispatch({ type: 'SET_SHOPIFY_AVAILABLE', payload: false });
        return;
      }

      // Check if there's an existing checkout in localStorage
      const existingCheckoutId = localStorage.getItem('shopify_checkout_id');
      
      if (existingCheckoutId) {
        try {
          const existingCheckout = await fetchCheckout(existingCheckoutId);
          if (existingCheckout && !existingCheckout.completedAt) {
            dispatch({ type: 'SET_CHECKOUT', payload: existingCheckout });
            dispatch({ type: 'SET_SHOPIFY_AVAILABLE', payload: true });
            return;
          }
        } catch (error) {
          console.error('Error fetching existing checkout:', error);
        }
      }
      
      // Create new checkout if none exists or existing one is completed
      try {
        const newCheckout = await createCheckout();
        if (newCheckout) {
          localStorage.setItem('shopify_checkout_id', newCheckout.id);
          dispatch({ type: 'SET_CHECKOUT', payload: newCheckout });
          dispatch({ type: 'SET_SHOPIFY_AVAILABLE', payload: true });
        } else {
          throw new Error('Failed to create checkout');
        }
      } catch (error) {
        console.error('Shopify checkout creation failed:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Shopify unavailable - running in demo mode' });
        dispatch({ type: 'SET_SHOPIFY_AVAILABLE', payload: false });
      }
    };

    initializeCheckout();
  }, []);

  const addToCart = async (variantId, quantity = 1) => {
    if (!state.shopifyAvailable || !state.checkout) {
      console.log('Demo mode - cart functionality disabled');
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const lineItemsToAdd = [{
        variantId,
        quantity,
      }];

      const updatedCheckout = await addToCheckout(state.checkout.id, lineItemsToAdd);
      dispatch({ type: 'SET_CHECKOUT', payload: updatedCheckout });
    } catch (error) {
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