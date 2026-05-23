import { i18n } from '../i18n.js';
import { initializeAboutAmbientSound } from './about-ambient-sound.js';

const MEMBERS = [
    { id: 1, firstName: 'Victor', lastName: 'Paredes', roleKey: 'teamMembers.role', img: './assets/images/about/members/enhanced/victor-enh.png', badge: './assets/logos/arcadia-dark-green.png' },
    { id: 2, firstName: 'Fabrizio', lastName: 'Santi', roleKey: 'teamMembers.role', img: './assets/images/about/members/enhanced/fabricio-enh.png', badge: './assets/logos/arcadia-dark-green.png' },
    { id: 3, firstName: 'Jahat', lastName: 'Trinidad', roleKey: 'teamMembers.role', img: './assets/images/about/members/enhanced/jahat-enh.png', badge: './assets/logos/arcadia-dark-green.png' },
    { id: 4, firstName: 'Diana', lastName: 'Li', roleKey: 'teamMembers.role', img: './assets/images/about/members/enhanced/diana-enh.png', badge: './assets/logos/arcadia-dark-green.png' },
    { id: 5, firstName: 'Piero', lastName: 'Espada', roleKey: 'teamMembers.role', img: './assets/images/about/members/enhanced/piero-enh.png', badge: './assets/logos/arcadia-dark-green.png' },
    { id: 6, firstName: 'Josue', lastName: 'Carpio', roleKey: 'teamMembers.role', img: './assets/images/about/members/enhanced/josue-enh.png', badge: './assets/logos/arcadia-dark-green.png' }
];

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3);
}

function attachScrollTextReveal(textElement) {
    if (!textElement || textElement.dataset.scrollTextRevealInitialized === 'true') return null;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let words = [];
    let ticking = false;

    function setWordState(word, reveal) {
        const eased = easeOutCubic(reveal);
        const alpha = 0.18 + eased * 0.82;
        const y = (1 - eased) * 0.45;
        const blur = (1 - eased) * 0.18;

        word.style.setProperty('--word-alpha', alpha.toFixed(3));
        word.style.setProperty('--word-y', `${y.toFixed(3)}em`);
        word.style.setProperty('--word-blur', `${blur.toFixed(3)}em`);
    }

    function revealAll() {
        words.forEach((word) => setWordState(word, 1));
    }

    function buildWords() {
        const text = textElement.textContent.replace(/\s+/g, ' ').trim();
        textElement.innerHTML = '';
        words = [];

        text.split(/(\s+)/).forEach((token) => {
            if (!token) return;

            if (/^\s+$/.test(token)) {
                textElement.appendChild(document.createTextNode(token));
                return;
            }

            const word = document.createElement('span');
            word.className = 'about-presentation__reveal-word';
            word.textContent = token;
            textElement.appendChild(word);
            words.push(word);
        });
    }

    function updateReveal() {
        if (reducedMotion.matches) {
            revealAll();
            ticking = false;
            return;
        }

        const rect = textElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const revealStart = viewportHeight * 0.99;
        const revealDistance = Math.max(viewportHeight * 0.38, rect.height * 1.4);
        const progress = clamp((revealStart - rect.top) / revealDistance, 0, 1);
        const staggerRange = 0.72;
        const softness = 0.2;
        const lastIndex = Math.max(words.length - 1, 1);

        words.forEach((word, index) => {
            const wordStart = (index / lastIndex) * staggerRange;
            const reveal = clamp((progress - wordStart) / softness, 0, 1);
            setWordState(word, reveal);
        });

        ticking = false;
    }

    function requestRevealUpdate() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateReveal);
        }
    }

    function rebuild() {
        buildWords();
        requestRevealUpdate();
    }

    buildWords();
    window.addEventListener('scroll', requestRevealUpdate, { passive: true });
    window.addEventListener('resize', requestRevealUpdate);
    requestRevealUpdate();

    textElement.dataset.scrollTextRevealInitialized = 'true';

    return {
        rebuild,
    };
}

export function initializeTeamMembersPanel(root = document) {
    const section = root.querySelector('[data-team-members-panel]');

    if (!section || section.dataset.teamMembersInitialized === 'true') return;

    initializeAboutAmbientSound();

    const track = section.querySelector('[data-team-slider-track]');
    const viewport = section.querySelector('[data-team-slider-viewport]');
    const progressBar = section.querySelector('[data-team-slider-progress-bar]');

    if (!track || !viewport) return;

    // 1. Build and Inject Card DOM Dynamically
    track.innerHTML = '';
    MEMBERS.forEach((member) => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.dataset.teamCard = 'true';

        const roleText = i18n.getTranslationValue(member.roleKey) || 'Group ArcadiaDevs';

        card.innerHTML = `
            <div class="team-card__image-container">
                <img class="team-card__img" src="${member.img}" alt="${member.firstName} ${member.lastName}" draggable="false" />
                <div class="team-card__overlay"></div>
                <div class="team-card__badge">
                    <img src="${member.badge}" alt="Arcadia Logo" draggable="false" />
                </div>
                <div class="team-card__info">
                    <h3 class="team-card__name">${member.firstName} ${member.lastName}</h3>
                    <p class="team-card__role" data-team-members-role data-i18n="${member.roleKey}">${roleText}</p>
                </div>
            </div>
        `;
        track.appendChild(card);
    });

    // 2. Drag Functionality (Pointer Events)
    let isDragging = false;
    let startX = 0;
    let startTranslate = 0;
    let currentTranslate = 0;

    function getTrackStepSize() {
        const firstCard = track.querySelector('.team-card');
        if (!firstCard) return 0;
        const cardRect = firstCard.getBoundingClientRect();
        const styles = window.getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap || 0);
        return cardRect.width + gap;
    }

    function getMaxTranslate() {
        const viewportStyles = window.getComputedStyle(viewport);
        const horizontalPadding =
            parseFloat(viewportStyles.paddingLeft || 0) + parseFloat(viewportStyles.paddingRight || 0);

        return Math.max(0, track.scrollWidth - viewport.clientWidth + horizontalPadding);
    }

    function updateProgressBar(translate) {
        if (!progressBar) return;
        const maxT = getMaxTranslate();
        if (maxT <= 0) {
            progressBar.style.width = '100%';
            return;
        }
        const percentage = clamp((Math.abs(translate) / maxT) * 100, 0, 100);
        progressBar.style.width = `${percentage}%`;
    }

    function setTranslate(value, animated = true) {
        const maxT = getMaxTranslate();
        const clampedVal = clamp(value, -maxT, 0);

        track.style.transition = animated
            ? 'transform 380ms cubic-bezier(0.22, 1, 0.36, 1)'
            : 'none';

        track.style.transform = `translate3d(${clampedVal}px, 0, 0)`;
        track.dataset.translateX = String(clampedVal);
        currentTranslate = clampedVal;

        updateProgressBar(clampedVal);
    }

    function snapToNearest() {
        const step = getTrackStepSize();
        if (step <= 0) return;

        const maxT = getMaxTranslate();
        const current = Math.abs(currentTranslate);
        const snapPoints = [0, maxT];

        for (let point = step; point < maxT; point += step) {
            snapPoints.push(point);
        }

        const nearestPoint = snapPoints.reduce((nearest, point) => {
            return Math.abs(point - current) < Math.abs(nearest - current) ? point : nearest;
        }, 0);

        setTranslate(-nearestPoint, true);
    }

    function handlePointerDown(e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;

        isDragging = true;
        startX = e.clientX;
        startTranslate = Number(track.dataset.translateX || 0);

        track.style.transition = 'none';
        viewport.setPointerCapture(e.pointerId);
    }

    function handlePointerMove(e) {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        setTranslate(startTranslate + deltaX, false);
    }

    function handlePointerUp(e) {
        if (!isDragging) return;
        isDragging = false;

        try {
            viewport.releasePointerCapture(e.pointerId);
        } catch (err) {
            // Safe release capture
        }

        snapToNearest();
    }

    viewport.addEventListener('pointerdown', handlePointerDown);
    viewport.addEventListener('pointermove', handlePointerMove);
    viewport.addEventListener('pointerup', handlePointerUp);
    viewport.addEventListener('pointercancel', handlePointerUp);

    // Initial positioning and sizing
    setTimeout(() => {
        setTranslate(0, false);
    }, 50);

    window.addEventListener('resize', () => {
        const step = getTrackStepSize();
        if (step > 0) {
            const index = Math.round(Math.abs(currentTranslate) / step);
            const targetVal = -index * step;
            setTranslate(targetVal, false);
        } else {
            setTranslate(currentTranslate, false);
        }
    });

    // 3. Dual Presentation Switcher & Carousel
    const videoBtn = section.querySelector('[data-pres-switch="video"]');
    const imageBtn = section.querySelector('[data-pres-switch="image"]');
    const presentation = section.querySelector('.about-presentation');
    const videoEl = section.querySelector('[data-presentation-video]');
    const carouselEl = section.querySelector('[data-presentation-carousel]');
    const slides = section.querySelectorAll('.about-presentation__slide');
    const footerTextReveal = attachScrollTextReveal(section.querySelector('[data-scroll-text-reveal]'));

    let carouselInterval = null;
    let activeSlideIdx = 0;

    function startCarousel() {
        if (carouselInterval) return;
        slides.forEach((slide, idx) => {
            if (idx === activeSlideIdx) {
                slide.classList.add('about-presentation__slide--active');
            } else {
                slide.classList.remove('about-presentation__slide--active');
            }
        });

        carouselInterval = setInterval(() => {
            slides[activeSlideIdx].classList.remove('about-presentation__slide--active');
            activeSlideIdx = (activeSlideIdx + 1) % slides.length;
            slides[activeSlideIdx].classList.add('about-presentation__slide--active');
        }, 3000);
    }

    function stopCarousel() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }

    function switchMode(mode) {
        if (mode === 'video') {
            videoBtn?.classList.add('about-presentation__toggle-btn--active');
            imageBtn?.classList.remove('about-presentation__toggle-btn--active');
            presentation?.classList.remove('about-presentation--image-active');
            
            videoEl?.classList.add('about-presentation__video--active');
            carouselEl?.classList.remove('about-presentation__carousel--active');

            if (videoEl) {
                videoEl.play().catch((err) => console.log('Autoplay interrupted:', err));
            }
            stopCarousel();
        } else if (mode === 'image') {
            imageBtn?.classList.add('about-presentation__toggle-btn--active');
            videoBtn?.classList.remove('about-presentation__toggle-btn--active');
            presentation?.classList.add('about-presentation--image-active');

            carouselEl?.classList.add('about-presentation__carousel--active');
            videoEl?.classList.remove('about-presentation__video--active');

            if (videoEl) {
                videoEl.pause();
            }
            startCarousel();
        }
    }

    videoBtn?.addEventListener('click', () => switchMode('video'));
    imageBtn?.addEventListener('click', () => switchMode('image'));

    // Handle initial state setup
    if (videoBtn && videoBtn.classList.contains('about-presentation__toggle-btn--active')) {
        switchMode('video');
    } else {
        switchMode('image');
    }

    // Subscribe to language switches to force update any active items
    i18n.subscribe(() => {
        footerTextReveal?.rebuild();
    });

    section.dataset.teamMembersInitialized = 'true';
}
