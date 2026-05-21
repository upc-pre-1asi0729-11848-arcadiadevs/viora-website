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

function initializeFloatingSoundToggle(root = document) {
    const floatingToggle = root.querySelector('[data-floating-sound-toggle]');
    const floatingWrap = root.querySelector('[data-floating-sound-toggle-wrap]');
    const heroSection = document.querySelector('.hero-section');
    const floatingElement = floatingWrap || floatingToggle;

    if (!floatingElement || floatingElement.dataset.floatingSoundInitialized === 'true') return;

    floatingElement.dataset.floatingSoundInitialized = 'true';

    const setFloatingVisibility = (isVisible) => {
        floatingElement.classList.toggle('floating-sound-toggle-wrap--visible', isVisible);
    };

    if (!heroSection || !('IntersectionObserver' in window)) {
        setFloatingVisibility(true);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            setFloatingVisibility(!entry.isIntersecting);
        });
    }, {
        threshold: 0.01
    });

    observer.observe(heroSection);
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

        if (button.dataset.soundToggleInitialized === 'true') return;
        button.dataset.soundToggleInitialized = 'true';

        button.addEventListener('click', () => {
            toggleSoundGlobalState();
        });
    });

    initializeFloatingSoundToggle(root);
}
