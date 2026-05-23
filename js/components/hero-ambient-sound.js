import { initializeSectionAmbientSound } from '../effects/section-ambient-sound.effect.js';

const HERO_SOUND_PATH = './assets/audio/hero-sound-background.mp3';

export function initializeHeroAmbientSound() {
    initializeSectionAmbientSound({
        selector: '.hero-section',
        audioPath: HERO_SOUND_PATH,
        maxVolume: 0.50,
        threshold: 0.1,
    });
}
