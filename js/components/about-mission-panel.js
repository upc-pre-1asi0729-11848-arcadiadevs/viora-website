function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function attachAboutMissionParallax(section) {
    if (section.dataset.aboutMissionInitialized === 'true') return;

    const items = section.querySelectorAll('[data-about-parallax-item]');
    let ticking = false;

    function updateParallax() {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const progress = clamp(
            (viewportHeight - rect.top) / (viewportHeight + rect.height),
            0,
            1
        );

        const centeredProgress = progress - 0.5;

        items.forEach((item) => {
            const speed = Number(item.dataset.parallaxSpeed || 0);
            const translateY = centeredProgress * speed;

            item.style.setProperty('--about-parallax-y', `${translateY}px`);
        });

        ticking = false;
    }

    function requestUpdate() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateParallax);
        }
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    updateParallax();

    section.dataset.aboutMissionInitialized = 'true';
}

export function initializeAboutMissionPanel(root = document) {
    const section = root.querySelector('[data-about-mission-panel]');

    if (!section) return;

    attachAboutMissionParallax(section);
}