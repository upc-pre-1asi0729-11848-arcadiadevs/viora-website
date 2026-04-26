const ACTIVE_OPTION_CLASS = 'role-benefits-section__switch-option--active';
const ACTIVE_CARD_CLASS = 'role-benefits-card--active';

const SEGMENTS = ['producer', 'specialist'];

function setActiveSegment(section, segment) {
    const options = section.querySelectorAll('[data-segment-option]');
    const cards = section.querySelectorAll('[data-segment-card]');

    options.forEach((option) => {
        const isActive = option.dataset.segmentOption === segment;

        option.classList.toggle(ACTIVE_OPTION_CLASS, isActive);
        option.setAttribute('aria-selected', String(isActive));
    });

    cards.forEach((card) => {
        const isActive = card.dataset.segmentCard === segment;

        card.setAttribute('aria-hidden', String(!isActive));
        card.classList.toggle(ACTIVE_CARD_CLASS, isActive);
    });

    section.dataset.activeSegment = segment;
}

function getNextSegment(currentSegment, direction) {
    const currentIndex = SEGMENTS.indexOf(currentSegment);
    const nextIndex = (currentIndex + direction + SEGMENTS.length) % SEGMENTS.length;

    return SEGMENTS[nextIndex];
}

export function initializeRoleBenefitsSection(root = document) {
    const section = root.querySelector('[data-role-benefits-section]');

    if (!section || section.dataset.roleBenefitsInitialized === 'true') return;

    const options = section.querySelectorAll('[data-segment-option]');
    const previousButton = section.querySelector('[data-role-benefits-prev]');
    const nextButton = section.querySelector('[data-role-benefits-next]');

    options.forEach((option) => {
        option.addEventListener('click', () => {
            setActiveSegment(section, option.dataset.segmentOption);
        });
    });

    previousButton?.addEventListener('click', () => {
        const currentSegment = section.dataset.activeSegment || 'producer';
        const nextSegment = getNextSegment(currentSegment, -1);
        setActiveSegment(section, nextSegment);
    });

    nextButton?.addEventListener('click', () => {
        const currentSegment = section.dataset.activeSegment || 'producer';
        const nextSegment = getNextSegment(currentSegment, 1);
        setActiveSegment(section, nextSegment);
    });

    setActiveSegment(section, 'producer');

    section.dataset.roleBenefitsInitialized = 'true';
}