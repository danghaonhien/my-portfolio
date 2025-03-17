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
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        const halfPageHeight = document.documentElement.scrollHeight / 2;
        
        if (window.scrollY > halfPageHeight) {
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