
import { i18n } from '../i18n.js';
const MEMBERS = [
    { id: 1, firstName: 'Victor', lastName: 'Paredes', roleKey: 'teamMembers.role', img: './assets/images/about/members/victor.png', badge: './assets/logos/arcadia-dark-green.png' },
    { id: 2, firstName: 'Fabricio', lastName: 'Santi', roleKey: 'teamMembers.role', img: './assets/images/about/members/fabricio.png', badge: './assets/logos/arcadia-dark-green.png' },
    { id: 3, firstName: 'Jahat', lastName: 'Trinidad', roleKey: 'teamMembers.role', img: './assets/images/about/members/jahat.png', badge: './assets/logos/arcadia-dark-green.png' },
    { id: 4, firstName: 'Diana', lastName: 'Li', roleKey: 'teamMembers.role', img: './assets/images/about/members/diana.png', badge: './assets/logos/arcadia-dark-green.png' },
    { id: 5, firstName: 'Piero', lastName: 'Espada', roleKey: 'teamMembers.role', img: './assets/images/about/members/piero.png', badge: './assets/logos/arcadia-dark-green.png' },
    { id: 6, firstName: 'Josue', lastName: 'Carpio', roleKey: 'teamMembers.role', img: './assets/images/about/members/josue.png', badge: './assets/logos/arcadia-dark-green.png' }
];

const TOTAL = MEMBERS.length;

function getCardStyle(index, currentIndex) {
    let offset = (index - currentIndex + TOTAL) % TOTAL;
    if (offset > 2) offset = offset - TOTAL;

    const isTop = offset === 0;

    return {
        transform: `translate(${offset * 20}px, ${offset * 20}px) scale(${1 - Math.abs(offset) * 0.05}) rotate(${offset * 4}deg)`,
        zIndex: 10 - Math.abs(offset),
        opacity: Math.abs(offset) <= 2 ? (1 - Math.abs(offset) * 0.2) : 0,
        boxShadow: isTop ? '0 20px 40px rgba(0,0,0,0.4)' : '0 10px 20px rgba(0,0,0,0.2)',
    };
}

function applyCardStyles(cards, currentIndex) {
    cards.forEach((card, index) => {
        const style = getCardStyle(index, currentIndex);

        card.style.transform = style.transform;
        card.style.zIndex = style.zIndex;
        card.style.opacity = style.opacity;
        card.style.boxShadow = style.boxShadow;
    });
}

function animateText(element, updateFn) {
    element.classList.add('team-members-panel__fade-out');

    setTimeout(() => {
        updateFn();
        element.classList.remove('team-members-panel__fade-out');
        element.classList.add('team-members-panel__fade-in');

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                element.classList.remove('team-members-panel__fade-in');
            });
        });
    }, 300);
}

function updateMemberInfo(section, member) {
    const firstNameEl = section.querySelector('.team-members-panel__first-name');
    const lastNameEl = section.querySelector('.team-members-panel__last-name');
    const roleEl = section.querySelector('[data-team-members-role]');
    const badgeImg = section.querySelector('[data-team-members-badge-img]');

    const nameEl = section.querySelector('[data-team-members-name]');

    animateText(nameEl, () => {
        firstNameEl.textContent = member.firstName;
        lastNameEl.textContent = member.lastName;
    });

    animateText(roleEl, () => {
        roleEl.textContent = i18n.getTranslationValue(member.roleKey) || member.roleKey;
    });

    if (badgeImg) {
        badgeImg.style.opacity = '0';
        setTimeout(() => {
            badgeImg.src = member.badge;
            badgeImg.style.opacity = '1';
        }, 250);
    }
}

export function initializeTeamMembersPanel(root = document) {
    const section = root.querySelector('[data-team-members-panel]');

    if (!section || section.dataset.teamMembersInitialized === 'true') return;

    const stack = section.querySelector('[data-team-members-stack]');
    const prevBtn = section.querySelector('[data-team-members-prev]');
    const nextBtn = section.querySelector('[data-team-members-next]');

    // Build card DOM
    const cards = MEMBERS.map((member) => {
        const card = document.createElement('div');
        card.className = 'team-members-panel__card';

        const img = document.createElement('img');
        img.className = 'team-members-panel__card-img';
        img.src = member.img;
        img.alt = `${member.firstName} ${member.lastName}`;
        img.draggable = false;

        card.appendChild(img);
        stack.appendChild(card);

        return card;
    });

    let currentIndex = 0;

    function goTo(index) {
        currentIndex = ((index % TOTAL) + TOTAL) % TOTAL;
        applyCardStyles(cards, currentIndex);
        updateMemberInfo(section, MEMBERS[currentIndex]);
    }

    // Initial render
    applyCardStyles(cards, currentIndex);

    const firstMember = MEMBERS[0];
    const firstNameEl = section.querySelector('.team-members-panel__first-name');
    const lastNameEl = section.querySelector('.team-members-panel__last-name');
    const roleEl = section.querySelector('[data-team-members-role]');

    firstNameEl.textContent = firstMember.firstName;
    lastNameEl.textContent = firstMember.lastName;
    roleEl.textContent = i18n.getTranslationValue(firstMember.roleKey) || firstMember.roleKey;

    // Event listeners
    prevBtn?.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn?.addEventListener('click', () => goTo(currentIndex + 1));

    // Subscribe to language changes to update current info
    i18n.subscribe(() => {
        roleEl.textContent = i18n.getTranslationValue(MEMBERS[currentIndex].roleKey) || MEMBERS[currentIndex].roleKey;
    });

    section.dataset.teamMembersInitialized = 'true';
}
