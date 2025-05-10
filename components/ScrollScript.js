import { useEffect } from 'react';

const ScrollScript = () => {
  useEffect(() => {
    // Add smooth scrolling class to body
    document.body.classList.add('smooth-scroll');
    
    const handleScrollAnimations = () => {
      // Add any custom scroll animations here
      
      // Animate elements into view
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      
      animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // If element is in viewport
        if (rect.top < windowHeight * 0.8) {
          element.classList.add('animate-in');
        }
      });
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Initial check
    handleScrollAnimations();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScrollAnimations);
      document.body.classList.remove('smooth-scroll');
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default ScrollScript; 