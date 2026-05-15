const ACTIVE_CARD_CLASS = 'problem-card--active';

function activateProblemCard(selectedCard, cards) {
    cards.forEach((card) => {
        const trigger = card.querySelector('[data-problem-card-trigger]');

        const isSelected = card === selectedCard;

        card.classList.toggle(ACTIVE_CARD_CLASS, isSelected);

        if (trigger) {
            trigger.setAttribute('aria-expanded', String(isSelected));
        }
    });
}

export function initializeProblemCardsSection() {
    const accordion = document.querySelector('[data-problem-cards-accordion]');

    if (!accordion) return;

    const cards = Array.from(accordion.querySelectorAll('[data-problem-card]'));

    cards.forEach((card) => {
        const trigger = card.querySelector('[data-problem-card-trigger]');

        if (!trigger) return;

        trigger.addEventListener('click', () => {
            activateProblemCard(card, cards);
        });
    });
}






export function initializeProblemSolutionSection() {
    // Replaced with static HTML
}