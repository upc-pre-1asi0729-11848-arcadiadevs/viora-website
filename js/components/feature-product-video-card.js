const ACTIVE_CLASS = 'feature-product-video-card--active';
const MORE_OPEN_CLASS = 'feature-product-video-card--more-open';

function playVideo(video) {
    const playPromise = video.play();

    if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
    }
}

function setRangeFill(range, value) {
    range.style.setProperty('--range-value', `${value}%`);
}

function setControlsEnabled(mediaControls, isEnabled) {
    mediaControls.setAttribute('aria-hidden', String(!isEnabled));

    mediaControls.querySelectorAll('input').forEach((input) => {
        input.disabled = !isEnabled;
    });
}

function initializeCard(card) {
    const video = card.querySelector('[data-feature-product-video]');
    const playButton = card.querySelector('[data-feature-product-play]');
    const playIcon = card.querySelector('[data-feature-product-play-icon]');
    const moreButton = card.querySelector('[data-feature-product-more-toggle]');
    const morePanel = card.querySelector('[data-feature-product-more]');
    const mediaControls = card.querySelector('[data-feature-product-media-controls]');
    const progress = card.querySelector('[data-feature-product-progress]');
    const volume = card.querySelector('[data-feature-product-volume]');

    if (!video || !playButton || !mediaControls || !progress || !volume) return;

    let hasActivated = false;
    let isUserPaused = false;
    let isInView = false;

    setControlsEnabled(mediaControls, false);
    setRangeFill(progress, 0);
    setRangeFill(volume, Number(volume.value) * 100);

    video.volume = Number(volume.value);
    video.muted = true;

    function syncProgress() {
        if (!video.duration) return;

        const value = (video.currentTime / video.duration) * 100;
        progress.value = String(value);
        setRangeFill(progress, value);
    }

    function syncPlayIcon() {
        if (!playIcon) return;

        if (!hasActivated) {
            playIcon.src = './assets/icons/play.svg';
            return;
        }

        playIcon.src = video.paused ? './assets/icons/play.svg' : './assets/icons/pause.svg';
    }

    function resetIntroVideo({ shouldPlay = false } = {}) {
        hasActivated = false;
        isUserPaused = false;

        card.classList.remove(ACTIVE_CLASS);
        setControlsEnabled(mediaControls, false);

        video.pause();
        video.loop = true;
        video.muted = true;
        video.currentTime = 0;

        progress.value = '0';
        setRangeFill(progress, 0);
        syncPlayIcon();

        if (shouldPlay) {
            playVideo(video);
        }
    }

    function enterInteractiveMode() {
        hasActivated = true;
        isUserPaused = false;

        card.classList.add(ACTIVE_CLASS);
        card.classList.remove(MORE_OPEN_CLASS);
        if (moreButton) moreButton.setAttribute('aria-expanded', 'false');
        if (morePanel) morePanel.setAttribute('aria-hidden', 'true');
        setControlsEnabled(mediaControls, true);

        video.loop = false;
        video.muted = false;
        video.volume = Number(volume.value);
        video.currentTime = 0;

        syncProgress();
        playVideo(video);
        syncPlayIcon();
    }

    playButton.addEventListener('click', () => {
        if (!hasActivated) {
            enterInteractiveMode();
            return;
        }

        if (video.paused) {
            isUserPaused = false;
            playVideo(video);
        } else {
            isUserPaused = true;
            video.pause();
        }

        syncPlayIcon();
    });

    if (moreButton && morePanel) {
        moreButton.addEventListener('click', () => {
            const isOpen = !card.classList.contains(MORE_OPEN_CLASS);

            resetIntroVideo({ shouldPlay: !isOpen && isInView });
            card.classList.toggle(MORE_OPEN_CLASS, isOpen);
            moreButton.setAttribute('aria-expanded', String(isOpen));
            morePanel.setAttribute('aria-hidden', String(!isOpen));
        });
    }

    progress.addEventListener('input', () => {
        if (!video.duration) return;

        const value = Number(progress.value);
        video.currentTime = (value / 100) * video.duration;
        setRangeFill(progress, value);
    });

    volume.addEventListener('input', () => {
        const value = Number(volume.value);

        video.volume = value;
        video.muted = value === 0;
        setRangeFill(volume, value * 100);
    });

    video.addEventListener('timeupdate', syncProgress);
    video.addEventListener('play', syncPlayIcon);
    video.addEventListener('pause', syncPlayIcon);
    video.addEventListener('ended', syncPlayIcon);

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                isInView = entry.isIntersecting;

                if (entry.isIntersecting) {
                    if (card.classList.contains(MORE_OPEN_CLASS)) return;

                    if (!hasActivated) {
                        video.loop = true;
                        video.muted = true;
                        playVideo(video);
                    } else if (!isUserPaused) {
                        playVideo(video);
                    }
                } else if (!hasActivated) {
                    video.pause();
                } else {
                    video.pause();
                    syncPlayIcon();
                }
            });
        }, { threshold: 0.45 });

        observer.observe(card);
    } else {
        video.loop = true;
        playVideo(video);
    }
}

export function initializeFeatureProductVideoCard() {
    const cards = document.querySelectorAll('[data-feature-product-card]');

    cards.forEach(initializeCard);
}
