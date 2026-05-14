import { isSoundGlobalOn } from '../sound.js';

const HOVER_SOUND_PATH = './assets/audio/hover-soft-click.mp3';
const DEFAULT_VOLUME = 0.10;

let hoverAudio = null;

function getHoverAudio() {
  if (!hoverAudio) {
    hoverAudio = new Audio(HOVER_SOUND_PATH);
    hoverAudio.preload = 'auto';
    hoverAudio.volume = DEFAULT_VOLUME;
  }

  return hoverAudio;
}

function playHoverSound() {
  if (!isSoundGlobalOn()) return;

  const audio = getHoverAudio();

  const soundNode = audio.cloneNode();
  soundNode.volume = audio.volume;
  soundNode.play().catch(() => {
    /*
     * Browser may block sound until the user interacts with the page.
     * Since the SOUND button is user-triggered, this should rarely happen.
     */
  });
}

function attachHoverSoundEffect(element) {
  if (element.dataset.hoverSoundInitialized === 'true') return;

  element.addEventListener('mouseenter', playHoverSound);
  element.dataset.hoverSoundInitialized = 'true';
}

export function initializeHoverSoundEffect(root = document) {
  const elements = root.querySelectorAll('[data-hover-sound]');
  elements.forEach(attachHoverSoundEffect);
}