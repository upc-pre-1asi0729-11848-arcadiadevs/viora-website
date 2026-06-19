import { initializeSectionAmbientSound } from '../effects/section-ambient-sound.effect.js';

const ABOUT_SOUND_PATH = './assets/audio/about-us-sound-background.mp3';

export function initializeAboutAmbientSound() {
    initializeSectionAmbientSound({
        selector: '[data-team-members-panel]',
        audioPath: ABOUT_SOUND_PATH,
        maxVolume: 1,
        threshold: 0.18,
    });
}
