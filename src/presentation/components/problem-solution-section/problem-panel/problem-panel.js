function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function lerp(start, end, progress) {
    return start + (end - start) * progress;
}

function easeInOutCubic(progress) {
    return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function attachVideoExpandEffect(section) {
    if (section.dataset.videoExpandInitialized === 'true') return;

    const sticky = section.querySelector('[data-video-expand-sticky]');
    const placeholder = section.querySelector('[data-video-expand-placeholder]');
    const media = section.querySelector('[data-video-expand-media]');

    if (!sticky || !placeholder || !media) return;

    let ticking = false;

    function update() {
        const sectionRect = section.getBoundingClientRect();
        const stickyRect = sticky.getBoundingClientRect();
        const placeholderRect = placeholder.getBoundingClientRect();

        const viewportHeight = window.innerHeight;
        const scrollableDistance = section.offsetHeight - viewportHeight;

        // We multiply by 1.8 so the animation completes before the end of the section,
        // allowing the video to stay fully expanded while the user continues to scroll.
        const rawProgress = clamp(
            (-sectionRect.top / scrollableDistance) * 1.8,
            0,
            1
        );

        const progress = easeInOutCubic(rawProgress);

        const start = {
            x: placeholderRect.left - stickyRect.left,
            y: placeholderRect.top - stickyRect.top,
            width: placeholderRect.width,
            height: placeholderRect.height,
            radius: 16,
        };

        const end = {
            x: 0,
            y: 0,
            width: stickyRect.width,
            height: stickyRect.height,
            radius: 0,
        };

        const mediaX = lerp(start.x, end.x, progress);
        const mediaY = lerp(start.y, end.y, progress);
        const mediaWidth = lerp(start.width, end.width, progress);
        const mediaHeight = lerp(start.height, end.height, progress);
        const mediaRadius = lerp(start.radius, end.radius, progress);

        const introOpacity = clamp(1 - rawProgress * 2.2, 0, 1);
        const introY = rawProgress * -32;

        const captionOpacity = clamp((rawProgress - 0.62) / 0.28, 0, 1);
        const captionY = lerp(24, 0, captionOpacity);

        const overlayOpacity = clamp((rawProgress - 0.35) / 0.45, 0, 0.82);

        section.style.setProperty('--media-x', `${mediaX}px`);
        section.style.setProperty('--media-y', `${mediaY}px`);
        section.style.setProperty('--media-width', `${mediaWidth}px`);
        section.style.setProperty('--media-height', `${mediaHeight}px`);
        section.style.setProperty('--media-radius', `${mediaRadius}px`);

        section.style.setProperty('--intro-opacity', String(introOpacity));
        section.style.setProperty('--intro-y', `${introY}px`);

        section.style.setProperty('--caption-opacity', String(captionOpacity));
        section.style.setProperty('--caption-y', `${captionY}px`);
        section.style.setProperty('--media-overlay-opacity', String(overlayOpacity));

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

    section.dataset.videoExpandInitialized = 'true';
}

export function initializeProblemPanel(root = document) {
    const sections = root.querySelectorAll('[data-video-expand-section]');

    sections.forEach(attachVideoExpandEffect);
}