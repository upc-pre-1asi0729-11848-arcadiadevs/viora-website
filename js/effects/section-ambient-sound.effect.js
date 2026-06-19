import { isSoundGlobalOn } from '../sound.js';

const DEFAULT_MAX_VOLUME = 0.50;
const DEFAULT_FADE_STEP = 0.005;
const DEFAULT_FADE_INTERVAL = 50;
const DEFAULT_THRESHOLD = 0.1;

export function initializeSectionAmbientSound({
    selector,
    audioPath,
    maxVolume = DEFAULT_MAX_VOLUME,
    fadeStep = DEFAULT_FADE_STEP,
    fadeInterval = DEFAULT_FADE_INTERVAL,
    threshold = DEFAULT_THRESHOLD,
}) {
    const section = document.querySelector(selector);
    if (!section || section.dataset.ambientSoundInitialized === 'true') return;

    let ambientAudio = null;
    let isSectionVisible = false;
    let fadeIntervalId = null;

    function getAmbientAudio() {
        if (!ambientAudio) {
            ambientAudio = new Audio(audioPath);
            ambientAudio.loop = true;
            ambientAudio.volume = 0;
            ambientAudio.preload = 'auto';
        }

        return ambientAudio;
    }

    function updateAudioState() {
        const shouldPlay = isSoundGlobalOn() && isSectionVisible;
        const audio = getAmbientAudio();

        clearInterval(fadeIntervalId);

        if (shouldPlay) {
            if (audio.paused) {
                audio.play().catch(() => {

                });
            }

            fadeIntervalId = setInterval(() => {
                if (audio.volume + fadeStep < maxVolume) {
                    audio.volume += fadeStep;
                } else {
                    audio.volume = maxVolume;
                    clearInterval(fadeIntervalId);
                }
            }, fadeInterval);
        } else {
            fadeIntervalId = setInterval(() => {
                if (audio.volume - fadeStep > 0) {
                    audio.volume -= fadeStep;
                } else {
                    audio.volume = 0;
                    audio.pause();
                    clearInterval(fadeIntervalId);
                }
            }, fadeInterval);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            isSectionVisible = entry.isIntersecting;
            updateAudioState();
        });
    }, {
        threshold,
    });

    observer.observe(section);
    document.addEventListener('viora-sound-state-changed', updateAudioState);

    section.dataset.ambientSoundInitialized = 'true';
}
