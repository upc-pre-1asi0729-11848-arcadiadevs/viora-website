import { i18n } from '../i18n.js';

export function initializeLandingHeader() {
    // ── Language toggle: separate EN / ES click handlers ──
    const allLangButtons = document.querySelectorAll('.landing-header__language-button');

    function updateAllLangButtons(lang) {
        allLangButtons.forEach(btn => {
            const enSpan = btn.querySelector('[data-lang-switch="en"]');
            const esSpan = btn.querySelector('[data-lang-switch="es"]');
            if (enSpan) enSpan.innerHTML = lang === 'en' ? '<b>EN</b>' : 'EN';
            if (esSpan) esSpan.innerHTML = lang === 'es' ? '<b>ES</b>' : 'ES';
        });
    }

    allLangButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const langSpan = e.target.closest('[data-lang-switch]');
            if (langSpan) {
                const targetLang = langSpan.dataset.langSwitch;
                i18n.setLanguage(targetLang);
            } else {
                // If clicked on the button but not on a specific span (like the separator), toggle it
                i18n.toggleLanguage();
            }
        });
    });

    // Update visual state on language change
    i18n.subscribe((lang) => {
        updateAllLangButtons(lang);
    });

    // Set initial state
    updateAllLangButtons(i18n.currentLang);

    const navLinks = document.querySelectorAll('.landing-header__nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            navLinks.forEach(nav => {
                nav.classList.remove('landing-header__nav-link--active');
            });

            this.classList.add('landing-header__nav-link--active');

            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                if (targetId) {
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });

    /* ═══ Drawer Logic ═══ */
    initializeDrawer();
}


function initializeDrawer() {
    const toggleBtn  = document.querySelector('[data-drawer-toggle]');
    const closeBtn   = document.querySelector('[data-drawer-close]');
    const backdrop   = document.querySelector('[data-drawer-backdrop]');
    const drawer     = document.querySelector('[data-drawer]');
    const drawerLinks = document.querySelectorAll('[data-drawer-link]');

    if (!toggleBtn || !drawer) return;

    function openDrawer() {
        drawer.classList.add('is-open');
        backdrop?.classList.add('is-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        document.body.classList.add('drawer-open');
    }

    function closeDrawer() {
        drawer.classList.remove('is-open');
        backdrop?.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('drawer-open');
    }

    // Toggle on hamburger click
    toggleBtn.addEventListener('click', () => {
        const isOpen = drawer.classList.contains('is-open');

        if (isOpen) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    // Close on close button
    closeBtn?.addEventListener('click', closeDrawer);

    // Close on backdrop click
    backdrop?.addEventListener('click', closeDrawer);

    // Close on drawer link click + scroll to section
    drawerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            closeDrawer();

            if (href && href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);

                if (targetId) {
                    const targetSection = document.getElementById(targetId);

                    if (targetSection) {
                        // Small delay so drawer animation starts before scroll
                        setTimeout(() => {
                            targetSection.scrollIntoView({ behavior: 'smooth' });
                        }, 150);
                    }
                }
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
            closeDrawer();
        }
    });
}