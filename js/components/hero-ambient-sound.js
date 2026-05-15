import { isSoundGlobalOn } from '../sound.js';

const HERO_SOUND_PATH = './assets/audio/hero-sound-background.mp3';
const MAX_VOLUME = 0.50;
const FADE_STEP = 0.005;
const FADE_INTERVAL = 50; // ms

let ambientAudio = null;
let isHeroVisible = false;
let fadeIntervalId = null;

function getAmbientAudio() {
    if (!ambientAudio) {
        ambientAudio = new Audio(HERO_SOUND_PATH);
        ambientAudio.loop = true;
        ambientAudio.volume = 0;
        ambientAudio.preload = 'auto';
    }
    return ambientAudio;
}

function updateAudioState() {
    const shouldPlay = isSoundGlobalOn() && isHeroVisible;
    const audio = getAmbientAudio();

    clearInterval(fadeIntervalId);

    if (shouldPlay) {
        if (audio.paused) {
            audio.play().catch(() => {

            });
        }
        
        // Fade in
        fadeIntervalId = setInterval(() => {
            if (audio.volume + FADE_STEP < MAX_VOLUME) {
                audio.volume += FADE_STEP;
            } else {
                audio.volume = MAX_VOLUME;
                clearInterval(fadeIntervalId);
            }
        }, FADE_INTERVAL);
    } else {
        // Fade out
        fadeIntervalId = setInterval(() => {
            if (audio.volume - FADE_STEP > 0) {
                audio.volume -= FADE_STEP;
            } else {
                audio.volume = 0;
                audio.pause();
                clearInterval(fadeIntervalId);
            }
        }, FADE_INTERVAL);
    }
}

export function initializeHeroAmbientSound() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            isHeroVisible = entry.isIntersecting;
            updateAudioState();
        });
    }, {
        threshold: 0.1
    });

    observer.observe(heroSection);

    document.addEventListener('viora-sound-state-changed', updateAudioState);
}