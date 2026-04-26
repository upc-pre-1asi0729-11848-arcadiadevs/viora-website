const ACTIVE_CARD_CLASS = 'solution-card--active';

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function getCardCenterPosition(card) {
    return card.offsetLeft + card.offsetWidth / 2;
}

function setTrackTranslate(track, value, animated = true) {
    track.style.transition = animated ? 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
    track.style.transform = `translate3d(${value}px, 0, 0)`;
    track.dataset.translateX = String(value);
}

function getCurrentTranslate(track) {
    return Number(track.dataset.translateX || 0);
}

function updateActiveCard(cards, activeIndex) {
    cards.forEach((card, index) => {
        const isActive = index === activeIndex;

        card.classList.toggle(ACTIVE_CARD_CLASS, isActive);
        card.setAttribute('aria-selected', String(isActive));
    });
}

function centerCard(viewport, track, cards, index, animated = true) {
    const safeIndex = clamp(index, 0, cards.length - 1);
    const targetCard = cards[safeIndex];

    const viewportCenter = viewport.clientWidth / 2;
    const cardCenter = getCardCenterPosition(targetCard);
    const nextTranslate = viewportCenter - cardCenter;

    setTrackTranslate(track, nextTranslate, animated);
    updateActiveCard(cards, safeIndex);

    viewport.dataset.activeIndex = String(safeIndex);
}

function findClosestCardToCenter(viewport, cards) {
    const viewportRect = viewport.getBoundingClientRect();
    const viewportCenter = viewportRect.left + viewportRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(viewportCenter - cardCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });

    return closestIndex;
}

function attachDragCarousel(viewport) {
    if (viewport.dataset.solutionCarouselInitialized === 'true') return;

    const track = viewport.querySelector('[data-solution-track]');
    const cards = Array.from(viewport.querySelectorAll('[data-solution-card]'));

    if (!track || cards.length === 0) return;

    let isDragging = false;
    let startX = 0;
    let startTranslate = 0;
    let hasMoved = false;

    function handlePointerDown(event) {
        if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'touch') return;

        isDragging = true;
        hasMoved = false;
        startX = event.clientX;
        startTranslate = getCurrentTranslate(track);

        track.style.transition = 'none';
        viewport.setPointerCapture?.(event.pointerId);
    }

    function handlePointerMove(event) {
        if (!isDragging) return;

        const deltaX = event.clientX - startX;

        if (Math.abs(deltaX) > 4) {
            hasMoved = true;
        }

        setTrackTranslate(track, startTranslate + deltaX, false);
    }

    function handlePointerUp(event) {
        if (!isDragging) return;

        isDragging = false;
        viewport.releasePointerCapture?.(event.pointerId);

        const closestIndex = findClosestCardToCenter(viewport, cards);
        centerCard(viewport, track, cards, closestIndex, true);
    }

    function handlePreviousClick() {
        const activeIndex = Number(viewport.dataset.activeIndex || 0);
        centerCard(viewport, track, cards, activeIndex - 1, true);
    }

    function handleNextClick() {
        const activeIndex = Number(viewport.dataset.activeIndex || 0);
        centerCard(viewport, track, cards, activeIndex + 1, true);
    }

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (hasMoved) return;
            centerCard(viewport, track, cards, index, true);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                centerCard(viewport, track, cards, index, true);
            }
        });
    });

    const previousButton = document.querySelector('[data-solution-prev]');
    const nextButton = document.querySelector('[data-solution-next]');

    previousButton?.addEventListener('click', handlePreviousClick);
    nextButton?.addEventListener('click', handleNextClick);

    viewport.addEventListener('pointerdown', handlePointerDown);
    viewport.addEventListener('pointermove', handlePointerMove);
    viewport.addEventListener('pointerup', handlePointerUp);
    viewport.addEventListener('pointercancel', handlePointerUp);
    viewport.addEventListener('mouseleave', handlePointerUp);

    window.addEventListener('resize', () => {
        const activeIndex = Number(viewport.dataset.activeIndex || 2);
        centerCard(viewport, track, cards, activeIndex, false);
    });

    centerCard(viewport, track, cards, 2, false);

    viewport.dataset.solutionCarouselInitialized = 'true';
}

export function initializeSolutionPanel(root = document) {
    const carousel = root.querySelector('[data-solution-carousel]');
    if (!carousel) return;

    attachDragCarousel(carousel);
}