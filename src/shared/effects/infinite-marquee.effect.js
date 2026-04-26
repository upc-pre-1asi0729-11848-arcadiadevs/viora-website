function attachInfiniteMarqueeEffect(element) {
    if (element.dataset.infiniteMarqueeInitialized === 'true') return;

    const track = element.querySelector('.about-intro-section__marquee-track');
    if (!track) return;

    track.style.animation = 'none'; // Disable CSS animation

    let currentScrollY = window.scrollY;
    let currentVelocity = -1; // Base moves left
    let position = 0; // %

    function loop() {
        const newScrollY = window.scrollY;
        const deltaScroll = newScrollY - currentScrollY;
        currentScrollY = newScrollY;

        let targetVelocity = -1; // Base behavior

        if (deltaScroll > 0) {
            // Scroll down: move left faster
            targetVelocity = -1 - (deltaScroll * 0.05);
        } else if (deltaScroll < 0) {
            // Scroll up: move right faster
            targetVelocity = 1 - (deltaScroll * 0.05);
        }

        // Lerp to smooth out speed/direction changes instantly
        currentVelocity += (targetVelocity - currentVelocity) * 0.075;

        // Base frame movement
        position += currentVelocity * 0.04;

        if (position <= -50) position += 50;
        else if (position >= 0) position -= 50;

        track.style.transform = `translate3d(${position}%, 0, 0)`;
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
    element.dataset.infiniteMarqueeInitialized = 'true';
}

export function initializeInfiniteMarqueeEffect(root = document) {
    const elements = root.querySelectorAll('[data-infinite-marquee]');
    elements.forEach(attachInfiniteMarqueeEffect);
}