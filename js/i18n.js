export class I18nService {
    constructor() {
        this.currentLang = localStorage.getItem('appLang') || 'en';
        this.translations = null;
        this.subscribers = [];
    }

    async init() {
        await this.loadTranslations(this.currentLang);
        this.applyTranslations();
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`./js/i18n/${lang}.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.translations = await response.json();
            this.currentLang = lang;
            localStorage.setItem('appLang', lang);
        } catch (error) {
            console.error(`Failed to load translations for ${lang}`, error);
        }
    }

    async setLanguage(lang) {
        if (lang === this.currentLang) return;
        await this.loadTranslations(lang);
        this.applyTranslations();
        this.notifySubscribers();
    }

    toggleLanguage() {
        const nextLang = this.currentLang === 'en' ? 'es' : 'en';
        this.setLanguage(nextLang);
    }

    applyTranslations() {
        if (!this.translations) return;

        document.documentElement.lang = this.currentLang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const value = this.getTranslationValue(el.getAttribute('data-i18n'));
            if (typeof value === 'string') {
                el.innerHTML = value.replace(/\n/g, '<br />');
            }
        });

        document.querySelectorAll('[data-i18n-aria-label], [data-i18n-aria]').forEach(el => {
            const attr = el.hasAttribute('data-i18n-aria-label') ? 'data-i18n-aria-label' : 'data-i18n-aria';
            const value = this.getTranslationValue(el.getAttribute(attr));
            if (typeof value === 'string') {
                el.setAttribute('aria-label', value);
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const value = this.getTranslationValue(el.getAttribute('data-i18n-placeholder'));
            if (typeof value === 'string') {
                el.setAttribute('placeholder', value);
            }
        });

        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const value = this.getTranslationValue(el.getAttribute('data-i18n-title'));
            if (typeof value === 'string') {
                el.setAttribute('title', value);
            }
        });
    }

    getTranslationValue(path) {
        if (!path) return null;
        const keys = path.split('.');
        let value = this.translations;
        for (const key of keys) {
            if (value && value.hasOwnProperty(key)) {
                value = value[key];
            } else {
                return null;
            }
        }
        return value;
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notifySubscribers() {
        this.subscribers.forEach(cb => cb(this.currentLang));
    }
}

export const i18n = new I18nService();
