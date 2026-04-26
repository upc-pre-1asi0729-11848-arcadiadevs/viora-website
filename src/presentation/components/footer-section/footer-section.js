const FOOTER_BADGE_TEXTURE = './assets/logos/viora-isotipo-white.png';

function getMatter() {
    return window.Matter;
}

function clearFooterMatter(instance) {
    const Matter = getMatter();

    if (!Matter || !instance) return;

    const { Render, Runner, Engine } = Matter;

    if (instance.render) {
        Render.stop(instance.render);
    }

    if (instance.runner) {
        Runner.stop(instance.runner);
    }

    if (instance.engine) {
        Engine.clear(instance.engine);
    }

    if (instance.render?.canvas) {
        instance.render.canvas.remove();
    }

    if (instance.resizeHandler) {
        window.removeEventListener('resize', instance.resizeHandler);
    }
}

function createFooterMatter(container) {
    const Matter = getMatter();

    if (!Matter || !container) return null;

    const {
        Engine,
        Render,
        Runner,
        Mouse,
        MouseConstraint,
        Composite,
        Bodies,
        Body,
    } = Matter;

    const isMobile = window.innerWidth <= 768;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || (isMobile ? 360 : 520);


    const SPRITE_SCALE = isMobile ? 0.06 : 0.12;
    const BALL_COUNT   = isMobile ? 14 : 18;
    const BALL_RADIUS  = Math.round(540 * SPRITE_SCALE);

    const engine = Engine.create({
        gravity: {
            x: 0,
            y: isMobile ? 2.0 : 1.3,
        },
    });

    const world = engine.world;

    const render = Render.create({
        element: container,
        engine,
        options: {
            width,
            height,
            background: 'transparent',
            wireframes: false,
            pixelRatio: 1,
        },
    });

    const wallOptions = {
        isStatic: true,
        render: {
            visible: false,
        },
    };

    const ground    = Bodies.rectangle(width / 2, height + 32, width * 2, 64, wallOptions);
    const leftWall  = Bodies.rectangle(-32, height / 2, 64, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 32, height / 2, 64, height * 2, wallOptions);
    const ceiling   = Bodies.rectangle(width / 2, -1200, width * 2, 64, wallOptions);

    Composite.add(world, [ground, leftWall, rightWall, ceiling]);

    const balls = Array.from({ length: BALL_COUNT }, (_, index) => {
        const x = 60 + Math.random() * Math.max(width - 120, 120);
        const y = -(Math.random() * 800 + 80 + index * 24);

        return Bodies.circle(x, y, BALL_RADIUS, {
            restitution: 0.5,
            friction: 0.1,
            frictionAir: 0.001,
            density: 0.002,
            render: {
                sprite: {
                    texture: FOOTER_BADGE_TEXTURE,
                    xScale: SPRITE_SCALE,
                    yScale: SPRITE_SCALE,
                },
            },
        });
    });

    Composite.add(world, balls);

    const mouse = Mouse.create(render.canvas);

    const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false,
            },
        },
    });

    Composite.add(world, mouseConstraint);

    render.mouse = mouse;
    const canvasEl = mouseConstraint.mouse.element;

    canvasEl.removeEventListener('mousewheel', mouseConstraint.mouse.mousewheel);
    canvasEl.removeEventListener('DOMMouseScroll', mouseConstraint.mouse.mousewheel);
    canvasEl.removeEventListener('wheel', mouseConstraint.mouse.mousewheel);

    canvasEl.style.touchAction = 'pan-y';

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    function handleResize() {
        const newWidth  = container.clientWidth || window.innerWidth;
        const newHeight = container.clientHeight || height;

        render.canvas.width  = newWidth;
        render.canvas.height = newHeight;
        render.options.width  = newWidth;
        render.options.height = newHeight;

        Body.setPosition(ground, {
            x: newWidth / 2,
            y: newHeight + 32,
        });

        Body.setPosition(leftWall, {
            x: -32,
            y: newHeight / 2,
        });

        Body.setPosition(rightWall, {
            x: newWidth + 32,
            y: newHeight / 2,
        });

        Body.setPosition(ceiling, {
            x: newWidth / 2,
            y: -1200,
        });
    }

    window.addEventListener('resize', handleResize);

    return {
        engine,
        render,
        runner,
        resizeHandler: handleResize,
    };
}

function attachFooterMatter(section) {
    const container = section.querySelector('[data-footer-matter]');

    if (!container || section.dataset.footerMatterInitialized === 'true') return;

    let matterInstance = null;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                matterInstance = createFooterMatter(container);
                section.dataset.footerMatterInitialized = 'true';
                observer.disconnect();
            });
        },
        {
            threshold: 0.18,
        }
    );

    observer.observe(section);

    section.dataset.cleanupFooterMatter = () => {
        clearFooterMatter(matterInstance);
    };
}

function attachFooterNewsletter(section) {
    const form = section.querySelector('[data-footer-newsletter-form]');

    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const input = form.querySelector('input[type="email"]');

        if (!input || !input.value.trim()) return;

        input.value = '';
    });
}

export function initializeFooterSection(root = document) {
    const section = root.querySelector('[data-footer-section]');

    if (!section || section.dataset.footerInitialized === 'true') return;

    attachFooterMatter(section);
    attachFooterNewsletter(section);

    section.dataset.footerInitialized = 'true';
}