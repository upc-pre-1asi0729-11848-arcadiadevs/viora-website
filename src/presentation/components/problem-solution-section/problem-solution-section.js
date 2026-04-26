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

import { initializeProblemPanel } from './problem-panel/problem-panel.js';
import { initializeSolutionPanel } from './solution-panel/solution-panel.js';
import { initializeExpectedOutcomesPanel } from './expected-outcomes-panel/expected-outcomes-panel.js';


const PROBLEM_PANEL_PATH =
    './src/presentation/components/problem-solution-section/problem-panel/problem-panel.html';

const SOLUTION_PANEL_PATH =
    './src/presentation/components/problem-solution-section/solution-panel/solution-panel.html';

const EXPECTED_OUTCOMES_PANEL_PATH =
    './src/presentation/components/problem-solution-section/expected-outcomes-panel/expected-outcomes-panel.html';

async function loadHtml(path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Could not load HTML file: ${path}`);
    }

    return response.text();
}

export async function initializeProblemSolutionSection() {
    const problemPanelContainer = document.querySelector('#problem-panel-container');
    const solutionPanelContainer = document.querySelector('#solution-panel-container');
    const expectedOutcomesPanelContainer = document.querySelector('#expected-outcomes-panel-container');


    if (problemPanelContainer) {
        problemPanelContainer.innerHTML = await loadHtml(PROBLEM_PANEL_PATH);
        initializeProblemPanel();
    }

    if (solutionPanelContainer) {
        solutionPanelContainer.innerHTML = await loadHtml(SOLUTION_PANEL_PATH);
        initializeSolutionPanel();
    }
    if (expectedOutcomesPanelContainer) {
        expectedOutcomesPanelContainer.innerHTML = await loadHtml(EXPECTED_OUTCOMES_PANEL_PATH);
        initializeExpectedOutcomesPanel();
    }
}