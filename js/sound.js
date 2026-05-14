const SOUND_STORAGE_KEY = 'viora-sound-enabled';
const DEFAULT_SOUND_STATE = false;

let isSoundEnabled = getInitialSoundState();

function getInitialSoundState() {
    const savedValue = localStorage.getItem(SOUND_STORAGE_KEY);

    if (savedValue === null) return DEFAULT_SOUND_STATE;

    return savedValue === 'true';
}

function saveSoundState(value) {
    localStorage.setItem(SOUND_STORAGE_KEY, String(value));
}

function updateSoundToggleButton(button) {
    if (!button) return;

    button.dataset.soundEnabled = String(isSoundEnabled);
    button.setAttribute('aria-pressed', String(isSoundEnabled));

    const animatedWave = button.querySelector('[data-sound-wave-animated]');
    const flatWave = button.querySelector('[data-sound-wave-flat]');

    if (!animatedWave || !flatWave) return;

    animatedWave.style.display = isSoundEnabled ? '' : 'none';
    flatWave.style.display = isSoundEnabled ? 'none' : '';
}

export function isSoundGlobalOn() {
    return isSoundEnabled;
}

export function setSoundGlobalState(value) {
    isSoundEnabled = Boolean(value);
    saveSoundState(isSoundEnabled);

    const soundToggleButtons = document.querySelectorAll('[data-sound-toggle]');
    soundToggleButtons.forEach(updateSoundToggleButton);

    document.dispatchEvent(new CustomEvent('viora-sound-state-changed', {
        detail: { isEnabled: isSoundEnabled }
    }));
}

export function toggleSoundGlobalState() {
    setSoundGlobalState(!isSoundEnabled);
}

export function initializeSoundToggle(root = document) {
    const soundToggleButtons = root.querySelectorAll('[data-sound-toggle]');

    soundToggleButtons.forEach((button) => {
        updateSoundToggleButton(button);

        button.addEventListener('click', () => {
            toggleSoundGlobalState();
        });
    });
}