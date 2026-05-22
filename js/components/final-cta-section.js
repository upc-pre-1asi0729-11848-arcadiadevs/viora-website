import { i18n } from '../i18n.js';

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3);
}

function easeInOutCubic(value) {
    return value < 0.5
        ? 4 * value * value * value
        : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function interpolateChannel(from, to, progress) {
    return Math.round(from + (to - from) * progress);
}

function interpolateRgb(from, to, progress, alpha = 1) {
    const r = interpolateChannel(from[0], to[0], progress);
    const g = interpolateChannel(from[1], to[1], progress);
    const b = interpolateChannel(from[2], to[2], progress);

    return alpha < 1 ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
}

function setLineState(line, reveal) {
    const eased = easeOutCubic(reveal);

    line.style.setProperty('--final-cta-line-progress', `${(eased * 100).toFixed(2)}%`);
}

function buildRevealText(element) {
    const translationKey = element.dataset.finalCtaReveal;
    const text = i18n.getTranslationValue(translationKey) || element.textContent;
    const fragment = document.createDocumentFragment();
    const revealLines = [];

    element.innerHTML = '';

    text.split('\n').forEach((line, lineIndex, allLines) => {
        const lineElement = document.createElement('span');
        lineElement.className = 'final-cta-section__line';
        lineElement.textContent = line;

        fragment.appendChild(lineElement);
        revealLines.push(lineElement);

        if (lineIndex < allLines.length - 1) {
            fragment.appendChild(document.createElement('br'));
        }
    });

    element.appendChild(fragment);

    return revealLines;
}

function attachFinalCtaSection(section) {
    if (!section || section.dataset.finalCtaInitialized === 'true') return;

    const revealElements = Array.from(section.querySelectorAll('[data-final-cta-reveal]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileMotion = window.matchMedia('(max-width: 768px)');
    let lineGroups = [];
    let ticking = false;

    function setWipeState(progress) {
        const isMobileMotion = mobileMotion.matches;
        const eased = isMobileMotion ? easeInOutCubic(progress) : easeOutCubic(progress);
        const white = [255, 255, 255];
        const primary = [46, 74, 58];
        const ink = [30, 39, 34];
        const wipeY = 100 - progress * 100;
        const peakHeight = isMobileMotion ? 24 : 26;
        const peak = Math.sin(progress * Math.PI) * peakHeight;

        section.style.setProperty('--final-cta-wipe-progress', eased.toFixed(4));
        section.style.setProperty('--final-cta-wipe-y', `${wipeY.toFixed(2)}%`);
        section.style.setProperty('--final-cta-wipe-peak', `${peak.toFixed(2)}vh`);
        section.style.setProperty('--final-cta-title-active-color', interpolateRgb(white, primary, eased));
        section.style.setProperty('--final-cta-title-muted-color', interpolateRgb(white, ink, eased, 0.2));
        section.style.setProperty('--final-cta-subtitle-active-color', interpolateRgb(white, ink, eased, 0.64));
        section.style.setProperty('--final-cta-subtitle-muted-color', interpolateRgb(white, ink, eased, 0.18));
        section.style.setProperty('--final-cta-button-bg', interpolateRgb(white, primary, eased));
        section.style.setProperty('--final-cta-button-color', interpolateRgb(primary, white, eased));
        section.style.setProperty('--final-cta-icon-filter', eased < 0.5 ? 'brightness(0) saturate(100%) invert(25%) sepia(14%) saturate(888%) hue-rotate(91deg) brightness(93%) contrast(88%)' : 'none');
    }

    function rebuild() {
        lineGroups = revealElements.map((element) => ({
            element,
            lines: buildRevealText(element),
        }));
        requestUpdate();
    }

    function revealAll() {
        lineGroups.forEach((group) => {
            group.lines.forEach((line) => setLineState(line, 1));
        });
    }

    function updateReveal() {
        if (reducedMotion.matches) {
            setWipeState(1);
            revealAll();
            ticking = false;
            return;
        }

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const staggerRange = 0.38;
        const softness = 0.68;
        const sectionRect = section.getBoundingClientRect();
        const wipeStart = viewportHeight * (mobileMotion.matches ? 0.90 : 0.5);
        const wipeRange = viewportHeight * (mobileMotion.matches ? 0.88 : 0.5);
        const wipeProgress = clamp((wipeStart - sectionRect.top) / wipeRange, 0, 1);

        setWipeState(wipeProgress);

        lineGroups.forEach(({ element, lines }) => {
            const rect = element.getBoundingClientRect();
            const progress = mobileMotion.matches
                ? clamp((viewportHeight * 1.05 - rect.top) / (viewportHeight * 0.52), 0, 1)
                : clamp((viewportHeight * 0.94 - rect.top) / (viewportHeight * 0.62), 0, 1);
            const lastIndex = Math.max(lines.length - 1, 1);

            lines.forEach((line, index) => {
                const lineStart = (index / lastIndex) * staggerRange;
                const reveal = clamp((progress - lineStart) / softness, 0, 1);
                setLineState(line, reveal);
            });
        });

        ticking = false;
    }

    function requestUpdate() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateReveal);
        }
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    i18n.subscribe(rebuild);

    setWipeState(0);
    rebuild();

    section.dataset.finalCtaInitialized = 'true';
}

export function initializeFinalCtaSection(root = document) {
    attachFinalCtaSection(root.querySelector('[data-final-cta-section]'));
}
