import { i18n } from '../i18n.js';

const ITEMS = [
    { key: 'producer' },
    { key: 'harvest' },
    { key: 'specialist' },
    { key: 'insights' },
];

const AUTOPLAY_DELAY = 4000;
const TRANSITION_DURATION = 980;

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3);
}

function formatCounter(index) {
    return String(index + 1).padStart(2, '0');
}

function getItemText(item) {
    return {
        title: i18n.getTranslationValue(`imageCta.items.${item.key}.title`) || '',
        subtitle: i18n.getTranslationValue(`imageCta.items.${item.key}.subtitle`) || '',
    };
}

function renderCopy(section, index) {
    const title = section.querySelector('[data-image-cta-title]');
    const subtitle = section.querySelector('[data-image-cta-subtitle]');
    const counter = section.querySelector('[data-image-cta-current]');
    const itemText = getItemText(ITEMS[index]);

    if (title) title.innerHTML = itemText.title.replace(/\n/g, '<br />');
    if (subtitle) subtitle.innerHTML = itemText.subtitle.replace(/\n/g, '<br />');
    if (counter) counter.textContent = formatCounter(index);
}

function setActiveTabs(section, index) {
    section.querySelectorAll('[data-image-cta-tab]').forEach((tab, tabIndex) => {
        const isActive = tabIndex === index;
        tab.classList.toggle('image-cta-section__tab--active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
    });
}

function setActiveImage(section, index) {
    const images = Array.from(section.querySelectorAll('[data-image-cta-image]'));
    const currentIndex = Number(section.dataset.activeCtaIndex || 0);
    const currentImage = images[currentIndex];
    const nextImage = images[index];

    if (!nextImage) return;

    if (!section.dataset.imageCtaHasRendered) {
        nextImage.classList.add('image-cta-section__image--active');
        section.dataset.imageCtaHasRendered = 'true';
        return;
    }

    if (currentIndex === index) return;

    currentImage?.classList.add('image-cta-section__image--previous');
    currentImage?.classList.remove('image-cta-section__image--active');

    nextImage.classList.add('image-cta-section__image--entering');

    requestAnimationFrame(() => {
        nextImage.classList.add('image-cta-section__image--active');
        nextImage.classList.remove('image-cta-section__image--entering');
    });

    window.setTimeout(() => {
        currentImage?.classList.remove('image-cta-section__image--previous');
    }, TRANSITION_DURATION);
}

function setActiveItem(section, index, force = false) {
    const currentIndex = Number(section.dataset.activeCtaIndex || 0);

    if (!force && currentIndex === index && section.dataset.imageCtaHasRendered === 'true') return;

    const copy = section.querySelector('[data-image-cta-copy]');

    setActiveImage(section, index);
    setActiveTabs(section, index);
    copy?.classList.add('image-cta-section__content--switching');

    window.setTimeout(() => {
        renderCopy(section, index);
        copy?.classList.remove('image-cta-section__content--switching');
    }, force ? 0 : 150);

    section.dataset.activeCtaIndex = String(index);
}

function attachImageCtaSection(section) {
    if (!section || section.dataset.imageCtaInitialized === 'true') return;

    const stage = section.querySelector('[data-image-cta-stage]');
    const tabs = section.querySelectorAll('[data-image-cta-tab]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let autoplayId = null;
    let progressFrameId = null;
    let autoplayStartedAt = 0;
    let ticking = false;

    function updateScrollGrowth() {
        if (!stage) {
            ticking = false;
            return;
        }

        if (reducedMotion.matches) {
            stage.style.setProperty('--image-cta-scale', '1');
            stage.style.setProperty('--image-cta-radius', '0px');
            ticking = false;
            return;
        }

        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const progress = clamp((viewportHeight - rect.top) / (viewportHeight * 0.88), 0, 1);
        const easedProgress = easeOutCubic(progress);
        const scale = 0.72 + easedProgress * 0.28;
        const radius = 28 * (1 - easedProgress);

        stage.style.setProperty('--image-cta-scale', scale.toFixed(3));
        stage.style.setProperty('--image-cta-radius', `${radius.toFixed(2)}px`);

        ticking = false;
    }

    function requestScrollGrowth() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateScrollGrowth);
        }
    }

    function stopAutoplay() {
        if (autoplayId) {
            window.clearInterval(autoplayId);
            autoplayId = null;
        }

        if (progressFrameId) {
            window.cancelAnimationFrame(progressFrameId);
            progressFrameId = null;
        }
    }

    function updateTabProgress(now) {
        if (!autoplayId) {
            progressFrameId = null;
            return;
        }

        const progress = clamp((now - autoplayStartedAt) / AUTOPLAY_DELAY, 0, 1);
        section.style.setProperty('--image-cta-tab-progress', progress.toFixed(3));
        progressFrameId = window.requestAnimationFrame(updateTabProgress);
    }

    function startAutoplay() {
        if (reducedMotion.matches || autoplayId) return;

        autoplayStartedAt = performance.now();
        section.style.setProperty('--image-cta-tab-progress', '0');

        autoplayId = window.setInterval(() => {
            const currentIndex = Number(section.dataset.activeCtaIndex || 0);
            const nextIndex = (currentIndex + 1) % ITEMS.length;
            setActiveItem(section, nextIndex);
            autoplayStartedAt = performance.now();
            section.style.setProperty('--image-cta-tab-progress', '0');
        }, AUTOPLAY_DELAY);

        progressFrameId = window.requestAnimationFrame(updateTabProgress);
    }

    function restartAutoplay() {
        stopAutoplay();
        section.style.setProperty('--image-cta-tab-progress', '0');
        startAutoplay();
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            setActiveItem(section, Number(tab.dataset.imageCtaTab || 0));
            restartAutoplay();
        });
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) return;

        restartAutoplay();
    });
    window.addEventListener('scroll', requestScrollGrowth, { passive: true });
    window.addEventListener('resize', requestScrollGrowth);

    i18n.subscribe(() => {
        setActiveItem(section, Number(section.dataset.activeCtaIndex || 0), true);
    });

    setActiveItem(section, 0, true);
    requestScrollGrowth();
    startAutoplay();

    section.dataset.imageCtaInitialized = 'true';
}

export function initializeImageCtaSection(root = document) {
    const section = root.querySelector('[data-image-cta-section]');

    attachImageCtaSection(section);
}
