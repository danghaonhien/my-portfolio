// Large Text Intro Animation
document.addEventListener('DOMContentLoaded', function() {
    const largeTextIntro = document.querySelector('.large-text-intro');
    
    if (!largeTextIntro) return;
    
    // Immediately activate on mobile devices but still maintain the delay effect
    if (window.innerWidth <= 768) {
        largeTextIntro.classList.add('active');
        largeTextIntro.style.opacity = 1;
        
        // Make sure the first line is visible immediately
        const heading = largeTextIntro.querySelector('h2');
        if (heading) {
            heading.style.opacity = 1;
        }
        
        return;
    }
    
    // Initial check on page load
    handleScrollAnimation();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Check on resize to handle orientation changes
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            largeTextIntro.classList.add('active');
            largeTextIntro.style.opacity = 1;
            
            // Make sure the first line is visible immediately
            const heading = largeTextIntro.querySelector('h2');
            if (heading) {
                heading.style.opacity = 1;
            }
        } else {
            handleScrollAnimation();
        }
    });
    
    function handleScrollAnimation() {
        // For desktop only
        if (window.innerWidth <= 768) {
            largeTextIntro.classList.add('active');
            largeTextIntro.style.opacity = 1;
            return;
        }
        
        const rect = largeTextIntro.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // More generous viewport check (90% of viewport height)
        if (rect.top < windowHeight * 0.90 && rect.bottom > 0) {
            largeTextIntro.classList.add('active');
            
            // Smoother opacity transition for the container
            let scrollProgress = 1 - Math.max(0, Math.abs(rect.top)) / (windowHeight * 0.8);
            scrollProgress = Math.max(0.1, Math.min(1, scrollProgress));
            
            largeTextIntro.style.opacity = scrollProgress;
        } else {
            // Don't completely hide it
            largeTextIntro.classList.remove('active');
            largeTextIntro.style.opacity = 0.1;
        }
    }
}); 