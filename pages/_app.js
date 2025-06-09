import '@/styles/globals.css';
import '@/styles/fonts.css';
import { CartProvider } from '@/utils/CartContext';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
