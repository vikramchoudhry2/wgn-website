import localFont from 'next/font/local';

export const roxborough = localFont({
  src: [
    {
      path: '../public/fonts/Roxboroughcf-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Roxboroughcf-Regular.woff',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-roxborough',
  display: 'swap',
}); 