import { initializeAboutMissionPanel } from './about-mission-panel/about-mission-panel.js';
import { initializeTeamMembersPanel } from './team-members-panel/team-members-panel.js';
import { initializeLearningFromBestPanel } from './learning-from-best-panel/learning-from-best-panel.js';

const ABOUT_MISSION_PANEL_PATH =
    './src/presentation/components/about-section/about-mission-panel/about-mission-panel.html';
const TEAM_MEMBERS_PANEL_PATH =
    './src/presentation/components/about-section/team-members-panel/team-members-panel.html';
const LEARNING_FROM_BEST_PANEL_PATH =
    './src/presentation/components/about-section/learning-from-best-panel/learning-from-best-panel.html';

async function loadHtml(path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Could not load HTML file: ${path}`);
    }

    return response.text();
}

export async function initializeAboutSection() {
    const aboutMissionPanelContainer = document.querySelector('#about-mission-panel-container');
    const teamMembersPanelContainer  = document.querySelector('#team-members-panel-container');
    const learningFromBestPanelContainer = document.querySelector('#learning-from-best-panel-container');

    if (aboutMissionPanelContainer) {
        aboutMissionPanelContainer.innerHTML = await loadHtml(ABOUT_MISSION_PANEL_PATH);
        initializeAboutMissionPanel();
    }

    if (teamMembersPanelContainer) {
        teamMembersPanelContainer.innerHTML = await loadHtml(TEAM_MEMBERS_PANEL_PATH);
        initializeTeamMembersPanel();
    }
    if (learningFromBestPanelContainer) {
        learningFromBestPanelContainer.innerHTML = await loadHtml(LEARNING_FROM_BEST_PANEL_PATH);
        initializeLearningFromBestPanel();
    }

}