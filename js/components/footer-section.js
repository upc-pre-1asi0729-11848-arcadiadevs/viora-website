function attachFooterNewsletter(section) {
    const form = section.querySelector('[data-footer-newsletter-form]');

    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const input = form.querySelector('input[type="email"]');

        if (!input || !input.value.trim()) return;

        input.value = '';
    });
}

export function initializeFooterSection(root = document) {
    const section = root.querySelector('[data-footer-section]');

    if (!section || section.dataset.footerInitialized === 'true') return;

    attachFooterNewsletter(section);

    section.dataset.footerInitialized = 'true';
}