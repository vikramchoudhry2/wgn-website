import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';
import { roxborough } from '@/utils/fonts';

const Layout = ({ children, title = 'We Got Next' }) => {
  useEffect(() => {
    // Add smooth scroll class to body
    document.body.classList.add('smooth-scroll');
    
    return () => {
      document.body.classList.remove('smooth-scroll');
    };
  }, []);
  
  return (
    <div className={`${roxborough.variable}`}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="We Got Next - Basketball Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout; 