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
            
            slide.addEventListener('mousemove', (e) => {
                if (!slide.classList.contains('magnetic-active')) {
                    slide.classList.add('magnetic-active');
                }
                
                // Get the dimensions of the slide
                const rect = slide.getBoundingClientRect();
                
                // Calculate the center of the slide
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Calculate the distance from the cursor to the center
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                
                // Calculate movement intensity (further from center = more movement)
                // Divide by a larger number to reduce sensitivity
                const moveX = mouseX / 15;
                const moveY = mouseY / 15;
                
                // Move the text overlay in the direction of the cursor
                textOverlay.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            // Reset position when mouse leaves
            slide.addEventListener('mouseleave', () => {
                textOverlay.style.transform = 'translate(0, 0)';
                slide.classList.remove('magnetic-active');
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
            
            text.style.webkitTextStroke = '0';
            text.style.textShadow = '0 6px 12px rgba(0, 0, 0, 0.8)';
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
            } else if (window.innerWidth <= 768) {
                text.style.fontSize = '3rem';
            } else if (window.innerWidth <= 992) {
                text.style.fontSize = '4.5rem';
            } else {
                text.style.fontSize = '6rem';
            }
            
            text.style.webkitTextStroke = '2px #fff';
            text.style.textShadow = '0 4px 8px rgba(0, 0, 0, 0.7)';
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

    // Initialize the slider
    if (heroSlides.length > 0) {
        initHeroSlider();
    }
});

// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;
const cursor = document.querySelector('.cursor');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelectorAll('.nav-links a');
const contactForm = document.getElementById('contactForm');
const header = document.querySelector('header');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const showMoreBtn = document.getElementById('show-more-btn');
const hiddenProjects = document.querySelector('.hidden-projects');

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Initialize mobile menu
    initMobileMenu();

    // Initialize custom cursor
    initCustomCursor();

    // Initialize smooth scrolling
    initSmoothScrolling();

    // Initialize form validation
    initFormValidation();

    // Initialize animations
    initAnimations();
    
    // Initialize header shadow on scroll
    initHeaderShadow();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize show more button
    initShowMoreButton();
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize hero slider scroll effect
    initHeroSliderScrollEffect();

    console.log(body.classList);
});

// Theme Toggle Functionality
themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Custom Cursor
function initCustomCursor() {
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-links a');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.opacity = '0.5';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.opacity = '1';
            });
        });
    }
}

// Mobile Menu
function initMobileMenu() {
    // Create mobile menu if it doesn't exist
    if (!document.querySelector('.mobile-menu')) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-menu';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        mobileMenu.appendChild(closeBtn);
        
        // Clone navigation links
        const navLinksContainer = document.querySelector('.nav-links');
        const navLinksClone = navLinksContainer.cloneNode(true);
        navLinksClone.style.display = 'flex';
        navLinksClone.style.flexDirection = 'column';
        navLinksClone.style.alignItems = 'center';
        
        // Ensure the resume button is styled properly in mobile menu
        const resumeBtn = navLinksClone.querySelector('.resume-btn');
        if (resumeBtn) {
            resumeBtn.style.margin = '15px 0 0 0';
        }
        
        mobileMenu.appendChild(navLinksClone);
        document.body.appendChild(mobileMenu);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
        
        // Close mobile menu
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For this demo, we'll just show a success message
                showFormSuccess();
            }
        });
    }
}

// Helper function to show form errors
function showError(input, message) {
    const formGroup = input.parentElement;
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.classList.add('error');
}

// Helper function to remove form errors
function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
    
    input.classList.remove('error');
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show form success message
function showFormSuccess() {
    contactForm.innerHTML = `
        <div class="form-success">
            <i class="fas fa-check-circle"></i>
            <h3>Thank you for your message!</h3>
            <p>I'll get back to you as soon as possible.</p>
        </div>
    `;
}

// Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        observer.observe(header);
        header.classList.add('animate-on-scroll');
    });
    
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        observer.observe(card);
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Header Shadow on Scroll
function initHeaderShadow() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('shadow');
        } else {
            header.classList.remove('shadow');
        }
    });
}

// Scroll to Top Button
function initScrollToTop() {
    // Fix position issues with scroll-to-top button
    if (scrollToTopBtn) {
        scrollToTopBtn.style.position = 'fixed';
        scrollToTopBtn.style.bottom = '30px';
        scrollToTopBtn.style.right = '30px';
        scrollToTopBtn.style.zIndex = '1000';
    }

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        // Show when scrolled down 300px from the top
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Show More Button
function initShowMoreButton() {
    if (showMoreBtn && hiddenProjects) {
        // Check if elements exist
        console.log('Show More Button:', showMoreBtn);
        console.log('Hidden Projects:', hiddenProjects);
        
        showMoreBtn.addEventListener('click', () => {
            console.log('Show More Button clicked');
            hiddenProjects.classList.toggle('visible');
            showMoreBtn.classList.toggle('active');
            
            console.log('Hidden Projects visible:', hiddenProjects.classList.contains('visible'));
            
            // Scroll to the newly visible projects if they're now visible
            if (hiddenProjects.classList.contains('visible')) {
                // Wait for the transition to complete
                setTimeout(() => {
                    const firstHiddenProject = hiddenProjects.querySelector('.project-card');
                    if (firstHiddenProject) {
                        const offsetTop = firstHiddenProject.getBoundingClientRect().top + window.pageYOffset - 120;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }, 300);
            }
        });
    } else {
        console.error('Show More Button or Hidden Projects not found');
        if (!showMoreBtn) console.error('Show More Button not found');
        if (!hiddenProjects) console.error('Hidden Projects not found');
    }
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    
    if (typingElement) {
        const text = typingElement.getAttribute('data-text');
        const typingDelay = 100; // Delay between each character
        const erasingDelay = 50; // Delay when erasing
        const newTextDelay = 2000; // Delay before typing new text
        
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = text.substring(0, charIndex);
            typingElement.textContent = currentText;
            
            // If in deleting state
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }
            
            // If completed typing
            if (!isDeleting && charIndex === text.length) {
                // Set delete to true after a delay
                setTimeout(() => {
                    isDeleting = true;
                }, newTextDelay);
            } else if (isDeleting && charIndex === 0) {
                // Reset after deleting
                isDeleting = false;
            }
            
            // Set timeout for next iteration
            setTimeout(type, isDeleting ? erasingDelay : typingDelay);
        }
        
        // Start the typing animation immediately
        type();
    }
}

// Add CSS for scroll animations
const style = document.createElement('style');

style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-on-scroll.in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    .error-message {
        color: #dc3545;
        font-size: 14px;
        margin-top: 5px;
    }
    
    input.error, textarea.error {
        border-color: #dc3545;
    }
    
    .form-success {
        text-align: center;
        padding: 30px;
    }
    
    .form-success i {
        font-size: 50px;
        color: var(--primary-color);
        margin-bottom: 20px;
    }
    
    .form-success h3 {
        margin-bottom: 10px;
    }
`;
document.head.appendChild(style); 

// Hero Slider Scroll Effect
function initHeroSliderScrollEffect() {
    const heroSliderWrapper = document.querySelector('.hero-slider-wrapper');
    const heroSlider = document.querySelector('.hero-slider');
    const aboutSection = document.querySelector('#about');
    
    if (!heroSliderWrapper || !heroSlider) return;
    
    // Set initial state with slower transitions for smoother fading
    heroSliderWrapper.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)';
    heroSliderWrapper.style.willChange = 'opacity';
    
    let lastScrollY = window.scrollY;
    const heroHeight = heroSliderWrapper.offsetHeight;
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Calculate how much to fade (proportional to scroll)
        const multiplier = window.innerWidth <= 768 ? 0.4 : 0.6;
        const fadeProgress = Math.min(scrollY / (heroHeight * multiplier), 1);
        
        if (scrollY <= heroHeight) {
            // Remove any transform to prevent sliding - only use opacity
            heroSliderWrapper.style.transform = 'none';
            
            // Apply a smoother, slower fade out
            const fadeValue = Math.max(0, 1 - fadeProgress * 0.85);
            heroSliderWrapper.style.opacity = fadeValue;
            
            // If About section exists, still move it up for a nice transition
            if (aboutSection) {
                // Keep the upward movement of about section for spacing
                const upwardMovement = window.innerWidth <= 768 ? 120 : 80;
                aboutSection.style.transform = `translateY(-${Math.min(upwardMovement, fadeProgress * upwardMovement)}px)`;
            }
        } else {
            // Once scrolled past the hero height, hide it completely
            heroSliderWrapper.style.opacity = '0';
            
            // Keep About section at its maximum translation
            if (aboutSection) {
                const upwardMovement = window.innerWidth <= 768 ? 120 : 80;
                aboutSection.style.transform = `translateY(-${upwardMovement}px)`;
            }
        }
        
        // Store the last scroll position to determine direction
        lastScrollY = scrollY;
    });
    
    // Reset position when page is refreshed at the top
    if (window.scrollY === 0) {
        heroSliderWrapper.style.transform = 'none';
        heroSliderWrapper.style.opacity = '1';
        
        if (aboutSection) {
            aboutSection.style.transform = 'translateY(0)';
        }
    }
}

// Slider
let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // Loop to last slide
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0; // Loop to first slide
    }

    const sliderTrack = document.querySelector('.slider-track');
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.animate-fade-in');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Add active class
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        observer.observe(element); // Start observing each element
    });
});

// Intro Slides Functionality
document.addEventListener('DOMContentLoaded', function() {
    const introSlides = document.querySelector('.intro-slides');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const body = document.body;
    
    // Check if user has seen intro and when
    const lastIntroTime = localStorage.getItem('lastIntroTime');
    const currentTime = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
    
    // Initial setup
    let currentSlide = 0;
    let isScrolling = false;
    let touchStartY = 0;
    let touchEndY = 0;
    let introComplete = false;

    // Skip intro if user has seen it within the last 5 minutes
    if (lastIntroTime && (currentTime - parseInt(lastIntroTime)) < fiveMinutes) {
        skipIntro();
    } else {
        // Show intro and add active class to first slide
        slides[0].classList.add('active');
        body.classList.add('no-scroll', 'slides-active');

        // Set up wheel event for desktop
        window.addEventListener('wheel', handleWheel, { passive: false });
        
        // Set up touch events for mobile
        document.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    // Handle clicking on dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            if (isScrolling) return;
            const targetIndex = parseInt(dot.getAttribute('data-index'));
            goToSlide(targetIndex);
        });
    });

    function handleWheel(e) {
        if (introComplete) return;
        
        e.preventDefault();
        
        if (isScrolling) return;
        
        // Determine scroll direction
        if (e.deltaY > 0) {
            // Scrolling down
            nextSlide();
        } else if (e.deltaY < 0 && currentSlide > 0) {
            // Scrolling up (only if not on first slide)
            prevSlide();
        }
    }
    
    function handleTouchStart(e) {
        if (introComplete) return;
        touchStartY = e.touches[0].clientY;
    }
    
    function handleTouchMove(e) {
        if (introComplete) return;
        e.preventDefault(); // Prevent page scroll while in intro
    }
    
    function handleTouchEnd(e) {
        if (introComplete || isScrolling) return;
        
        touchEndY = e.changedTouches[0].clientY;
        
        // Calculate swipe direction
        const direction = touchStartY - touchEndY;
        
        if (direction > 50) {
            // Swipe up (move down)
            nextSlide();
        } else if (direction < -50 && currentSlide > 0) {
            // Swipe down (move up)
            prevSlide();
        }
    }
    
    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            goToSlide(currentSlide + 1);
        } else if (currentSlide === slides.length - 1) {
            completeIntro();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    }
    
    function goToSlide(index) {
        if (isScrolling || index === currentSlide) return;
        
        isScrolling = true;
        
        // Remove active class from current slide and add to target slide
        slides[currentSlide].classList.remove('active');
        slides[index].classList.add('active');
        
        // Update dots
        dots[currentSlide].classList.remove('active');
        dots[index].classList.add('active');
        
        // Move slides
        for (let i = 0; i < slides.length; i++) {
            if (i < index) {
                slides[i].style.transform = 'translateY(-100vh)';
            } else if (i > index) {
                slides[i].style.transform = 'translateY(0)';
            } else {
                slides[i].style.transform = 'translateY(0)';
            }
        }
        
        // Update current slide
        currentSlide = index;
        
        // Reset isScrolling after transition
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
    
    function completeIntro() {
        if (introComplete) return;
        
        introComplete = true;
        isScrolling = true;
        
        // Save the current timestamp
        localStorage.setItem('lastIntroTime', Date.now().toString());
        
        // Prep the main content before showing it
        document.querySelector('.container').style.opacity = '0';
        document.querySelector('header').style.opacity = '0';
        
        // Add transition classes
        body.classList.remove('slides-active');
        body.classList.add('slides-complete');
        
        // Animate last slide off-screen
        slides[currentSlide].style.transform = 'translateY(-100vh)';
        
        // After transition completes
        setTimeout(() => {
            // Add intro-completed class to hide slides
            introSlides.classList.add('intro-completed');
            
            // Remove wheel event handler
            window.removeEventListener('wheel', handleWheel);
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            
            // Ensure main content is ready and scroll to top
            document.querySelector('.container').style.opacity = '1';
            document.querySelector('header').style.opacity = '1';
            
            // Ensure header is positioned correctly
            document.querySelector('header').style.position = 'fixed';
            document.querySelector('header').style.top = '0';
            document.querySelector('header').style.left = '0';
            document.querySelector('header').style.width = '100%';
            document.querySelector('header').style.zIndex = '1000';
            
            window.scrollTo(0, 0);
            
            // Small delay before removing no-scroll to ensure everything is in place
            setTimeout(() => {
                body.classList.remove('no-scroll');
                isScrolling = false;
            }, 100);
            
        }, 1000);
    }

    // New function to skip intro
    function skipIntro() {
        introComplete = true;
        
        // Hide intro slides immediately
        introSlides.classList.add('intro-completed');
        body.classList.remove('no-scroll', 'slides-active');
        body.classList.add('slides-complete');
        
        // Show main content
        document.querySelector('.container').style.opacity = '1';
        document.querySelector('header').style.opacity = '1';
        
        // Ensure header is positioned correctly
        document.querySelector('header').style.position = 'fixed';
        document.querySelector('header').style.top = '0';
        document.querySelector('header').style.left = '0';
        document.querySelector('header').style.width = '100%';
        document.querySelector('header').style.zIndex = '1000';
        
        // Remove event listeners
        window.removeEventListener('wheel', handleWheel);
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    }
});