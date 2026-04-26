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
            const response = await fetch(`./src/infrastructure/i18n/locales/${lang}.json`);
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
        
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const keys = el.getAttribute('data-i18n').split('.');
            let value = this.translations;
            for (const key of keys) {
                if (value) value = value[key];
            }
            if (value && typeof value === 'string') {
                el.innerHTML = value.replace(/\n/g, '<br />');
            }
        });
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notifySubscribers() {
        this.subscribers.forEach(cb => cb(this.currentLang));
    }
}

export const i18n = new I18nService();