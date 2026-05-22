import { i18n } from '../i18n.js';
import { initializeHoverSoundEffect } from '../effects/hover-sound.effect.js';
import { initializeLiquidGlassEffect } from '../effects/liquid-glass.effect.js';
import { initializeMagneticEffect } from '../effects/magnetic.effect.js';

const STORY_CONFIG = {
    growers: {
        translationPath: 'roleBenefits.story.growers',
        image: './assets/images/segments/olive-producer-character.png',
        steps: [
            { image: './assets/images/segments/olive-producer-character.png' },
            { image: './assets/images/segments/grower_card_image_2.png' },
            { image: './assets/images/segments/grower_card_image_3.png' },
            { image: './assets/images/segments/grower_card_image_4.png' },
        ],
    },
    specialists: {
        translationPath: 'roleBenefits.story.specialists',
        image: './assets/images/segments/phytosanitary-specialist-character.png',
        steps: [
            { image: './assets/images/segments/phytosanitary-specialist-character.png' },
            { image: './assets/images/segments/specialist_card_image_2.png' },
            { image: './assets/images/segments/specialist_card_image_3.png' },
            { image: './assets/images/segments/specialist_card_image_4.png' },
        ],
    },
};

const VISUAL_SLOT_SPACING = 1.36;
const TEXT_SWITCH_RATIO = 0.5;

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function formatCounter(index) {
    return String(index + 1).padStart(2, '0');
}

function getText(path, fallback = '') {
    const value = i18n.getTranslationValue(path);
    return typeof value === 'string' ? value : fallback;
}

function getStepText(config, index) {
    const basePath = `${config.translationPath}.steps.${index}`;
    const bullets = i18n.getTranslationValue(`${basePath}.bullets`);

    return {
        eyebrow: getText(`${config.translationPath}.eyebrow`),
        title: getText(`${basePath}.title`),
        description: getText(`${basePath}.description`),
        bullets: Array.isArray(bullets) ? bullets : [],
        cta: getText(`${basePath}.cta`),
    };
}

function createVisualMarkup(config, index) {
    return `
        <div class="segment-story__image-stage" data-segment-visual-scene="${index}">
            <div class="segment-story__image-track">
                ${config.steps.map((step, stepIndex) => `
                    <div class="segment-story__image-slot" style="--segment-slot-index: ${stepIndex};">
                        <img class="segment-story__character" src="${step.image || config.image}" alt="" loading="lazy" aria-hidden="true" data-segment-image-index="${stepIndex}" />
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function createMobileVisualMarkup(config, index) {
    const step = config.steps[index];
    const image = step?.image || config.image;

    return `<img class="segment-story__mobile-character" src="${image}" alt="" loading="lazy" aria-hidden="true" />`;
}

function renderDots(container, count, activeIndex) {
    if (!container) return;

    container.innerHTML = Array.from({ length: count }, (_, index) => (
        `<span class="segment-story__dot${index === activeIndex ? ' segment-story__dot--active' : ''}"></span>`
    )).join('');
}

function renderBullets(list, bullets) {
    if (!list) return;

    list.innerHTML = bullets.map((bullet) => `<li>${bullet}</li>`).join('');
}

function renderStep(section, storyKey, index, force = false) {
    const config = STORY_CONFIG[storyKey];
    const text = getStepText(config, index);

    const eyebrow = section.querySelector('[data-segment-eyebrow]');
    const title = section.querySelector('[data-segment-title]');
    const description = section.querySelector('[data-segment-description]');
    const bullets = section.querySelector('[data-segment-bullets]');
    const cta = section.querySelector('[data-segment-cta]');
    const current = section.querySelector('[data-segment-current]');
    const dots = section.querySelector('[data-segment-dots]');
    const content = section.querySelector('.segment-story__content');

    const update = () => {
        if (eyebrow) eyebrow.textContent = text.eyebrow;
        if (title) title.textContent = text.title;
        if (description) description.textContent = text.description;
        if (cta) cta.textContent = text.cta;
        if (current) current.textContent = formatCounter(index);
        renderBullets(bullets, text.bullets);
        renderDots(dots, config.steps.length, index);
        section.dataset.activeSegmentStep = String(index);
    };

    if (force) {
        update();
        return;
    }

    content?.classList.add('segment-story__content--switching');

    window.setTimeout(() => {
        update();
        content?.classList.remove('segment-story__content--switching');
    }, 140);
}

function createMobileCard(storyKey, index) {
    const config = STORY_CONFIG[storyKey];
    const text = getStepText(config, index);
    const bullets = text.bullets.map((bullet) => `<li>${bullet}</li>`).join('');
    const buttonVariant = storyKey === 'specialists' ? 'orange' : 'green';

    return `
        <article class="segment-story__mobile-card">
            <div class="segment-story__mobile-visual" aria-hidden="true">
                ${createMobileVisualMarkup(config, index)}
            </div>
            <div class="segment-story__mobile-content">
                <span class="segment-story__mobile-count">${formatCounter(index)} / ${String(config.steps.length).padStart(2, '0')}</span>
                <h3>${text.title}</h3>
                <p>${text.description}</p>
                <ul>${bullets}</ul>
                <span class="magnetic-target" data-magnetic data-magnetic-strength="1" data-magnetic-max="12">
                    <a class="segment-story__mobile-button landing-button landing-button--${buttonVariant} liquid-glass liquid-glass--${buttonVariant}" href="https://viora-webapp.web.app" data-liquid-glass data-hover-sound>${text.cta}</a>
                </span>
            </div>
        </article>
    `;
}

function renderMobileList(section, storyKey) {
    const config = STORY_CONFIG[storyKey];
    const list = section.querySelector('[data-segment-mobile-list]');

    if (!list) return;

    list.innerHTML = config.steps.map((_, index) => createMobileCard(storyKey, index)).join('');
}

function attachSegmentStory(section) {
    if (!section || section.dataset.segmentStoryInitialized === 'true') return;

    const storyKey = section.dataset.segmentStory;
    const config = STORY_CONFIG[storyKey];

    if (!config) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let ticking = false;

    function updateFromScroll() {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const rect = section.getBoundingClientRect();
        const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);
        const scrolled = clamp(-rect.top + 96, 0, scrollableDistance);
        const progress = clamp(scrolled / scrollableDistance, 0, 1);
        const maxVisualStep = config.steps.length - 1;
        const visualTrackPosition = progress * maxVisualStep * VISUAL_SLOT_SPACING;
        const visualStepPosition = visualTrackPosition / VISUAL_SLOT_SPACING;
        const activeIndex = clamp(Math.floor(visualStepPosition + TEXT_SWITCH_RATIO), 0, config.steps.length - 1);
        const currentIndex = Number(section.dataset.activeSegmentStep || 0);
        const renderedTrackPosition = reducedMotion.matches ? activeIndex * VISUAL_SLOT_SPACING : visualTrackPosition;
        const visualScale = reducedMotion.matches ? 1 : 0.985 + progress * 0.015;

        section.style.setProperty('--segment-track-position', renderedTrackPosition.toFixed(3));
        section.style.setProperty('--segment-visual-scale', visualScale.toFixed(3));

        if (activeIndex !== currentIndex) {
            renderStep(section, storyKey, activeIndex);
        }

        ticking = false;
    }

    function requestUpdate() {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(updateFromScroll);
        }
    }

    function rebuild() {
        const activeIndex = Number(section.dataset.activeSegmentStep || 0);
        const visual = section.querySelector('[data-segment-visual]');

        if (visual && visual.dataset.segmentVisualRendered !== 'true') {
            visual.innerHTML = createVisualMarkup(config, activeIndex);
            visual.dataset.segmentVisualRendered = 'true';
        }

        renderStep(section, storyKey, activeIndex, true);
        renderMobileList(section, storyKey);
        initializeLiquidGlassEffect(section);
        initializeMagneticEffect(section);
        initializeHoverSoundEffect(section);
        requestUpdate();
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    i18n.subscribe(rebuild);

    section.dataset.activeSegmentStep = '0';
    rebuild();
    section.dataset.segmentStoryInitialized = 'true';
}

export function initializeRoleBenefitsSection(root = document) {
    root.querySelectorAll('[data-segment-story]').forEach(attachSegmentStory);
}
