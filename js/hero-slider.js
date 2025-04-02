// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroPrevBtn = document.querySelector('.hero-prev-btn');
    const heroNextBtn = document.querySelector('.hero-next-btn');
    let currentHeroSlide = 0;
    const totalHeroSlides = heroSlides.length;
    const heroSliderContainer = document.querySelector('.hero-slider');
    
    // Magnetic text effect
    function initMagneticEffect() {
        heroSlides.forEach(slide => {
            const textOverlay = slide.querySelector('.hero-text-overlay');
            
            if (!textOverlay) return;
            
            // Track previous positions for smooth damping
            let currentX = 0, currentY = 0;
            let targetX = 0, targetY = 0;
            let animationFrameId = null;
            
            function updatePosition() {
                // Apply damping for smoother movement
                const damping = 0.12; // Increased from 0.12 for more responsiveness
                
                // Calculate damped movement
                currentX = currentX + (targetX - currentX) * damping;
                currentY = currentY + (targetY - currentY) * damping;
                
                // Apply transform with smooth values
                textOverlay.style.transform = `translate(${currentX}px, ${currentY}px)`;
                
                // Continue animation loop
                animationFrameId = requestAnimationFrame(updatePosition);
            }
            
            slide.addEventListener('mousemove', (e) => {
                if (!slide.classList.contains('magnetic-active')) {
                    slide.classList.add('magnetic-active');
                    // Start animation loop
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = requestAnimationFrame(updatePosition);
                }
                
                // Get the dimensions of the slide
                const rect = slide.getBoundingClientRect();
                
                // Calculate the center of the slide
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Calculate the distance from the cursor to the center
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                
                // Calculate movement intensity with improved sensitivity
                // Divide by a larger number for smaller movements or smaller number for larger movements
                const sensitivity = Math.min(rect.width, rect.height) / 75; // Decreased divisor from 25 to increase range
                targetX = mouseX / sensitivity;
                targetY = mouseY / sensitivity;
            });
            
            // Reset position when mouse leaves
            slide.addEventListener('mouseleave', () => {
                // Smoothly return to center
                targetX = 0;
                targetY = 0;
                
                // Stop animation after transition completes
                setTimeout(() => {
                    cancelAnimationFrame(animationFrameId);
                    currentX = 0;
                    currentY = 0;
                    textOverlay.style.transform = 'translate(0, 0)';
                    slide.classList.remove('magnetic-active');
                }, 300);
            });
        });
    }
    
    // Define these functions at the parent scope so they can be accessed by the navigation buttons
    function handleInteraction(slide) {
        const text = slide.querySelector('.hero-text-overlay');
        const caption = slide.querySelector('.hero-text-caption');
        const img = slide.querySelector('.hero-slide-image img');
        
        if (text && img) {
            // Responsive font size based on screen width
            if (window.innerWidth <= 480) {
                text.style.fontSize = '2.5rem';
            } else if (window.innerWidth <= 768) {
                text.style.fontSize = '3.5rem';
            } else if (window.innerWidth <= 992) {
                text.style.fontSize = '5rem';
            } else {
                text.style.fontSize = '7rem';
            }
            
            // On hover, change to solid white with simple shadow
            text.style.color = '#fff';
            text.style.textShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
            
            img.style.transform = 'scale(1)';
            img.style.filter = 'blur(3px)';
        }
        
        if (caption) {
            caption.style.opacity = '1';
            caption.style.transform = 'translateY(-5px)';
            caption.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.8)';
        }
    }
    
    function resetInteraction(slide) {
        const text = slide.querySelector('.hero-text-overlay');
        const caption = slide.querySelector('.hero-text-caption');
        const img = slide.querySelector('.hero-slide-image img');
        
        if (text && img) {
            // Responsive font size based on screen width
            if (window.innerWidth <= 480) {
                text.style.fontSize = '2.2rem';
                text.style.textShadow = '-0.5px -0.5px 0 #fff, 0.5px -0.5px 0 #fff, -0.5px 0.5px 0 #fff, 0.5px 0.5px 0 #fff, -1px 0 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, 0 1px 0 #fff, 1px 1px 2px rgba(0,0,0,0.1)';
            } else if (window.innerWidth <= 768) {
                text.style.fontSize = '3rem';
                text.style.textShadow = '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, -1.5px 0 0 #fff, 1.5px 0 0 #fff, 0 -1.5px 0 #fff, 0 1.5px 0 #fff, 2px 2px 4px rgba(0,0,0,0.1)';
            } else if (window.innerWidth <= 992) {
                text.style.fontSize = '4.5rem';
                text.style.textShadow = '-1.5px -1.5px 0 #fff, 1.5px -1.5px 0 #fff, -1.5px 1.5px 0 #fff, 1.5px 1.5px 0 #fff, -2px 0 0 #fff, 2px 0 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff, 3px 3px 6px rgba(0,0,0,0.1)';
            } else {
                text.style.fontSize = '6rem';
                text.style.textShadow = '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, -3px 0 0 #fff, 3px 0 0 #fff, 0 -3px 0 #fff, 0 3px 0 #fff, 4px 4px 8px rgba(0,0,0,0.1)';
            }
            
            text.style.color = 'transparent';
            
            img.style.transform = 'scale(1.05)';
            img.style.filter = 'blur(0)';
        }
        
        if (caption) {
            caption.style.opacity = '0.9';
            caption.style.transform = 'translateY(0)';
            caption.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.7)';
        }
    }

    // Initialize the hero slider
    function initHeroSlider() {
        // Show the first slide
        updateHeroSlider();

        // Initialize the magnetic effect
        initMagneticEffect();

        // Add event listeners to navigation buttons
        if (heroPrevBtn) {
            heroPrevBtn.addEventListener('click', showPrevHeroSlide);
        }
        
        if (heroNextBtn) {
            heroNextBtn.addEventListener('click', showNextHeroSlide);
        }

        // Add resize event listener to adjust font sizes when screen size changes
        window.addEventListener('resize', function() {
            // Apply current interaction state based on current slide
            const currentSlide = heroSlides[currentHeroSlide];
            if (currentSlide) {
                resetInteraction(currentSlide);
            }
            
            // Reset all slides on mobile to ensure clean state
            if (window.innerWidth <= 768) {
                heroSlides.forEach(slide => {
                    resetInteraction(slide);
                });
            }
        });

        // Add hover effects to slides for better text visibility
        heroSlides.forEach(slide => {
            // Mouse events for desktop only
            if (window.innerWidth > 768) {
                slide.addEventListener('mouseenter', function(e) {
                    // Only trigger hover effect if not hovering over navigation
                    if (!e.target.closest('.hero-slider-navigation')) {
                        handleInteraction(this);
                    }
                });
                
                slide.addEventListener('mouseleave', function(e) {
                    // Only reset if not entering navigation elements
                    if (!e.relatedTarget || !e.relatedTarget.closest('.hero-slider-navigation')) {
                        resetInteraction(this);
                    }
                });
            }
            
            // Touch events for mobile - simplified to prevent scroll blocking
            slide.addEventListener('touchstart', function(e) {
                // Prevent hover effects on mobile completely
                if (window.innerWidth <= 768) {
                    // Don't call preventDefault to allow scrolling
                    return;
                }
                
                // Only for larger screens, if needed
                if (e.target.closest('.hero-slider-navigation') === null) {
                    e.preventDefault();
                    handleInteraction(this);
                    
                    setTimeout(() => {
                        resetInteraction(this);
                    }, 3000);
                }
            });
        });
        
        // Add mouseout event to parent container for touch devices
        if (heroSliderContainer) {
            heroSliderContainer.addEventListener('touchstart', function(e) {
                // If touching outside the current slide, reset all slides
                if (!e.target.closest('.hero-slide')) {
                    heroSlides.forEach(s => {
                        resetInteraction(s);
                    });
                }
            });
        }
    }

    // Update the slider to show the current slide
    function updateHeroSlider() {
        // Hide all slides
        heroSlides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
        });

        // Show current slide
        heroSlides[currentHeroSlide].style.opacity = '1';
        heroSlides[currentHeroSlide].style.zIndex = '2';
    }

    // Show the previous slide
    function showPrevHeroSlide() {
        // Reset current slide to default state
        resetInteraction(heroSlides[currentHeroSlide]);
        
        // Update slide index
        currentHeroSlide = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
        updateHeroSlider();
    }

    // Show the next slide
    function showNextHeroSlide() {
        // Reset current slide to default state
        resetInteraction(heroSlides[currentHeroSlide]);
        
        // Update slide index
        currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
        updateHeroSlider();
    }

    // Auto-rotate slides every 5 seconds
    let heroSlideInterval = setInterval(showNextHeroSlide, 5000);

    // Pause auto-rotation on hover
    if (heroSliderContainer) {
        heroSliderContainer.addEventListener('mouseenter', () => {
            clearInterval(heroSlideInterval);
        });

        heroSliderContainer.addEventListener('mouseleave', () => {
            heroSlideInterval = setInterval(showNextHeroSlide, 5000);
        });
    }

    // Initialize the slider if slides exist
    if (heroSlides.length > 0) {
        initHeroSlider();
    } else {
        console.warn("No hero slides found to initialize the slider.");
    }

    // Note: Removed console.log(body.classList); as body is not defined here
}); 