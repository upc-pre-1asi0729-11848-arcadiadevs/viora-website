function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

const VIDEO_PARALLAX_STRENGTH = 2.4;

function attachOutcomesParallax(section) {
    if (section.dataset.outcomesParallaxInitialized === 'true') return;

    const videos = section.querySelectorAll('[data-outcomes-parallax-video]');
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

        videos.forEach((video) => {
            const media = video.closest('.expected-outcomes-panel__media');
            const direction = media?.classList.contains('expected-outcomes-panel__media--bottom') ? 1 : -1;
            const maxTravel = Math.max((video.offsetHeight - (media?.clientHeight || 0)) / 2, 0);
            const translateY = centeredProgress * maxTravel * VIDEO_PARALLAX_STRENGTH * direction;

            video.style.setProperty('--outcomes-parallax-y', `${translateY.toFixed(2)}px`);
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

    section.dataset.outcomesParallaxInitialized = 'true';
}

export function initializeExpectedOutcomesPanel(root = document) {
    const section = root.querySelector('[data-outcomes-parallax-section]');

    if (!section) return;

    attachOutcomesParallax(section);
}
