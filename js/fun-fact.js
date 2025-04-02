// Fun Fact Toggle Functionality
function initFunFactToggle() {
    const funFactSection = document.querySelector('.fun-fact-section');
    const funFactHeader = document.querySelector('.fun-fact-header');
    const funFactContent = document.querySelector('.fun-fact-content');

    if (funFactHeader && funFactContent && funFactSection) {
        funFactHeader.addEventListener('click', () => {
            funFactSection.classList.toggle('expanded');
            console.log('Fun Fact toggled (from fun-fact.js). Expanded:', funFactSection.classList.contains('expanded'));
        });
    } else {
        console.error("Fun Fact elements not found for toggle functionality (from fun-fact.js).");
    }
}

// Magnetic effect for Fun Fact Cards
function initCardMagneticEffect() {
    const cards = document.querySelectorAll('.fun-fact-card:not(.center-card)');
    const baseTransform = 'skew(-10deg)'; // Base skew for all cards
    const hoverRotateScale = 'rotateY(10deg) rotateX(5deg) scale(1.05)'; // Additional transforms on hover

    cards.forEach(card => {
        let currentX = 0, currentY = 0;
        let targetX = 0, targetY = 0;
        let isHovering = false;
        let animationFrameId = null;
        const damping = 0.1;
        const sensitivityFactor = 15;

        function updatePosition() {
            currentX += (targetX - currentX) * damping;
            currentY += (targetY - currentY) * damping;

            // Combine base skew, magnetic translate, and hover transforms (if hovering)
            let dynamicTransform = `translate(${currentX}px, ${currentY}px)`;
            if (isHovering) {
                 card.style.transform = `${baseTransform} ${dynamicTransform} ${hoverRotateScale}`;
            } else {
                 card.style.transform = `${baseTransform} ${dynamicTransform}`; // Only skew and translate when leaving
            }


            // Continue animating if needed
            if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
                animationFrameId = requestAnimationFrame(updatePosition);
            } else {
                // Snap to final state
                 if (isHovering) {
                    card.style.transform = `${baseTransform} translate(${targetX}px, ${targetY}px) ${hoverRotateScale}`;
                 } else {
                     card.style.transform = `${baseTransform} translate(${targetX}px, ${targetY}px)`; // Snap back to just skew
                 }
                 cancelAnimationFrame(animationFrameId);
                 animationFrameId = null;
            }
        }

        card.addEventListener('mouseenter', (e) => { // Changed from mousemove for hover state logic
             isHovering = true;
              // Apply non-transform hover styles immediately
             card.style.filter = 'grayscale(0%)';
             card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
             // Get computed primary color for hover background
             const computedStyle = getComputedStyle(card);
             const primaryColor = computedStyle.getPropertyValue('--primary-color').trim();
             card.style.backgroundColor = primaryColor || '#343A40'; // Fallback if CSS var fails
             card.style.color = 'white';

             // Handle number/info visibility
             const numberEl = card.querySelector('.fact-number');
             const infoEl = card.querySelector('.fact-info');
             if(numberEl) numberEl.style.opacity = '0';
             if(infoEl) infoEl.style.opacity = '1';

             // Start animation (mousemove will update targetX/Y)
              if (!animationFrameId) {
                 animationFrameId = requestAnimationFrame(updatePosition);
             }
        });


        card.addEventListener('mousemove', (e) => {
            if (!isHovering) return; // Only track movement while hovering

            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const sensitivity = Math.min(rect.width, rect.height) / sensitivityFactor;
            targetX = mouseX / sensitivity;
            targetY = mouseY / sensitivity;

            // Ensure animation loop is running
            if (!animationFrameId) {
                 animationFrameId = requestAnimationFrame(updatePosition);
             }
        });

        card.addEventListener('mouseleave', () => {
            isHovering = false;
            targetX = 0;
            targetY = 0;

             // Reset non-transform styles immediately
             card.style.filter = 'grayscale(100%)';
             card.style.boxShadow = ''; // Reset to default CSS shadow
             // Reset background and color
             const computedStyle = getComputedStyle(card);
             const cardBg = computedStyle.getPropertyValue('--card-bg').trim();
             card.style.backgroundColor = cardBg || 'inherit'; // Reset to default
             card.style.color = ''; // Reset to default

              // Handle number/info visibility reset
             const numberEl = card.querySelector('.fact-number');
             const infoEl = card.querySelector('.fact-info');
             if(numberEl) numberEl.style.opacity = '1';
             if(infoEl) infoEl.style.opacity = '0';

            // Start animation to move back to center
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