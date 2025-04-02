// Fun Fact Toggle Functionality
function initFunFactToggle() {
    // Select all sections that need the toggle functionality
    const funFactSections = document.querySelectorAll('.fun-fact-section');

    if (funFactSections.length === 0) {
        console.error("No fun fact sections found for toggle functionality (from fun-fact.js).");
        return; // Exit if no sections found
    }

    funFactSections.forEach(section => {
        // Find the header within the current section
        const header = section.querySelector('.fun-fact-header');
        // Find the content within the current section (though not strictly needed for toggle)
        const content = section.querySelector('.fun-fact-content'); 

        if (header && content) {
            header.addEventListener('click', () => {
                section.classList.toggle('expanded');
                console.log('Section toggled. Expanded:', section.classList.contains('expanded'));
            });
        } else {
            console.error("Header or content not found within a fun-fact-section (from fun-fact.js).");
        }
    });
}

// Magnetic effect for Fun Fact Cards (Skew + Translate + Hover Scale)
function initCardMagneticEffect() {
    const cards = document.querySelectorAll('.fun-fact-card:not(.center-card)');
    const baseTransform = 'skew(-10deg)'; // Base skew for ALL cards
    const hoverScale = 0.98; // Make slightly smaller on hover

    cards.forEach(card => {
        let currentX = 0, currentY = 0;
        let targetX = 0, targetY = 0;
        let currentScale = 1; // Track current scale
        let targetScale = 1; // Target scale (1 or hoverScale)
        let isHovering = false;
        let animationFrameId = null;
        const damping = 0.1;
        const sensitivityFactor = 15;

        function updatePosition() {
            // Smoothly update translation and scale
            currentX += (targetX - currentX) * damping;
            currentY += (targetY - currentY) * damping;
            currentScale += (targetScale - currentScale) * damping;

            // Apply base skew, magnetic translate, and current scale
            let dynamicTransform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
            card.style.transform = `${baseTransform} ${dynamicTransform}`;

            // Continue animating if translation or scale needs adjustment
            if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01 || Math.abs(targetScale - currentScale) > 0.01) {
                animationFrameId = requestAnimationFrame(updatePosition);
            } else {
                // Snap to final state
                 card.style.transform = `${baseTransform} translate(${targetX}px, ${targetY}px) scale(${targetScale})`;
                 cancelAnimationFrame(animationFrameId);
                 animationFrameId = null;
            }
        }

        card.addEventListener('mouseenter', (e) => {
             isHovering = true;
             targetScale = hoverScale; // Set target scale for hover

             // Apply non-transform hover styles immediately
             card.style.filter = 'grayscale(0%)';
             card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
             const computedStyle = getComputedStyle(card);
             const primaryColor = computedStyle.getPropertyValue('--primary-color').trim();
             card.style.backgroundColor = primaryColor || '#343A40';
             card.style.color = 'white';

             // Handle number/info visibility
             const numberEl = card.querySelector('.fact-number');
             const infoEl = card.querySelector('.fact-info');
             if(numberEl) numberEl.style.opacity = '0';
             if(infoEl) infoEl.style.opacity = '1';

             // Start animation
              if (!animationFrameId) {
                 animationFrameId = requestAnimationFrame(updatePosition);
             }
        });

        card.addEventListener('mousemove', (e) => {
            if (!isHovering) return;

            // Update target translation based on mouse position
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            const sensitivity = Math.min(rect.width, rect.height) / sensitivityFactor;
            targetX = mouseX / sensitivity;
            targetY = mouseY / sensitivity;

            // Ensure animation loop is running to apply translation
            if (!animationFrameId) {
                 animationFrameId = requestAnimationFrame(updatePosition);
             }
        });

        card.addEventListener('mouseleave', () => {
            isHovering = false;
            targetX = 0; // Reset target translation
            targetY = 0;
            targetScale = 1; // Reset target scale

             // Reset non-transform styles immediately
             card.style.filter = 'grayscale(100%)';
             card.style.boxShadow = '';
             const computedStyle = getComputedStyle(card);
             const cardBg = computedStyle.getPropertyValue('--card-bg').trim();
             card.style.backgroundColor = cardBg || 'inherit';
             card.style.color = '';

             // Handle number/info visibility reset
             const numberEl = card.querySelector('.fact-number');
             const infoEl = card.querySelector('.fact-info');
             if(numberEl) numberEl.style.opacity = '1';
             if(infoEl) infoEl.style.opacity = '0';

             // Start animation to return to center and scale back up
             if (!animationFrameId) {
                 animationFrameId = requestAnimationFrame(updatePosition);
             }
        });
    });
}

// Initialize the Fun Fact toggle and magnetic effect when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initFunFactToggle();
    initCardMagneticEffect();
}); 