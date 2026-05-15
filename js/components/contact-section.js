export function initializeContactSection() {
    // Basic initialization for contact section
    // Can be used to add magnetic effects to links or animations in the future
    const links = document.querySelectorAll('.contact-section__link');

    // Add simple hover effect tracker if needed, currently handled by CSS
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.opacity = '0.8';
        });
        link.addEventListener('mouseleave', () => {
            link.style.opacity = '1';
        });
    });
}