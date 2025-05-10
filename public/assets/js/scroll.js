document.addEventListener('DOMContentLoaded', function() {
  // Original horizontal scroll animation
  const horizontalSections = document.querySelectorAll('.section--horizontal-scroll');
  
  function handleHorizontalScroll() {
    horizontalSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section is from the top of the viewport
      const distanceFromTop = rect.top;
      
      // Only animate when the section is in or near the viewport
      if (distanceFromTop < windowHeight && distanceFromTop > -rect.height) {
        // Calculate the scroll progress (0 to 1)
        const progress = 1 - (distanceFromTop / windowHeight);
        
        // Get the horizontal animation element
        const animation = section.querySelector('.horizontal-animation');
        
        if (animation) {
          // Always move from right to left
          const startPosition = window.innerWidth; // Start from right edge of screen
          const translateX = startPosition * (1 - progress);
          
          // Apply the transform with easing
          animation.style.transform = `translate3d(${translateX}px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
          animation.style.transition = 'transform 0.3s ease-out';
        }
      }
    });
  }

  // New card movement animation
  const horzSection = document.querySelector('.horz-section');
  const horzContent = document.querySelector('.horz-content');
  
  function handleCardMovement() {
    if (!horzSection || !horzContent) return;

    const sectionHeight = horzSection.offsetHeight;
    const contentWidth = horzContent.scrollWidth - window.innerWidth;
    
    const scrollPosition = window.scrollY;
    const sectionTop = horzSection.offsetTop;
    const sectionBottom = sectionTop + sectionHeight;
    
    // Check if we're within the section's scroll range
    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
      const progress = (scrollPosition - sectionTop) / (sectionHeight - window.innerHeight);
      // Multiply by 2.5 to make the movement faster
      const translateX = -contentWidth * progress * 1.5;
      
      horzContent.style.transform = `translateX(${translateX}px)`;
    }
  }

  // Combined scroll handler
  function handleScroll() {
    handleHorizontalScroll();
    handleCardMovement();
    
    // Add smooth scrolling class to body if not already present
    if (!document.body.classList.contains('smooth-scroll')) {
      document.body.classList.add('smooth-scroll');
    }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Initial call to set initial positions
  handleScroll();
  
  // Call handleScroll on window resize to adjust animations
  window.addEventListener('resize', handleScroll);
}); 