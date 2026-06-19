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
    const maxBottomOffset = viewportHeight / 2 - 40;
    const sideX = Math.min(viewportWidth * 0.34, 420);

    const smallWidth = Math.min(viewportWidth * 0.18, 205);
    const smallHeight = Math.min(viewportHeight * 0.34, 285);
    const centerWidth = Math.min(viewportWidth * 0.3, 330);
    const centerHeight = Math.min(viewportHeight * 0.48, 410);

    const stackY = Math.min(viewportHeight * 0.22, 175);
    const raisedY = Math.min(viewportHeight * 0.02, 24);
    const sideY = Math.min(viewportHeight * 0.17, 145);
    const centerY = Math.min(viewportHeight * 0.22, maxBottomOffset - centerHeight / 2);

    return {
        stack: [
            {
                x: -18,
                y: stackY + 30,
                width: smallWidth,
                height: smallHeight,
                scale: 0.86,
                rotate: -4,
                opacity: 0,
            },
            {
                x: 0,
                y: stackY,
                width: centerWidth,
                height: centerHeight,
                scale: 0.98,
                rotate: 0,
                opacity: 1,
            },
            {
                x: 18,
                y: stackY + 24,
                width: smallWidth,
                height: smallHeight,
                scale: 0.86,
                rotate: 4,
                opacity: 0,
            },
        ],
        raised: [
            {
                x: -42,
                y: raisedY + 28,
                width: smallWidth,
                height: smallHeight,
                scale: 0.92,
                rotate: -3,
                opacity: 0.2,
            },
            {
                x: 0,
                y: raisedY,
                width: centerWidth,
                height: centerHeight,
                scale: 1,
                rotate: 0,
                opacity: 1,
            },
            {
                x: 42,
                y: raisedY + 20,
                width: smallWidth,
                height: smallHeight,
                scale: 0.92,
                rotate: 3,
                opacity: 0.2,
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

function getReducedMotionLayouts() {
    const layouts = getResponsiveLayouts();
    return layouts.spread;
}

function attachPricingParallaxIntro(section) {
    if (section.dataset.pricingParallaxInitialized === 'true') return;

    const images = Array.from(section.querySelectorAll('[data-pricing-parallax-image]'));
    if (images.length === 0) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let ticking = false;

    function update() {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);
        const rawProgress = clamp(-rect.top / scrollableDistance, 0, 1);

        if (reducedMotion.matches) {
            const finalLayouts = getReducedMotionLayouts();
            section.style.setProperty('--pricing-text-first-opacity', '0');
            section.style.setProperty('--pricing-text-first-y', '-16px');
            section.style.setProperty('--pricing-text-second-opacity', '1');
            section.style.setProperty('--pricing-text-second-y', '0px');
            images.forEach((image, index) => setImageState(image, finalLayouts[index]));
            ticking = false;
            return;
        }

        const riseProgress = easeOutCubic(clamp(rawProgress / 0.46, 0, 1));
        const spreadProgress = easeInOutCubic(clamp((rawProgress - 0.36) / 0.48, 0, 1));
        const firstTextFade = clamp((rawProgress - 0.2) / 0.18, 0, 1);
        const secondTextFade = clamp((rawProgress - 0.36) / 0.18, 0, 1);

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
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reducedMotion.addEventListener?.('change', requestUpdate);

    update();
    section.dataset.pricingParallaxInitialized = 'true';
}

export function initializePricingParallaxIntro(root = document) {
    const section = root.querySelector('[data-pricing-parallax-intro]');
    if (!section) return;

    attachPricingParallaxIntro(section);
}
