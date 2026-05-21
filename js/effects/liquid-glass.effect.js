export function initializeLiquidGlassEffect(root = document) {
    const glassElements = root.querySelectorAll('[data-liquid-glass]');

    glassElements.forEach((element) => {
        if (element.dataset.liquidGlassInitialized === 'true') return;

        element.addEventListener('pointermove', (event) => {
            const rect = element.getBoundingClientRect();

            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            element.style.setProperty('--glass-x', `${x}%`);
            element.style.setProperty('--glass-y', `${y}%`);
        });

        element.dataset.liquidGlassInitialized = 'true';
    });
}
