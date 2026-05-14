function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function lerp(start, end, progress) {
    return start + (end - start) * progress;
}

function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
}

function easeInOutCubic(progress) {
    return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function setImageState(image, state) {
    image.style.setProperty('--pricing-image-x', `${state.x}px`);
    image.style.setProperty('--pricing-image-y', `${state.y}px`);
    image.style.setProperty('--pricing-image-width', `${state.width}px`);
    image.style.setProperty('--pricing-image-height', `${state.height}px`);
    image.style.setProperty('--pricing-image-scale', String(state.scale));
    image.style.setProperty('--pricing-image-rotate', `${state.rotate}deg`);
    image.style.setProperty('--pricing-image-opacity', String(state.opacity));
}

function mixState(start, end, progress) {
    return {
        x: lerp(start.x, end.x, progress),
        y: lerp(start.y, end.y, progress),
        width: lerp(start.width, end.width, progress),
        height: lerp(start.height, end.height, progress),
        scale: lerp(start.scale, end.scale, progress),
        rotate: lerp(start.rotate, end.rotate, progress),
        opacity: lerp(start.opacity, end.opacity, progress),
    };
}

function getResponsiveLayouts() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // All y values are offsets from the image anchor (top: 50% = vertical center).
    // Positive y moves the image DOWN. We keep every card within the bottom half
    // of the viewport so nothing clips against overflow: hidden.
    // Max bottom = (viewportHeight / 2) - some padding (40px safe zone)
    const maxBottomOffset = viewportHeight / 2 - 40;

    const sideX = Math.min(viewportWidth * 0.34, 420);

    const smallWidth  = Math.min(viewportWidth * 0.17, 190);
    const smallHeight = Math.min(viewportHeight * 0.32, 270);

    const centerWidth  = Math.min(viewportWidth * 0.26, 290);
    const centerHeight = Math.min(viewportHeight * 0.44, 380);

    // Stack: all cards clustered near center, slightly below anchor

    const stackY   = Math.min(viewportHeight * 0.30, 250);

    // Raised: cards rise up toward center during first scroll phase
    const raisedY  = Math.min(viewportHeight * 0.06, 55);

    // Spread: side cards Y offset from anchor — ← sube para bajarlas al final del parallax
    const sideY    = Math.min(viewportHeight * 0.18, 155);
    // Center card Y — está limitado por maxBottomOffset para no clipear el borde inferior
    const centerY  = Math.min(viewportHeight * 0.22, maxBottomOffset - centerHeight / 2);

    return {
        stack: [
            {
                x: -16,
                y: stackY,
                width: smallWidth,
                height: smallHeight,
                scale: 0.9,
                rotate: -5,
                opacity: 0.96,
            },
            {
                x: 0,
                y: stackY + 14,
                width: centerWidth,
                height: centerHeight,
                scale: 0.95,
                rotate: 0,
                opacity: 1,
            },
            {
                x: 16,
                y: stackY + 6,
                width: smallWidth,
                height: smallHeight,
                scale: 0.9,
                rotate: 5,
                opacity: 0.96,
            },
        ],
        raised: [
            {
                x: -14,
                y: raisedY,
                width: smallWidth,
                height: smallHeight,
                scale: 0.94,
                rotate: -4,
                opacity: 1,
            },
            {
                x: 0,
                y: raisedY + 12,
                width: centerWidth,
                height: centerHeight,
                scale: 1,
                rotate: 0,
                opacity: 1,
            },
            {
                x: 14,
                y: raisedY + 4,
                width: smallWidth,
                height: smallHeight,
                scale: 0.94,
                rotate: 4,
                opacity: 1,
            },
        ],
        spread: [
            {
                x: -sideX,
                y: sideY,
                width: smallWidth,
                height: smallHeight,
                scale: 1,
                rotate: 0,
                opacity: 1,
            },
            {
                x: 0,
                y: centerY,
                width: centerWidth,
                height: centerHeight,
                scale: 1,
                rotate: 0,
                opacity: 1,
            },
            {
                x: sideX,
                y: sideY,
                width: smallWidth,
                height: smallHeight,
                scale: 1,
                rotate: 0,
                opacity: 1,
            },
        ],
    };
}

function attachPricingParallaxIntro(section) {
    if (section.dataset.pricingParallaxInitialized === 'true') return;

    const images = Array.from(section.querySelectorAll('[data-pricing-parallax-image]'));

    if (images.length === 0) return;

    let ticking = false;

    function update() {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollableDistance = section.offsetHeight - viewportHeight;

        const rawProgress = clamp(-rect.top / scrollableDistance, 0, 1);

        const riseProgress = easeOutCubic(clamp(rawProgress / 0.40, 0, 1));
        const spreadProgress = easeInOutCubic(clamp((rawProgress - 0.32) / 0.50, 0, 1));

        const firstTextFade = clamp((rawProgress - 0.14) / 0.20, 0, 1);
        const secondTextFade = clamp((rawProgress - 0.32) / 0.22, 0, 1);

        section.style.setProperty('--pricing-text-first-opacity', String(1 - firstTextFade));
        section.style.setProperty('--pricing-text-first-y', `${lerp(0, -28, firstTextFade)}px`);

        section.style.setProperty('--pricing-text-second-opacity', String(secondTextFade));
        section.style.setProperty('--pricing-text-second-y', `${lerp(28, 0, secondTextFade)}px`);

        const layouts = getResponsiveLayouts();

        images.forEach((image, index) => {
            const risingState = mixState(layouts.stack[index], layouts.raised[index], riseProgress);
            const finalState = mixState(risingState, layouts.spread[index], spreadProgress);

            setImageState(image, finalState);
        });

        ticking = false;
    }

    function requestUpdate() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    update();

    section.dataset.pricingParallaxInitialized = 'true';
}

export function initializePricingParallaxIntro(root = document) {
    const section = root.querySelector('[data-pricing-parallax-intro]');

    if (!section) return;

    attachPricingParallaxIntro(section);
}