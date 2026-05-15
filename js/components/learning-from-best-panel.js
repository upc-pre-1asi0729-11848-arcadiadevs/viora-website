const BUBBLE_LAYOUT = [
    {
        x: '-36vw',
        y: '0vh',
        delay: 0,
        floatDelay: '0s',
        floatDuration: '2.5s',
    },
    {
        x: '-18vw',
        y: '-26vh',
        delay: 80,
        floatDelay: '0.1s',
        floatDuration: '2.2s',
    },
    {
        x: '-18vw',
        y: '26vh',
        delay: 160,
        floatDelay: '0.2s',
        floatDuration: '2.4s',
    },
    {
        x: '0vw',
        y: '-34vh',
        delay: 240,
        floatDelay: '0.3s',
        floatDuration: '2s',
    },
    {
        x: '0vw',
        y: '34vh',
        delay: 320,
        floatDelay: '0.4s',
        floatDuration: '2.3s',
    },
    {
        x: '18vw',
        y: '-26vh',
        delay: 400,
        floatDelay: '0.5s',
        floatDuration: '2.6s',
    },
    {
        x: '18vw',
        y: '26vh',
        delay: 480,
        floatDelay: '0.6s',
        floatDuration: '2.2s',
    },
    {
        x: '36vw',
        y: '0vh',
        delay: 560,
        floatDelay: '0.7s',
        floatDuration: '2.5s',
    },
];

function applyBubbleLayout(section) {
    const bubbles = section.querySelectorAll('[data-learning-bubble]');

    bubbles.forEach((bubble, index) => {
        const config = BUBBLE_LAYOUT[index];

        if (!config) return;

        bubble.style.setProperty('--bubble-x', config.x);
        bubble.style.setProperty('--bubble-y', config.y);
        bubble.style.setProperty('--bubble-delay', `${config.delay}ms`);
        bubble.style.setProperty('--bubble-float-delay', config.floatDelay);
        bubble.style.setProperty('--bubble-float-duration', config.floatDuration);
    });
}

function attachLearningFromBestPanel(section) {
    if (section.dataset.learningFromBestInitialized === 'true') return;

    applyBubbleLayout(section);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    section.classList.add('is-visible');
                }
            });
        },
        {
            threshold: 0.35,
        }
    );

    observer.observe(section);

    section.dataset.learningFromBestInitialized = 'true';
}

export function initializeLearningFromBestPanel(root = document) {
    const section = root.querySelector('[data-learning-from-best-panel]');

    if (!section) return;

    attachLearningFromBestPanel(section);
}