document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Close other open accordion items (optional: for single-open accordion)
            // accordionHeaders.forEach(otherHeader => {
            //     if (otherHeader !== header && otherHeader.getAttribute('aria-expanded') === 'true') {
            //         otherHeader.setAttribute('aria-expanded', 'false');
            //         otherHeader.parentElement.classList.remove('active');
            //         otherHeader.nextElementSibling.style.maxHeight = null; // Use style for direct manipulation
            //     }
            // });

            // Toggle the clicked item
            if (isExpanded) {
                header.setAttribute('aria-expanded', 'false');
                accordionItem.classList.remove('active');
                // accordionContent.style.maxHeight = null; // Use style for direct manipulation
            } else {
                header.setAttribute('aria-expanded', 'true');
                accordionItem.classList.add('active');
                // accordionContent.style.maxHeight = accordionContent.scrollHeight + "px"; // Use style for direct manipulation
            }
        });
    });
}); 