let lenisInstance = null;
let animationFrameId = null;

function isReducedMotionEnabled() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function raf(time) {
    if (!lenisInstance) return;

    lenisInstance.raf(time);
    animationFrameId = requestAnimationFrame(raf);
}

function handleAnchorLinks(lenis) {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        if (link.dataset.smoothScrollInitialized === 'true') return;

        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');

            if (!href || href === '#') return;

            const target = document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            lenis.scrollTo(target, {
                offset: 0,
                duration: 1.2,
            });
        });

        link.dataset.smoothScrollInitialized = 'true';
    });
}

export async function initializeSmoothScroll() {
    if (lenisInstance || isReducedMotionEnabled()) return null;

    const { default: Lenis } = await import('lenis');

    lenisInstance = new Lenis({
        duration: 1.7,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.82,
        touchMultiplier: 1.5,
        syncTouch: false,
    });

    handleAnchorLinks(lenisInstance);

    animationFrameId = requestAnimationFrame(raf);

    return lenisInstance;
}

export function refreshSmoothScrollLinks() {
    if (!lenisInstance) return;

    handleAnchorLinks(lenisInstance);
}

export function destroySmoothScroll() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
    }
}