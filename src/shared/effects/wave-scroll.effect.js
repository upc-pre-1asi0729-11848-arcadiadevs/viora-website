function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function attachWaveScrollEffect(element) {
  if (element.dataset.waveScrollInitialized === 'true') return;

  let ticking = false;

  function updateWave() {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const start = viewportHeight;
    const end = 0;

    const progress = clamp((start - rect.top) / (start - end), 0, 1);

    const waveHeight = progress * 6;
    const translateY = progress * -2.5;

    element.style.setProperty('--wave-height', `${waveHeight}vw`);
    element.style.setProperty('--wave-section-y', `${translateY}vh`);

    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateWave);
    }
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);

  updateWave();

  element.dataset.waveScrollInitialized = 'true';
}

export function initializeWaveScrollEffect(root = document) {
  const elements = root.querySelectorAll('[data-wave-scroll]');
  elements.forEach(attachWaveScrollEffect);
}