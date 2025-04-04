document.addEventListener('DOMContentLoaded', () => {
    const launchContainer = document.querySelector('.launch-product-container');
    const tooltipVideo = document.querySelector('.tooltip-video-container');
    const launchLink = launchContainer ? launchContainer.querySelector('.launch-product-link') : null; // Get the link element

    if (launchContainer && tooltipVideo && launchLink && launchLink.href) { // Check if all elements and href exist
        // Show tooltip and play video on hover
        launchContainer.addEventListener('mouseenter', () => {
            tooltipVideo.style.display = 'block';
            const videoElement = tooltipVideo.querySelector('video');
            if (videoElement) {
                 // Attempt to play the video, catching potential errors
                 videoElement.play().catch(error => {
                    // Autoplay might be blocked by the browser initially
                    // console.error("Video play automatically failed:", error); 
                 });
            }
        });

        // Hide tooltip and pause video when mouse leaves
        launchContainer.addEventListener('mouseleave', () => {
            tooltipVideo.style.display = 'none';
             const videoElement = tooltipVideo.querySelector('video');
             if (videoElement) {
                 videoElement.pause(); 
                 // Optional: Reset video to start if desired
                 // videoElement.currentTime = 0; 
             }
        });

        // Update tooltip position to follow the cursor
        launchContainer.addEventListener('mousemove', (e) => {
            // Use clientX/clientY for viewport-relative positioning
            // The CSS transform rule handles the offset from the cursor
            tooltipVideo.style.left = `${e.clientX}px`;
            tooltipVideo.style.top = `${e.clientY}px`;
        });

        // Add click listener to the container
        launchContainer.addEventListener('click', (event) => {
            event.preventDefault();

            // Respect the target attribute (e.g., _blank for new tab)
            if (launchLink.target === '_blank') {
                window.open(launchLink.href, '_blank');
            } else {
                window.location.href = launchLink.href;
            }
        });

    } else {
        // Log error if elements aren't found, helps debugging
        if (!launchContainer) console.error('Launch product container not found.');
        if (!tooltipVideo) console.error('Tooltip video container not found.');
        if (launchContainer && !launchLink) console.error('Launch product link element not found inside the container.');
        if (launchLink && !launchLink.href) console.error('Launch product link has no href attribute.');
    }
}); 