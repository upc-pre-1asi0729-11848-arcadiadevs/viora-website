import { i18n } from './i18n.js';
import { initializeLiquidGlassEffect } from './effects/liquid-glass.effect.js';
import { initializeMagneticEffect } from './effects/magnetic.effect.js';
import { initializeHoverSoundEffect } from './effects/hover-sound.effect.js';
import './landing-button.js';
import { initializeSoundToggle } from './sound.js';

import { initializeLandingHeader } from './components/landing-header.js';
import { initializeHeroSection } from './components/hero-section.js';
import { initializeAboutIntroSection } from './components/about-intro-section.js';
import { initializeProblemCardsSection, initializeProblemSolutionSection } from './components/problem-solution-section.js';
import { initializeProblemPanel } from './components/problem-panel.js';
import { initializeSolutionPanel } from './components/solution-panel.js';
import { initializeExpectedOutcomesPanel } from './components/expected-outcomes-panel.js';
import { initializeRoleBenefitsSection } from './components/role-benefits-section.js';
import { initializePricingParallaxIntro } from './components/parallax-intro.js';
import { initializePricingPlansPanel } from './components/pricing-plans-panel.js';
import { initializeReferralsInfo } from './components/referrals-info.js';
import { initializeAboutMissionPanel } from './components/about-mission-panel.js';
import { initializeTeamMembersPanel } from './components/team-members-panel.js';
import { initializeLearningFromBestPanel } from './components/learning-from-best-panel.js';
import { initializeSegmentSummarySection } from './components/segment-summary-section.js';
import { initializeFinalCtaSection } from './components/final-cta-section.js';


import { initializeFooterSection } from './components/footer-section.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await i18n.init();
        initializeSoundToggle();

        initializeLiquidGlassEffect();
        initializeMagneticEffect();
        initializeHoverSoundEffect();

        
        initializeLandingHeader();
        initializeHeroSection();
        initializeAboutIntroSection();
        
        initializeProblemCardsSection();
        initializeProblemSolutionSection();
        initializeProblemPanel();
        initializeSolutionPanel();
        initializeExpectedOutcomesPanel();

        initializeRoleBenefitsSection();
        initializeSegmentSummarySection();
        
        initializePricingParallaxIntro();
        initializePricingPlansPanel();
        initializeReferralsInfo();
        
        initializeAboutMissionPanel();
        initializeTeamMembersPanel();
        initializeLearningFromBestPanel();
        initializeFinalCtaSection();



        initializeFooterSection();


    } catch (error) {
        console.error(error);
    }
});
