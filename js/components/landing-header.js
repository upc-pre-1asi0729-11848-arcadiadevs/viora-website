import { i18n } from '../i18n.js';

export function initializeLandingHeader() {
    // ── Language toggle: separate EN / ES click handlers ──
    const switchers = document.querySelectorAll('.landing-header__language-switcher');

    function updateAllLangButtons(lang) {
        switchers.forEach(switcher => {
            if (lang === 'es') {
                switcher.classList.add('landing-header__language-switcher--es');
                switcher.classList.remove('landing-header__language-switcher--en');
            } else {
                switcher.classList.add('landing-header__language-switcher--en');
                switcher.classList.remove('landing-header__language-switcher--es');
            }

            const enBtn = switcher.querySelector('[data-lang-switch="en"]');
            const esBtn = switcher.querySelector('[data-lang-switch="es"]');
            if (enBtn) {
                enBtn.classList.toggle('landing-header__language-btn--active', lang === 'en');
                enBtn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
            }
            if (esBtn) {
                esBtn.classList.toggle('landing-header__language-btn--active', lang === 'es');
                esBtn.setAttribute('aria-pressed', lang === 'es' ? 'true' : 'false');
            }
        });
    }

    switchers.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-lang-switch]');
            if (btn) {
                const targetLang = btn.dataset.langSwitch;
                i18n.setLanguage(targetLang);
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
    const navLinkList = Array.from(navLinks);

    function setActiveNavLink(targetId) {
        navLinkList.forEach(nav => {
            const isActive = nav.getAttribute('href') === `#${targetId}`;
            nav.classList.toggle('landing-header__nav-link--active', isActive);

            if (isActive) {
                nav.setAttribute('aria-current', 'page');
            } else {
                nav.removeAttribute('aria-current');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                if (targetId) {
                    setActiveNavLink(targetId);

                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });

    initializeActiveSectionTracking(navLinkList, setActiveNavLink);

    /* ═══ Drawer Logic ═══ */
    initializeDrawer();
}


function initializeActiveSectionTracking(navLinks, setActiveNavLink) {
    const trackedSections = navLinks
        .map(link => {
            const href = link.getAttribute('href');
            const id = href?.startsWith('#') ? href.substring(1) : '';
            const target = id ? document.getElementById(id) : null;

            if (!target) return null;

            const activationElement = id === 'pricing'
                ? target.closest('.plans-trial-affiliates-section') || target
                : target;

            return { id, element: activationElement };
        })
        .filter(Boolean);

    if (!trackedSections.length) return;

    let ticking = false;

    function getSectionTop(element) {
        return element.getBoundingClientRect().top + window.scrollY;
    }

    function updateActiveSection() {
        ticking = false;

        const activationY = window.scrollY + Math.min(window.innerHeight * 0.42, 360);
        let activeId = trackedSections[0].id;

        trackedSections.forEach(section => {
            if (getSectionTop(section.element) <= activationY) {
                activeId = section.id;
            }
        });

        setActiveNavLink(activeId);
    }

    function requestActiveSectionUpdate() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(updateActiveSection);
    }

    window.addEventListener('scroll', requestActiveSectionUpdate, { passive: true });
    window.addEventListener('resize', requestActiveSectionUpdate);
    requestActiveSectionUpdate();
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
