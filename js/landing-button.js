export class LandingButton extends HTMLElement {
    connectedCallback() {
        if (this.dataset.rendered === 'true') return;
        this.dataset.rendered = 'true';
        
        const variant = this.getAttribute('variant') || 'primary';
        const href = this.getAttribute('href') || '#';
        const i18nKey = this.getAttribute('i18n-key') || '';
        const liquidGlassColor = this.getAttribute('liquid-glass-color');
        const isIcon = this.hasAttribute('is-icon');
        const iconSrc = this.getAttribute('icon-src');
        
        const magneticMax = this.getAttribute('magnetic-max') || '18';
        const magneticFollow = this.getAttribute('magnetic-follow') || '0.18';
        const magneticBounce = this.getAttribute('magnetic-bounce') || '1.25';

        const content = this.innerHTML;

        const wrapper = document.createElement('span');
        wrapper.className = 'magnetic-target';
        wrapper.setAttribute('data-magnetic', '');
        wrapper.setAttribute('data-magnetic-strength', '1');
        wrapper.setAttribute('data-magnetic-max', magneticMax);
        wrapper.setAttribute('data-magnetic-follow', magneticFollow);
        wrapper.setAttribute('data-magnetic-bounce', magneticBounce);

        const a = document.createElement('a');
        a.className = `landing-button landing-button--${variant}`;
        if (isIcon) a.classList.add('landing-button--icon');
        
        a.href = href;
        a.setAttribute('data-hover-sound', '');
        
        if (i18nKey) {
            if (isIcon || iconSrc) {
                a.setAttribute('data-i18n-aria-label', i18nKey);
            } else {
                a.setAttribute('data-i18n', i18nKey);
            }
        }

        if (liquidGlassColor) {
            a.classList.add('liquid-glass', `liquid-glass--${liquidGlassColor}`);
            a.setAttribute('data-liquid-glass', '');
        }

        if (iconSrc) {
            a.innerHTML = `<img src="${iconSrc}" class="landing-button__icon-img" alt="" aria-hidden="true" />`;
        } else {
            a.innerHTML = content;
        }
        
        wrapper.appendChild(a);
        
        this.innerHTML = '';
        this.appendChild(wrapper);
    }
}

customElements.define('landing-button', LandingButton);
