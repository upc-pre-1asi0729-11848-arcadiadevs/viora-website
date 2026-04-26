export function initializeLiquidGlassEffect() {
    const glassElements = document.querySelectorAll('[data-liquid-glass]');

    glassElements.forEach((element) => {
        element.addEventListener('pointermove', (event) => {
            const rect = element.getBoundingClientRect();

            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            element.style.setProperty('--glass-x', `${x}%`);
            element.style.setProperty('--glass-y', `${y}%`);
        });
    });
}