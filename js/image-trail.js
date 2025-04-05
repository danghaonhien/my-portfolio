document.addEventListener('DOMContentLoaded', () => {
    const trailArea = document.querySelector('.image-trail-area');
    if (!trailArea) return; // Exit if the trail area isn't found

    // List of images for the trail (excluding profile.jpg)
    const trailImageSources = [
        'images/about/twinpeak.jpg',
        'images/about/yosemite.jpg',
        'images/about/ggb.jpg',
        'images/about/oldbay2.jpg',
        'images/about/oldbay.jpg',
        'images/about/newyork.jpg',
        'images/about/baybridge.jpg',
        'images/about/getty.JPG',
        'images/about/salk.jpg',
        'images/about/taichung.jpg',
        'images/about/sunset.jpg',
        'images/about/ggb_skyline.jpg',
        'images/about/saleforce.jpg',
        'images/about/ggb_masterpiece.jpg',
        'images/about/sf2.jpg'
        // Add other image paths from your images/about/ folder here
    ];

    let currentImageIndex = 0;
    let lastSpawnTime = 0;
    const spawnDelay = 125; // Milliseconds delay between spawning images

    trailArea.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastSpawnTime < spawnDelay) {
            return; // Throttle image spawning
        }
        lastSpawnTime = currentTime;

        const rect = trailArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create the trail image element
        const img = document.createElement('img');
        img.src = trailImageSources[currentImageIndex];
        img.classList.add('trail-image');
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;

        // Random slight rotation variation
        const randomRotation = Math.random() * 20 - 10; // -10 to +10 degrees
        img.style.transform = `translate(-50%, -50%) rotate(${10 + randomRotation}deg)`;

        trailArea.appendChild(img);

        // Cycle through images
        currentImageIndex = (currentImageIndex + 1) % trailImageSources.length;

        // Use setTimeout to trigger the fade-in transition shortly after appending
        setTimeout(() => {
            img.classList.add('active');
        }, 10); // Small delay to ensure transition happens

        // Set timeout to start fading out the image
        setTimeout(() => {
            img.classList.remove('active');

            // Set another timeout to remove the image from DOM after fade out completes
            // Match this duration with the opacity transition duration in CSS
            setTimeout(() => {
                if (img.parentNode === trailArea) { // Check if still attached
                    trailArea.removeChild(img);
                }
            }, 500); // Corresponds to the 0.5s transition in CSS
        }, 150); // How long the image stays fully visible before fading out
    });
}); 