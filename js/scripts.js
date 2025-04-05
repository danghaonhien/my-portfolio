// --- Text Shuffle Effect ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function shuffleText(event) {
    let interval = null;
    const target = event.target;
    const originalText = target.dataset.originalValue || target.innerText;
    target.dataset.originalValue = originalText; // Store original text if not already stored

    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
        target.innerText = originalText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                    return originalText[index];
                }
                // Preserve space character
                if (letter === ' ') {
                    return ' ';
                }
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");

        if(iteration >= originalText.length){
            clearInterval(interval);
            target.innerText = originalText; // Ensure it resets perfectly
        }

        iteration += 1 / 3; // Controls the speed of the reveal
    }, 40); // Controls the speed of the shuffle updates
}

// Apply shuffle effect to specific section headers
document.addEventListener('DOMContentLoaded', () => {
    // ... potentially other DOMContentLoaded code ...

    const aboutHeader = document.querySelector('#about .section-header h2');
    const workHeader = document.querySelector('#work .section-header h2');

    if (aboutHeader) {
        aboutHeader.addEventListener('mouseover', shuffleText);
        // Optional: Reset on mouseout if desired, otherwise it completes
        // aboutHeader.addEventListener('mouseout', (event) => {
        //     clearInterval(interval); // Need to manage interval state if using mouseout reset
        //     event.target.innerText = event.target.dataset.originalValue;
        // });
    }

    if (workHeader) {
        workHeader.addEventListener('mouseover', shuffleText);
        // Optional: Reset on mouseout
        // workHeader.addEventListener('mouseout', (event) => {
        //     clearInterval(interval);
        //     event.target.innerText = event.target.dataset.originalValue;
        // });
    }

    // Looping Text Animation
    const loopingTextContainer = document.querySelector('.looping-text-container');
    if (loopingTextContainer) {
        const textItems = loopingTextContainer.querySelectorAll('.looping-text-item');
        let currentIndex = 0;
        const intervalTime = 2500; // Time in milliseconds between text changes (adjust as needed)
        const animationDuration = 600; // Match CSS transition duration

        if (textItems.length > 0) {
            // Initialize first item
            textItems[currentIndex].classList.add('active');

            setInterval(() => {
                const currentItem = textItems[currentIndex];
                const previousIndex = currentIndex;

                currentIndex = (currentIndex + 1) % textItems.length;
                const nextItem = textItems[currentIndex];

                // Animate out the current item
                currentItem.classList.remove('active');
                currentItem.classList.add('previous');

                // Animate in the next item
                nextItem.classList.add('active');

                // Reset the previous item after animation completes
                setTimeout(() => {
                    textItems[previousIndex].classList.remove('previous');
                }, animationDuration);

            }, intervalTime);
        }
    }

    // ... potentially other DOMContentLoaded code ...
});

// Ensure the rest of your scripts.js file follows
// ... existing code ... 