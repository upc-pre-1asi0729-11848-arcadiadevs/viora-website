import { initializePricingParallaxIntro } from "./parallax-intro/parallax-intro.js";
import { initializePricingPlansPanel } from "./pricing-plans-panel/pricing-plans-panel.js";
import { initializeReferralsInfo } from "./referrals-info/referrals-info.js";

const PRICING_PARALLAX_INTRO_PATH =
  "./src/presentation/components/plans-trial-affiliates-section/parallax-intro/parallax-intro.html";
const PRICING_PLANS_PANEL_PATH =
  "./src/presentation/components/plans-trial-affiliates-section/pricing-plans-panel/pricing-plans-panel.html";
const REFERRALS_INFO_PATH =
  "./src/presentation/components/plans-trial-affiliates-section/referrals-info/referrals-info.html";

async function loadHtml(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Could not load HTML file: ${path}`);
  }

  return response.text();
}

export async function initializePlansTrialAffiliatesSection() {
  const parallaxIntroContainer = document.querySelector(
    "#pricing-parallax-intro-container",
  );

  if (!parallaxIntroContainer) return;

  parallaxIntroContainer.innerHTML = await loadHtml(
    PRICING_PARALLAX_INTRO_PATH,
  );

  const pricingPlansPanelContainer = document.querySelector(
    "#pricing-plans-panel-container",
  );

  if (pricingPlansPanelContainer) {
    pricingPlansPanelContainer.innerHTML = await loadHtml(
      PRICING_PLANS_PANEL_PATH,
    );
    initializePricingPlansPanel();
  }
  const referralsInfoContainer = document.querySelector(
    "#referrals-info-container",
  );

  if (referralsInfoContainer) {
    referralsInfoContainer.innerHTML = await loadHtml(REFERRALS_INFO_PATH);
    initializeReferralsInfo();
  }

  initializePricingParallaxIntro();
}
