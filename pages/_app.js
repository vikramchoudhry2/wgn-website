import 'modern-normalize/modern-normalize.css';
import '@/styles/globals.css';
import '@/styles/fonts.css';
import { CartProvider } from '@/utils/CartContext';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Add a global style for .full-height for mobile viewport consistency
    const style = document.createElement('style');
    style.innerHTML = `.full-height { min-height: 100svh !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
