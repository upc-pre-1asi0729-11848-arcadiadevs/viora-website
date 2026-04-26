# Viora Website

Viora Website is the official landing page for **Viora**, a SaaS platform designed to support the intelligent management of olive production. The landing page communicates the product value proposition, target segments, pricing model, referral program, team mission, and contact channels through an immersive, interactive, and visually consistent web experience.

This project was developed as part of the Open Source course deliverables, following a modular frontend architecture based on HTML5, CSS3, JavaScript, reusable UI components, and interaction effects.

---

## About Viora

Viora helps olive growers and phytosanitary specialists make earlier, smarter, and more preventive decisions.

The platform combines:

- Satellite and climate-based monitoring.
- NDVI-based plot visibility.
- Epidemiological pest alerts.
- Chill portion tracking.
- Dynamic nutrition recommendations.
- Specialist marketplace access.
- Referral and affiliate ecosystem support.

The landing page presents this value proposition through a single-page experience focused on storytelling, conversion, and product understanding.

---

## Landing Page Sections

The website is structured into the following main sections:

### 1. Hero Section

Introduces Viora’s core value proposition with a visual olive-field background, Liquid Glass navigation, call-to-action buttons, language selector, and sound toggle.

Main features:

- Liquid Glass navbar.
- Magnetic CTA buttons.
- Cursor-based background movement.
- Language toggle.
- Sound toggle with animated wave icon.

---

### 2. About Intro Section

Presents a short introductory message about the modern olive ecosystem.

Main features:

- Infinite marquee text.
- Wave scroll transition.
- Smooth section overlap effect.
- Scroll-reactive movement.

---

### 3. Problem Cards Section

Explains the main challenges of traditional olive farming through expandable cards.

Covered problems:

- Unpredictable yields.
- Epidemiological pest threats.
- Climate volatility and ENSO impact.

Main features:

- Accordion-style problem cards.
- One active card at a time.
- Magnetic CTA buttons.
- Liquid Glass interactions.

---

### 4. Problem & Solution Section

A larger narrative section that shows the transition from problem awareness to preventive decision-making.

Sub-sections included:

- Expandable video problem panel.
- Draggable solution cards carousel.
- Expected outcomes parallax panel.

Main features:

- Scroll-based video expansion.
- Fullscreen cinematic video transition.
- Draggable solution carousel.
- Parallax videos and text.
- Metrics and expected outcomes.

---

### 5. Role Benefits Section

Presents the two primary user segments of Viora:

- Olive Producers.
- Phytosanitary Specialists.

Main features:

- Segment switcher.
- Dynamic segment cards.
- Character illustrations.
- Segment-specific CTAs.
- Smooth visual transitions.

---

### 6. Pricing, Trial & Affiliates Section

Presents the pricing model, trial access, and referral program.

Sub-sections included:

- Pricing parallax intro.
- Pricing plans panel.
- Referrals information carousel.

Main features:

- Scroll-based pricing intro.
- Monthly/yearly toggle.
- Producer and specialist pricing plans.
- Referral cards carousel.
- Reusable landing buttons.
- Liquid Glass CTA buttons.

---

### 7. About Section

Communicates the team identity and mission behind Viora.

Sub-sections included:

- About Mission Panel.
- Team Members Panel.
- Learning from the Best Panel.

Main features:

- Team mission storytelling.
- Parallax floating images.
- Team member card stack.
- Animated inspiration bubbles.
- ArcadiaDevs branding.

---

### 8. Footer Section

Provides navigation, newsletter subscription, social links, and brand closing visuals.

Main features:

- Large footer navigation links.
- Newsletter form.
- Social media links.
- Matter.js physics-based Viora badges.
- Interactive draggable footer particles.

---

## Technologies Used

This landing page was built using:

- **HTML5** for semantic structure.
- **CSS3** for styling, layout, responsiveness, animations, and reusable visual utilities.
- **JavaScript ES Modules** for modular behavior and interaction logic.
- **Lenis** for smooth scrolling.
- **Matter.js** for physics-based footer badge interactions.
- **JSON-based i18n** for English and Spanish language support.
- **Vercel** for deployment.

---

## Main Interaction Effects

The landing page includes several interactive and immersive effects:

- Smooth scrolling with Lenis.
- Liquid Glass buttons and navigation.
- Magnetic buttons and CTA interactions.
- Hover sound effects.
- Animated sound wave toggle.
- Infinite marquee text.
- Wave scroll transitions.
- Scroll-based parallax effects.
- Scroll-based video expansion.
- Draggable cards and carousels.
- Physics-based badge animation in the footer.
- Dynamic language switching.
- Dynamic pricing and segment switching.

---

## Internationalization

The website supports two languages:

- English
- Spanish

Translations are managed through JSON files located in the i18n infrastructure layer.

```text
src/infrastructure/i18n/
├── i18n.service.js
└── locales/
    ├── en.json
    └── es.json
