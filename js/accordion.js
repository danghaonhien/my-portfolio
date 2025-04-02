document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const clickedItem = header.parentElement;
            const wasExpanded = clickedItem.classList.contains('active'); // Check state *before* modifications

            // First, close all *other* items
            accordionHeaders.forEach(otherHeader => {
                const otherItem = otherHeader.parentElement;
                if (otherItem !== clickedItem && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherHeader.setAttribute('aria-expanded', 'false');
                }
            });

            // Now toggle the clicked item based on its original state
            if (wasExpanded) {
                // It was open, so close it
                clickedItem.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');
            } else {
                // It was closed, so open it
                clickedItem.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
}); 