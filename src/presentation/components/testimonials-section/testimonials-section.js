export function initializeTestimonialsSection() {
    const track = document.querySelector('[data-testimonial-track]');
    const prevBtn = document.querySelector('[data-testimonial-prev]');
    const nextBtn = document.querySelector('[data-testimonial-next]');
    const currentIndicator = document.getElementById('testimonial-current');
    const slides = document.querySelectorAll('[data-testimonial-slide]');

    if (!track || !prevBtn || !nextBtn || !currentIndicator || slides.length === 0) {
        return;
    }

    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoScrollInterval;

    const updateIndicator = (index) => {
        // format as "01", "02", etc.
        const formattedIndex = String(index + 1).padStart(2, '0');
        currentIndicator.textContent = formattedIndex;
        currentIndex = index;
    };

    const scrollToSlide = (index) => {
        if (index < 0 || index >= totalSlides) return;
        const slide = slides[index];
        track.scrollTo({
            left: slide.offsetLeft - track.offsetLeft,
            behavior: 'smooth'
        });
    };

    const nextSlide = () => {
        const next = (currentIndex + 1) % totalSlides;
        scrollToSlide(next);
    };

    const prevSlide = () => {
        const prev = (currentIndex - 1 + totalSlides) % totalSlides;
        scrollToSlide(prev);
    };

    // Auto-scroll logic
    const startAutoScroll = () => {
        stopAutoScroll();
        autoScrollInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoScroll = () => {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    };

    // Event Listeners for buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoScroll(); // stop auto-scroll on manual interaction
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoScroll();
    });

    // Pause auto-scroll on hover or touch
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);
    track.addEventListener('touchstart', stopAutoScroll, { passive: true });

    // Intersection Observer to update the current indicator based on scroll position
    const observerOptions = {
        root: track,
        threshold: 0.5 // trigger when slide is 50% visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = parseInt(entry.target.getAttribute('data-testimonial-slide')) - 1;
                updateIndicator(index);
            }
        });
    }, observerOptions);

    slides.forEach(slide => observer.observe(slide));

    // Initialize auto-scroll
    startAutoScroll();
}