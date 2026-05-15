function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function getCurrentTranslate(track) {
    return Number(track.dataset.translateX || 0);
}

function setTrackTranslate(track, value, animated = true) {
    track.style.transition = animated
        ? 'transform 380ms cubic-bezier(0.22, 1, 0.36, 1)'
        : 'none';

    track.style.transform = `translate3d(${value}px, 0, 0)`;
    track.dataset.translateX = String(value);
}

function getStepSize(track) {
    const firstCard = track.querySelector('[data-referral-card]');

    if (!firstCard) return 0;

    const cardRect = firstCard.getBoundingClientRect();
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || 0);

    return cardRect.width + gap;
}

function getMaxIndex(track, viewport) {
    const cards = track.querySelectorAll('[data-referral-card]');
    if (cards.length === 0) return 0;

    const containerWidth = viewport.clientWidth;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || 0);

    // Calculate how many cards fit in the viewport
    // Using a small epsilon to avoid rounding issues
    const visibleCards = Math.floor((containerWidth + gap + 1) / (cardWidth + gap));

    return Math.max(0, cards.length - visibleCards);
}

function snapToIndex(viewport, track, index) {
    const stepSize = getStepSize(track);
    const maxIndex = getMaxIndex(track, viewport);
    const safeIndex = clamp(index, 0, maxIndex);

    setTrackTranslate(track, -stepSize * safeIndex, true);

    viewport.dataset.activeIndex = String(safeIndex);
}

function attachReferralsCarousel(viewport) {
    if (viewport.dataset.referralsCarouselInitialized === 'true') return;

    const track = viewport.querySelector('[data-referrals-track]');

    if (!track) return;

    let isDragging = false;
    let startX = 0;
    let startTranslate = 0;

    function handlePointerDown(event) {
        if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'touch') return;

        isDragging = true;
        startX = event.clientX;
        startTranslate = getCurrentTranslate(track);

        track.style.transition = 'none';
        viewport.setPointerCapture?.(event.pointerId);
    }

    function handlePointerMove(event) {
        if (!isDragging) return;

        const deltaX = event.clientX - startX;
        const stepSize = getStepSize(track);
        const maxIndex = getMaxIndex(track, viewport);
        const minTranslate = -stepSize * maxIndex;

        const nextTranslate = clamp(startTranslate + deltaX, minTranslate, 0);

        setTrackTranslate(track, nextTranslate, false);
    }

    function handlePointerUp(event) {
        if (!isDragging) return;

        isDragging = false;
        viewport.releasePointerCapture?.(event.pointerId);

        const stepSize = getStepSize(track);
        const currentTranslate = getCurrentTranslate(track);
        const nearestIndex = Math.round(Math.abs(currentTranslate) / stepSize);

        snapToIndex(viewport, track, nearestIndex);
    }

    viewport.addEventListener('pointerdown', handlePointerDown);
    viewport.addEventListener('pointermove', handlePointerMove);
    viewport.addEventListener('pointerup', handlePointerUp);
    viewport.addEventListener('pointercancel', handlePointerUp);
    viewport.addEventListener('mouseleave', handlePointerUp);

    window.addEventListener('resize', () => {
        const activeIndex = Number(viewport.dataset.activeIndex || 0);
        snapToIndex(viewport, track, activeIndex);
    });

    snapToIndex(viewport, track, 0);

    viewport.dataset.referralsCarouselInitialized = 'true';
}

export function initializeReferralsInfo(root = document) {
    const carousel = root.querySelector('[data-referrals-carousel]');

    if (!carousel) return;

    attachReferralsCarousel(carousel);
}