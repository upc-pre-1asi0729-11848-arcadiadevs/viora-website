import { i18n } from '../i18n.js';
const ACTIVE_PLAN_CLASS = 'pricing-plan--active';
const ACTIVE_BILLING_CLASS = 'pricing-plans-panel__billing-option--active';

const PLANS = ['producer', 'specialist'];


function getNextIndex(currentIndex, direction) {
    return (currentIndex + direction + PLANS.length) % PLANS.length;
}

function setActivePlan(section, planName) {
    const plans = section.querySelectorAll('[data-pricing-plan]');
    const counter = section.querySelector('[data-pricing-counter]');
    const activeIndex = PLANS.indexOf(planName);

    plans.forEach((plan) => {
        const isActive = plan.dataset.pricingPlan === planName;

        plan.classList.toggle(ACTIVE_PLAN_CLASS, isActive);
    });

    if (counter) {
        counter.textContent = `${activeIndex + 1}/${PLANS.length}`;
    }

    section.dataset.activePlan = planName;

    // Update prices for the current billing type
    const billingType = section.dataset.activeBilling || 'monthly';
    updatePrices(section, billingType);
}

function updatePrices(section, billingType) {
    const producerPriceEl = section.querySelector('[data-pricing-price-producer]');
    const specialistPriceEl = section.querySelector('[data-pricing-price-specialist]');

    if (producerPriceEl) {
        const priceKey = `pricingPlans.producer.price${billingType.charAt(0).toUpperCase() + billingType.slice(1)}`;
        producerPriceEl.textContent = i18n.getTranslationValue(priceKey) || '';
    }

    if (specialistPriceEl) {
        const priceKey = `pricingPlans.specialist.price${billingType.charAt(0).toUpperCase() + billingType.slice(1)}`;
        specialistPriceEl.textContent = i18n.getTranslationValue(priceKey) || '';
    }
}

function setBilling(section, billingType) {
    const options = section.querySelectorAll('[data-billing-option]');

    options.forEach((option) => {
        const isActive = option.dataset.billingOption === billingType;
        option.classList.toggle(ACTIVE_BILLING_CLASS, isActive);
    });

    section.dataset.activeBilling = billingType;
    updatePrices(section, billingType);
}

export function initializePricingPlansPanel(root = document) {
    const section = root.querySelector('[data-pricing-plans-panel]');

    if (!section || section.dataset.pricingPlansInitialized === 'true') return;

    const previousButton = section.querySelector('[data-pricing-prev]');
    const nextButton = section.querySelector('[data-pricing-next]');
    const billingOptions = section.querySelectorAll('[data-billing-option]');

    previousButton?.addEventListener('click', () => {
        const currentPlan = section.dataset.activePlan || 'producer';
        const currentIndex = PLANS.indexOf(currentPlan);
        const nextPlan = PLANS[getNextIndex(currentIndex, -1)];

        setActivePlan(section, nextPlan);
    });

    nextButton?.addEventListener('click', () => {
        const currentPlan = section.dataset.activePlan || 'producer';
        const currentIndex = PLANS.indexOf(currentPlan);
        const nextPlan = PLANS[getNextIndex(currentIndex, 1)];

        setActivePlan(section, nextPlan);
    });

    billingOptions.forEach((option) => {
        option.addEventListener('click', () => {
            setBilling(section, option.dataset.billingOption);
        });
    });

    setActivePlan(section, 'producer');
    setBilling(section, 'monthly');

    i18n.subscribe(() => {
        const currentBilling = section.dataset.activeBilling || 'monthly';
        updatePrices(section, currentBilling);
    });

    section.dataset.pricingPlansInitialized = 'true';
}