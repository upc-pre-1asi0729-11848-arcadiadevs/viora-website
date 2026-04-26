import { initializeLandingHeader } from '../../components/landing-header/landing-header.js';
import { initializeHeroSection } from '../../components/hero-section/hero-section.js';
import { i18n } from '../../../infrastructure/i18n/i18n.service.js';
import { initializeLiquidGlassEffect } from '../../../shared/effects/liquid-glass.effect.js';
import { initializeMagneticEffect } from '../../../shared/effects/magnetic.effect.js';
import { initializeAboutIntroSection } from '../../components/about-intro-section/about-intro-section.js';
import { initializeSoundToggle } from '../../../application/services/sound.service.js';
import { initializeHoverSoundEffect } from '../../../shared/effects/hover-sound.effect.js';
import { initializeProblemCardsSection, initializeProblemSolutionSection } from '../../components/problem-solution-section/problem-solution-section.js';
import { initializeRoleBenefitsSection } from '../../components/role-benefits-section/role-benefits-section.js';
import { initializePlansTrialAffiliatesSection } from '../../components/plans-trial-affiliates-section/plans-trial-affiliates-section.js';
import { initializeAboutSection } from '../../components/about-section/about-section.js';
import { initializeTestimonialsSection } from '../../components/testimonials-section/testimonials-section.js';
import { initializeContactSection } from '../../components/contact-section/contact-section.js';
import { initializeFooterSection } from '../../components/footer-section/footer-section.js';
import {
    initializeSmoothScroll,
    refreshSmoothScrollLinks,
} from '../../../shared/effects/smooth-scroll.effect.js';

const LANDING_PAGE_PATH = './src/presentation/pages/landing-page/landing-page.html';
const LANDING_HEADER_PATH = './src/presentation/components/landing-header/landing-header.html';
const HERO_SECTION_PATH = './src/presentation/components/hero-section/hero-section.html';
const ABOUT_INTRO_SECTION_PATH = './src/presentation/components/about-intro-section/about-intro-section.html';
const PROBLEM_CARDS_SECTION_PATH = './src/presentation/components/problem-solution-section/problem-solution-section.html';
const ROLE_BENEFITS_SECTION_PATH = './src/presentation/components/role-benefits-section/role-benefits-section.html';
const PLANS_TRIAL_AFFILIATES_SECTION_PATH = './src/presentation/components/plans-trial-affiliates-section/plans-trial-affiliates-section.html';
const ABOUT_SECTION_PATH = './src/presentation/components/about-section/about-section.html';
const TESTIMONIALS_SECTION_PATH = './src/presentation/components/testimonials-section/testimonials-section.html';
const CONTACT_SECTION_PATH = './src/presentation/components/contact-section/contact-section.html';
const FOOTER_SECTION_PATH = './src/presentation/components/footer-section/footer-section.html';


async function loadHtml(path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Could not load HTML file: ${path}`);
    }

    return response.text();
}

export async function initializeLandingPage() {
    const root = document.querySelector('#landing-root');

    try {
        root.innerHTML = await loadHtml(LANDING_PAGE_PATH);

        const headerContainer = document.querySelector('#landing-header-container');
        const heroContainer = document.querySelector('#hero-section-container');
        const aboutIntroContainer = document.querySelector('#about-intro-section-container');
        const problemCardsContainer = document.querySelector('#problem-cards-section-container');
        const roleBenefitsContainer = document.querySelector('#role-benefits-section-container');
        const plansTrialAffiliatesContainer = document.querySelector('#plans-trial-affiliates-section-container');
        const aboutSectionContainer = document.querySelector('#about-section-container');
        const testimonialsSectionContainer = document.querySelector('#testimonials-section-container');
        const contactSectionContainer = document.querySelector('#contact-section-container');
        const footerSectionContainer = document.querySelector('#footer-section-container');


        aboutIntroContainer.innerHTML = await loadHtml(ABOUT_INTRO_SECTION_PATH);
        headerContainer.innerHTML = await loadHtml(LANDING_HEADER_PATH);
        heroContainer.innerHTML = await loadHtml(HERO_SECTION_PATH);
        problemCardsContainer.innerHTML = await loadHtml(PROBLEM_CARDS_SECTION_PATH);
        roleBenefitsContainer.innerHTML = await loadHtml(ROLE_BENEFITS_SECTION_PATH);
        plansTrialAffiliatesContainer.innerHTML = await loadHtml(PLANS_TRIAL_AFFILIATES_SECTION_PATH);
        aboutSectionContainer.innerHTML = await loadHtml(ABOUT_SECTION_PATH);
        testimonialsSectionContainer.innerHTML = await loadHtml(TESTIMONIALS_SECTION_PATH);
        contactSectionContainer.innerHTML = await loadHtml(CONTACT_SECTION_PATH);
        footerSectionContainer.innerHTML = await loadHtml(FOOTER_SECTION_PATH);

        initializeLandingHeader();
        initializeHeroSection();
        initializeAboutIntroSection();
        initializeProblemCardsSection();
        initializeRoleBenefitsSection();
        await initializeProblemSolutionSection();
        await initializePlansTrialAffiliatesSection();
        await initializeAboutSection();
        initializeTestimonialsSection();
        initializeContactSection();
        initializeFooterSection();

        initializeLiquidGlassEffect();
        initializeMagneticEffect();

        await i18n.init();

        initializeSoundToggle();
        initializeHoverSoundEffect();

        await initializeSmoothScroll();
        refreshSmoothScrollLinks();

    } catch (error) {
        console.error(error);
    }
}