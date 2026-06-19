import { i18n } from '../i18n.js';
import { initializeLiquidGlassEffect } from '../effects/liquid-glass.effect.js';
import { initializeMagneticEffect } from '../effects/magnetic.effect.js';
import { initializeHoverSoundEffect } from '../effects/hover-sound.effect.js';
import { isSoundGlobalOn } from '../sound.js';

const APP_URL = 'https://viora-webapp.web.app';
const DRAG_SOUND_PATH = './assets/audio/drag-cards.mp3';
const DRAG_SOUND_VOLUME = 0.28;
const DRAG_DISTANCE = 260;
const VISIBLE_RADIUS = 2;
const MOBILE_VISIBLE_RADIUS = 1;
const MOBILE_BREAKPOINT = '(max-width: 768px)';

let dragAudio = null;

function getDragAudio() {
    if (!dragAudio) {
        dragAudio = new Audio(DRAG_SOUND_PATH);
        dragAudio.preload = 'auto';
        dragAudio.volume = DRAG_SOUND_VOLUME;
    }

    return dragAudio;
}

function playDragCardSound() {
    if (!isSoundGlobalOn()) return;

    const audio = getDragAudio();
    const soundNode = audio.cloneNode();
    soundNode.volume = audio.volume;
    soundNode.play().catch(() => {});
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function getCards() {
    const cards = i18n.getTranslationValue('segmentSummary.cards');
    return Array.isArray(cards) ? cards : [];
}

function getButtonLabel() {
    return i18n.getTranslationValue('segmentSummary.button') || 'Join';
}

function getCardTheme(card) {
    const color = card.color || '#2E4A3A';
    const isLight = color.toLowerCase() === '#f8f4ed' || color.toLowerCase() === 'f8f4ed';

    return {
        color: color.startsWith('#') ? color : `#${color}`,
        tone: isLight ? 'light' : 'dark',
    };
}

function createCardMarkup(card, index) {
    const theme = getCardTheme(card);
    const bullets = Array.isArray(card.bullets) ? card.bullets : [];

    return `
        <article class="segment-summary-card segment-summary-card--${theme.tone}" style="--segment-summary-card-bg: ${theme.color};" data-segment-summary-card data-card-index="${index}">
            <div class="segment-summary-card__top">
                <span class="segment-summary-card__audience">${escapeHtml(card.audience)}</span>
                <h3 class="segment-summary-card__title">${escapeHtml(card.title)}</h3>
                <p class="segment-summary-card__price">
                    <span>${escapeHtml(card.price)}</span>
                    <small>${escapeHtml(card.priceUnit)}</small>
                </p>
            </div>

            <p class="segment-summary-card__description">${escapeHtml(card.description)}</p>

            <ul class="segment-summary-card__bullets">
                ${bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}
            </ul>

            <div class="segment-summary-card__actions">
                <span class="magnetic-target" data-magnetic data-magnetic-strength="1" data-magnetic-max="12">
                    <a class="segment-summary-card__button liquid-glass ${theme.tone === 'light' ? 'liquid-glass--green' : 'liquid-glass--deep'}" href="${APP_URL}" data-liquid-glass data-hover-sound>
                        ${escapeHtml(getButtonLabel())}
                    </a>
                </span>
            </div>
        </article>
    `;
}

function renderCards(section) {
    const track = section.querySelector('[data-segment-summary-track]');
    const cards = getCards();

    if (!track || !cards.length) return;

    track.innerHTML = cards.map((card, index) => createCardMarkup(card, index)).join('');

    initializeLiquidGlassEffect(section);
    initializeMagneticEffect(section);
    initializeHoverSoundEffect(section);
    section.dispatchEvent(new CustomEvent('segment-summary:rendered'));
}

function wrapIndex(value, total) {
    if (!total) return 0;
    return ((value % total) + total) % total;
}

function getCircularDistance(index, activeIndex, total) {
    if (!total) return 0;

    let distance = index - activeIndex;
    const half = total / 2;

    while (distance > half) distance -= total;
    while (distance < -half) distance += total;

    return distance;
}

function easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3);
}

function attachDrag(section) {
    const viewport = section.querySelector('[data-segment-summary-viewport]');
    const track = section.querySelector('[data-segment-summary-track]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileDeck = window.matchMedia(MOBILE_BREAKPOINT);

    if (!viewport || !track || section.dataset.segmentSummaryDragReady === 'true') return;

    let activeIndex = 0;
    let pointerId = null;
    let startX = 0;
    let startIndex = 0;
    let lastMoveX = 0;
    let lastMoveTime = 0;
    let velocity = 0;
    let hasDragged = false;
    let frameId = null;
    let clickSuppressed = false;
    let lastSoundIndex = 0;

    function getCardElements() {
        return Array.from(track.querySelectorAll('[data-segment-summary-card]'));
    }

    function renderDeck() {
        const cards = getCardElements();
        const total = cards.length;
        const isMobileDeck = mobileDeck.matches;
        const visibleRadius = isMobileDeck ? MOBILE_VISIBLE_RADIUS : VISIBLE_RADIUS;

        cards.forEach((card, index) => {
            const distance = getCircularDistance(index, activeIndex, total);
            const absDistance = Math.abs(distance);
            const direction = distance < 0 ? -1 : 1;
            const clamped = Math.min(absDistance, visibleRadius + 1);
            const progress = Math.min(absDistance, visibleRadius);
            const fanX = isMobileDeck
                ? direction * Math.pow(progress, 0.82) * 52
                : distance * 28 + direction * Math.pow(progress, 1.18) * 88;
            const fanY = isMobileDeck
                ? Math.pow(progress, 1.08) * 8
                : Math.pow(progress, 1.25) * 18;
            const rotation = isMobileDeck ? distance * 6.2 : distance * 6.5;
            const scale = isMobileDeck
                ? Math.max(0.82, 1 - progress * 0.18)
                : Math.max(0.82, 1 - progress * 0.055);
            const opacity = absDistance <= visibleRadius + 0.18 ? 1 : 0;
            const zIndex = Math.round((visibleRadius + 2 - clamped) * 20);

            card.style.setProperty('--deck-x', `${fanX.toFixed(2)}px`);
            card.style.setProperty('--deck-y', `${fanY.toFixed(2)}px`);
            card.style.setProperty('--deck-rotate', `${rotation.toFixed(2)}deg`);
            card.style.setProperty('--deck-scale', scale.toFixed(3));
            card.style.setProperty('--deck-opacity', opacity.toFixed(3));
            card.style.zIndex = String(zIndex);
            card.setAttribute('aria-hidden', absDistance > visibleRadius + 0.18 ? 'true' : 'false');
            card.toggleAttribute('data-deck-active', absDistance < 0.45);
        });
    }

    function normalizeActiveIndex() {
        const total = getCardElements().length;
        activeIndex = wrapIndex(activeIndex, total);
    }

    function stopAnimation() {
        if (!frameId) return;
        window.cancelAnimationFrame(frameId);
        frameId = null;
    }

    function animateTo(targetIndex) {
        stopAnimation();

        const cards = getCardElements();
        const total = cards.length;

        if (!total) return;

        const fromIndex = activeIndex;
        const shortestDelta = getCircularDistance(wrapIndex(targetIndex, total), fromIndex, total);
        const toIndex = fromIndex + shortestDelta;
        const duration = reducedMotion.matches ? 0 : 420;
        const startTime = performance.now();

        if (!duration) {
            activeIndex = wrapIndex(toIndex, total);
            renderDeck();
            return;
        }

        function tick(now) {
            const elapsed = Math.min((now - startTime) / duration, 1);
            activeIndex = fromIndex + shortestDelta * easeOutCubic(elapsed);
            normalizeActiveIndex();
            renderDeck();

            if (elapsed < 1) {
                frameId = window.requestAnimationFrame(tick);
                return;
            }

            frameId = null;
            activeIndex = wrapIndex(Math.round(toIndex), total);
            renderDeck();
        }

        frameId = window.requestAnimationFrame(tick);
    }

    function snapToNearest() {
        const total = getCardElements().length;
        if (!total) return;

        const projectedIndex = activeIndex - velocity * 0.48;
        const targetIndex = wrapIndex(Math.round(projectedIndex), total);

        if (hasDragged && total > 1 && targetIndex !== lastSoundIndex) {
            lastSoundIndex = targetIndex;
            playDragCardSound();
        }

        animateTo(targetIndex);
    }

    viewport.addEventListener('pointerdown', (event) => {
        if (event.button !== undefined && event.button !== 0) return;
        if (event.target.closest('a') && event.pointerType === 'mouse') return;

        stopAnimation();
        pointerId = event.pointerId;
        startX = event.clientX;
        startIndex = activeIndex;
        lastMoveX = event.clientX;
        lastMoveTime = performance.now();
        velocity = 0;
        hasDragged = false;
        lastSoundIndex = wrapIndex(Math.round(activeIndex), getCardElements().length);
        viewport.classList.add('is-dragging');
        viewport.setPointerCapture(pointerId);
    });

    viewport.addEventListener('pointermove', (event) => {
        if (event.pointerId !== pointerId) return;

        const deltaX = event.clientX - startX;
        const now = performance.now();
        const elapsed = Math.max(now - lastMoveTime, 1);

        velocity = (event.clientX - lastMoveX) / elapsed;
        activeIndex = startIndex - deltaX / DRAG_DISTANCE;
        normalizeActiveIndex();

        if (Math.abs(deltaX) > 6) {
            hasDragged = true;
        }

        const total = getCardElements().length;
        const nearestIndex = wrapIndex(Math.round(activeIndex), total);

        if (hasDragged && total > 1 && nearestIndex !== lastSoundIndex) {
            lastSoundIndex = nearestIndex;
            playDragCardSound();
        }

        lastMoveX = event.clientX;
        lastMoveTime = now;
        renderDeck();
    });

    function endDrag(event) {
        if (event.pointerId !== pointerId) return;

        viewport.classList.remove('is-dragging');
        if (viewport.hasPointerCapture?.(pointerId)) {
            viewport.releasePointerCapture(pointerId);
        }
        pointerId = null;

        if (hasDragged) {
            clickSuppressed = true;
        }

        snapToNearest();
    }

    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    viewport.addEventListener('click', (event) => {
        if (!clickSuppressed) return;
        event.preventDefault();
        event.stopPropagation();
        clickSuppressed = false;
    }, true);

    section.addEventListener('segment-summary:rendered', () => {
        normalizeActiveIndex();
        renderDeck();
    });

    window.requestAnimationFrame(renderDeck);
    mobileDeck.addEventListener?.('change', renderDeck);
    section.dataset.segmentSummaryDragReady = 'true';
}

export function initializeSegmentSummarySection(root = document) {
    const section = root.querySelector('[data-segment-summary-section]');

    if (!section) return;

    renderCards(section);
    attachDrag(section);

    i18n.subscribe(() => {
        renderCards(section);
    });
}
