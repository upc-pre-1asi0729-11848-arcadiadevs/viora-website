import { i18n } from '../i18n.js';

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3);
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
    let lineGroups = [];
    let ticking = false;

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
            revealAll();
            ticking = false;
            return;
        }

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const staggerRange = 0.38;
        const softness = 0.68;

        lineGroups.forEach(({ element, lines }) => {
            const rect = element.getBoundingClientRect();
            const progress = clamp((viewportHeight * 0.94 - rect.top) / (viewportHeight * 0.62), 0, 1);
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

    rebuild();

    section.dataset.finalCtaInitialized = 'true';
}

export function initializeFinalCtaSection(root = document) {
    attachFinalCtaSection(root.querySelector('[data-final-cta-section]'));
}
