import { initializeHeroAmbientSound } from './hero-ambient-sound.js';

const MAX_BACKGROUND_MOVEMENT = 16;

export function initializeHeroSection() {
    initializeHeroAmbientSound();

    const heroSection = document.querySelector('.hero-section');
    const heroBackground = document.querySelector('[data-hero-background]');

    if (!heroSection || !heroBackground) return;

    heroSection.addEventListener('pointermove', (event) => {
        const rect = heroSection.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        const moveX = x * MAX_BACKGROUND_MOVEMENT;
        const moveY = y * MAX_BACKGROUND_MOVEMENT;

        heroBackground.style.setProperty('--hero-bg-x', `${moveX}px`);
        heroBackground.style.setProperty('--hero-bg-y', `${moveY}px`);
    });

    heroSection.addEventListener('pointerleave', () => {
        heroBackground.style.setProperty('--hero-bg-x', '0px');
        heroBackground.style.setProperty('--hero-bg-y', '0px');
    });
}