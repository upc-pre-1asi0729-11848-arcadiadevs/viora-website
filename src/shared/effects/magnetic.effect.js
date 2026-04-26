const DEFAULT_MAGNETIC_CONFIG = {
  strength: 0.45,
  max: 18,
  follow: 0.18,
  bounce: 1.25,
};

function clamp(value) {
  return Math.max(-1, Math.min(1, value));
}

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getMagneticConfig(element) {
  return {
    strength: Number(element.dataset.magneticStrength) || DEFAULT_MAGNETIC_CONFIG.strength,
    max: Number(element.dataset.magneticMax) || DEFAULT_MAGNETIC_CONFIG.max,
    follow: Number(element.dataset.magneticFollow) || DEFAULT_MAGNETIC_CONFIG.follow,
    bounce: Number(element.dataset.magneticBounce) || DEFAULT_MAGNETIC_CONFIG.bounce,
  };
}

function attachMagneticEffect(element) {
  if (element.dataset.magneticInitialized === 'true') return;

  let config = getMagneticConfig(element);

  let raf = 0;
  let isInside = false;

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  function animate() {
    currentX += (targetX - currentX) * config.follow;
    currentY += (targetY - currentY) * config.follow;

    element.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

    const stillMoving =
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05;

    if (isInside && stillMoving) {
      raf = requestAnimationFrame(animate);
    } else if (isInside) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  function handlePointerMove(event) {
    if (event.pointerType && event.pointerType !== 'mouse') return;

    isInside = true;
    config = getMagneticConfig(element);

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    const normalizedX = deltaX / (rect.width / 2);
    const normalizedY = deltaY / (rect.height / 2);

    targetX = clamp(normalizedX) * config.max * config.strength;
    targetY = clamp(normalizedY) * config.max * config.strength;

    element.style.transition = 'transform 0ms';

    if (!raf) raf = requestAnimationFrame(animate);
  }

  function handlePointerLeave() {
    isInside = false;

    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    targetX = 0;
    targetY = 0;
    currentX = 0;
    currentY = 0;

    const bounceCurve = clampNumber(
        1 + (config.bounce - 1) * 1.5,
        1,
        3.5
    ).toFixed(2);

    element.style.transition = `transform 600ms cubic-bezier(0.34, ${bounceCurve}, 0.64, 1)`;
    element.style.transform = 'translate3d(0px, 0px, 0)';
  }

  element.style.willChange = 'transform';

  element.addEventListener('pointermove', handlePointerMove);
  element.addEventListener('pointerleave', handlePointerLeave);

  element.dataset.magneticInitialized = 'true';
}

export function initializeMagneticEffect(root = document) {
  const magneticElements = root.querySelectorAll('[data-magnetic]');

  magneticElements.forEach((element) => {
    attachMagneticEffect(element);
  });
}