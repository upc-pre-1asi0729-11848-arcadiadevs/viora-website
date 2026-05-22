import { i18n } from '../i18n.js';

const FOOTER_BADGE_TEXTURE = './assets/logos/viora-isotipo-white.png';

const LEGAL_COPY = {
    en: {
        terms: {
            title: 'Terms of Service',
            updated: 'Last updated: May 2026',
            intro: [
                'Welcome to Viora, an AgTech platform designed for olive growers and phytosanitary specialists. By accessing or using our Landing Page, web application, or related services, you accept these Terms of Service.',
            ],
            sections: [
                {
                    title: '1. Use of the platform',
                    paragraphs: [
                        'Viora allows users to access digital tools for plot monitoring, climate and satellite data analysis, preventive alerts, agronomic recommendations, and connection with agricultural specialists.',
                        'The user agrees to use the platform responsibly, providing truthful, updated, and relevant information for the correct operation of the services.',
                    ],
                },
                {
                    title: '2. Registration and access',
                    paragraphs: [
                        'To use certain Viora features, the user may need to create an account as an Olive Grower or Phytosanitary Specialist. Each profile will have access to specific features according to its role within the platform.',
                        'The user is responsible for maintaining the confidentiality of their access credentials and for all activity carried out from their account.',
                    ],
                },
                {
                    title: '3. Agronomic and technical information',
                    paragraphs: [
                        'The data displayed by Viora, including climate indicators, NDVI, risk alerts, projections, and recommendations, is intended for informational purposes and decision support.',
                        'Viora does not replace in-person professional assessment and does not guarantee specific production results. Final decisions regarding agricultural management, treatments, or technical interventions are the responsibility of the user and/or the hired specialist.',
                    ],
                },
                {
                    title: '4. Connection between growers and specialists',
                    paragraphs: [
                        'Viora may facilitate the connection between olive growers and phytosanitary specialists through requests, technical proposals, quotes, or disclosure of contact data.',
                        'The professional relationship, economic agreements, execution of services, and results of the intervention are the responsibility of the parties involved.',
                    ],
                },
                {
                    title: '5. Permitted use',
                    paragraphs: [
                        'The user must not use Viora to publish false information, manipulate data, perform fraudulent actions, compromise third-party accounts, affect the operation of the platform, or use information for purposes contrary to the law.',
                    ],
                },
                {
                    title: '6. Service availability',
                    paragraphs: [
                        'Viora seeks to maintain a stable and secure experience. However, the platform may experience temporary interruptions due to maintenance, updates, technical failures, or unavailability of external services such as climate APIs, satellite data, maps, or payment systems.',
                    ],
                },
                {
                    title: '7. Intellectual property',
                    paragraphs: [
                        'The design, brand, content, interfaces, texts, graphics, visual components, and features of Viora belong to ArcadiaDevs or their respective owners. Copying, modifying, distributing, or exploiting these elements without prior authorization is not permitted.',
                    ],
                },
                {
                    title: '8. Changes to the terms',
                    paragraphs: [
                        'Viora may update these Terms of Service to reflect product improvements, legal changes, or operational adjustments. The updated version will be available on the platform.',
                    ],
                },
            ],
        },
        privacy: {
            title: 'Privacy Policy',
            updated: 'Last updated: May 2026',
            intro: [
                'At Viora, we value the privacy and security of our users information. This Privacy Policy explains what data we may collect, how we use it, and what measures we apply to protect it.',
            ],
            sections: [
                {
                    title: '1. Information we collect',
                    paragraphs: [
                        'Viora may collect information provided by the user, such as name, email address, phone number, selected role, professional profile data, contact information, and usage preferences.',
                        'For growers, we may also process information related to agricultural plots, approximate or georeferenced location, agronomic history, management records, alerts, symptom reports, and data associated with crop monitoring.',
                        'For specialists, we may process information related to professional experience, services offered, coverage area, availability, technical proposals, quotes, and received evaluations.',
                    ],
                },
                {
                    title: '2. Information generated by the platform',
                    paragraphs: [
                        'The platform may generate or process information derived from use of the service, such as climate indicators, satellite analysis, preventive alerts, yield projections, risk states, intervention traceability, and activity within the marketplace.',
                    ],
                },
                {
                    title: '3. Use of information',
                    paragraphs: ['We use information to:'],
                    bullets: [
                        'Create and manage user accounts.',
                        'Personalize the experience according to the users role.',
                        'Enable plot monitoring and agronomic analysis.',
                        'Generate alerts, recommendations, and preventive reports.',
                        'Facilitate the connection between growers and specialists.',
                        'Improve the quality, security, and operation of the platform.',
                        'Perform internal analysis to optimize the product experience.',
                    ],
                },
                {
                    title: '4. External services',
                    paragraphs: [
                        'Viora may integrate with external services to obtain climate data, satellite data, maps, storage, authentication, payments, or communications. These services may process information necessary to fulfill their function within the platform.',
                        'Viora seeks to use reliable providers and limit data sharing to what is strictly necessary for the operation of the service.',
                    ],
                },
                {
                    title: '5. Location and plot data',
                    paragraphs: [
                        'Plot location data is used to enable features such as climate monitoring, satellite analysis, territorial alerts, and connection with nearby specialists.',
                        'This information must not be used for purposes other than those related to the operation of Viora and the provision of agronomic services within the platform.',
                    ],
                },
                {
                    title: '6. Communication between users',
                    paragraphs: [
                        'When a grower accepts a proposal or quote from a specialist, Viora may enable the display of contact data necessary for both parties to coordinate the intervention outside or within the available channels.',
                        'The user must use this information only for purposes related to the requested service.',
                    ],
                },
                {
                    title: '7. Information security',
                    paragraphs: [
                        'We apply reasonable technical and organizational measures to protect data against unauthorized access, loss, alteration, or misuse. However, no digital system is completely infallible, so we recommend that users protect their credentials and keep their information updated.',
                    ],
                },
                {
                    title: '8. Data retention',
                    paragraphs: [
                        'Information will be retained as long as necessary to provide the service, fulfill operational obligations, resolve disputes, maintain traceability, or comply with applicable legal requirements.',
                    ],
                },
                {
                    title: '9. User rights',
                    paragraphs: [
                        'The user may request the update, correction, or deletion of their personal data, as well as make inquiries about the processing of their information through Vioras official contact channels.',
                    ],
                },
                {
                    title: '10. Changes to this policy',
                    paragraphs: [
                        'Viora may update this Privacy Policy due to changes in the platform, new services, security improvements, or legal requirements. The current version will be available on the Landing Page or in the web application.',
                    ],
                },
            ],
        },
    },
    es: {
        terms: {
            title: 'Términos de Servicio',
            updated: 'Última actualización: mayo de 2026',
            intro: [
                'Bienvenido a Viora, una plataforma AgTech orientada a productores olivareros y especialistas fitosanitarios. Al acceder o utilizar nuestra Landing Page, aplicación web o servicios relacionados, aceptas estos Términos de Servicio.',
            ],
            sections: [
                {
                    title: '1. Uso de la plataforma',
                    paragraphs: [
                        'Viora permite a los usuarios acceder a herramientas digitales para el monitoreo de parcelas, análisis de datos climáticos y satelitales, alertas preventivas, recomendaciones agronómicas y conexión con especialistas agrícolas.',
                        'El usuario se compromete a utilizar la plataforma de forma responsable, proporcionando información verdadera, actualizada y pertinente para el correcto funcionamiento de los servicios.',
                    ],
                },
                {
                    title: '2. Registro y acceso',
                    paragraphs: [
                        'Para utilizar determinadas funcionalidades de Viora, el usuario puede necesitar crear una cuenta como Productor Olivarero o Especialista Fitosanitario. Cada perfil tendrá acceso a funcionalidades específicas según su rol dentro de la plataforma.',
                        'El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de toda actividad realizada desde su cuenta.',
                    ],
                },
                {
                    title: '3. Información agronómica y técnica',
                    paragraphs: [
                        'Los datos mostrados por Viora, incluyendo indicadores climáticos, NDVI, alertas de riesgo, proyecciones y recomendaciones, tienen fines informativos y de apoyo a la toma de decisiones.',
                        'Viora no reemplaza la evaluación profesional presencial ni garantiza resultados productivos específicos. Las decisiones finales sobre manejo agrícola, tratamientos o intervenciones técnicas son responsabilidad del usuario y/o del especialista contratado.',
                    ],
                },
                {
                    title: '4. Conexión entre productores y especialistas',
                    paragraphs: [
                        'Viora puede facilitar la conexión entre productores olivareros y especialistas fitosanitarios mediante solicitudes, propuestas técnicas, cotizaciones o revelación de datos de contacto.',
                        'La relación profesional, acuerdos económicos, ejecución de servicios y resultados de la intervención son responsabilidad de las partes involucradas.',
                    ],
                },
                {
                    title: '5. Uso permitido',
                    paragraphs: [
                        'El usuario no debe utilizar Viora para publicar información falsa, manipular datos, realizar acciones fraudulentas, vulnerar cuentas de terceros, afectar el funcionamiento de la plataforma o usar la información con fines contrarios a la ley.',
                    ],
                },
                {
                    title: '6. Disponibilidad del servicio',
                    paragraphs: [
                        'Viora busca mantener una experiencia estable y segura. Sin embargo, la plataforma puede presentar interrupciones temporales por mantenimiento, actualizaciones, fallas técnicas o indisponibilidad de servicios externos como APIs climáticas, satelitales, mapas o sistemas de pago.',
                    ],
                },
                {
                    title: '7. Propiedad intelectual',
                    paragraphs: [
                        'El diseño, marca, contenidos, interfaces, textos, gráficos, componentes visuales y funcionalidades de Viora pertenecen a ArcadiaDevs o a sus respectivos titulares. No está permitido copiar, modificar, distribuir o explotar estos elementos sin autorización previa.',
                    ],
                },
                {
                    title: '8. Cambios en los términos',
                    paragraphs: [
                        'Viora puede actualizar estos Términos de Servicio para reflejar mejoras del producto, cambios legales o ajustes operativos. La versión actualizada estará disponible en la plataforma.',
                    ],
                },
            ],
        },
        privacy: {
            title: 'Política de Privacidad',
            updated: 'Última actualización: mayo de 2026',
            intro: [
                'En Viora valoramos la privacidad y seguridad de la información de nuestros usuarios. Esta Política de Privacidad explica qué datos podemos recopilar, cómo los usamos y qué medidas aplicamos para protegerlos.',
            ],
            sections: [
                {
                    title: '1. Información que recopilamos',
                    paragraphs: [
                        'Viora puede recopilar información proporcionada por el usuario, como nombre, correo electrónico, teléfono, rol seleccionado, datos de perfil profesional, información de contacto y preferencias de uso.',
                        'En el caso de productores, también podemos tratar información relacionada con parcelas agrícolas, ubicación aproximada o georreferenciada, historial agronómico, registros de manejo, alertas, reportes de síntomas y datos asociados al monitoreo del cultivo.',
                        'En el caso de especialistas, podemos tratar información relacionada con experiencia profesional, servicios ofrecidos, zona de cobertura, disponibilidad, propuestas técnicas, cotizaciones y evaluaciones recibidas.',
                    ],
                },
                {
                    title: '2. Información generada por la plataforma',
                    paragraphs: [
                        'La plataforma puede generar o procesar información derivada del uso del servicio, como indicadores climáticos, análisis satelitales, alertas preventivas, proyecciones de rendimiento, estados de riesgo, trazabilidad de intervenciones y actividad dentro del marketplace.',
                    ],
                },
                {
                    title: '3. Uso de la información',
                    paragraphs: ['Utilizamos la información para:'],
                    bullets: [
                        'Crear y gestionar cuentas de usuario.',
                        'Personalizar la experiencia según el rol del usuario.',
                        'Habilitar el monitoreo de parcelas y el análisis agronómico.',
                        'Generar alertas, recomendaciones y reportes preventivos.',
                        'Facilitar la conexión entre productores y especialistas.',
                        'Mejorar la calidad, seguridad y funcionamiento de la plataforma.',
                        'Realizar análisis internos para optimizar la experiencia del producto.',
                    ],
                },
                {
                    title: '4. Servicios externos',
                    paragraphs: [
                        'Viora puede integrarse con servicios externos para obtener datos climáticos, satelitales, mapas, almacenamiento, autenticación, pagos o comunicaciones. Estos servicios pueden procesar información necesaria para cumplir su función dentro de la plataforma.',
                        'Viora procura utilizar proveedores confiables y limitar el intercambio de datos a lo estrictamente necesario para la operación del servicio.',
                    ],
                },
                {
                    title: '5. Datos de ubicación y parcelas',
                    paragraphs: [
                        'Los datos de ubicación de parcelas se utilizan para habilitar funcionalidades como monitoreo climático, análisis satelital, alertas territoriales y conexión con especialistas cercanos.',
                        'Esta información no debe utilizarse para fines distintos a los relacionados con el funcionamiento de Viora y la prestación de servicios agronómicos dentro de la plataforma.',
                    ],
                },
                {
                    title: '6. Comunicación entre usuarios',
                    paragraphs: [
                        'Cuando un productor acepta una propuesta o cotización de un especialista, Viora puede habilitar la visualización de datos de contacto necesarios para que ambas partes coordinen la intervención fuera o dentro de los canales disponibles.',
                        'El usuario debe utilizar esta información únicamente para fines relacionados con el servicio solicitado.',
                    ],
                },
                {
                    title: '7. Seguridad de la información',
                    paragraphs: [
                        'Aplicamos medidas técnicas y organizativas razonables para proteger los datos contra acceso no autorizado, pérdida, alteración o uso indebido. Sin embargo, ningún sistema digital es completamente infalible, por lo que recomendamos a los usuarios proteger sus credenciales y mantener actualizada su información.',
                    ],
                },
                {
                    title: '8. Conservación de datos',
                    paragraphs: [
                        'La información se conservará mientras sea necesaria para brindar el servicio, cumplir obligaciones operativas, resolver disputas, mantener trazabilidad o cumplir requerimientos legales aplicables.',
                    ],
                },
                {
                    title: '9. Derechos del usuario',
                    paragraphs: [
                        'El usuario puede solicitar la actualización, corrección o eliminación de sus datos personales, así como realizar consultas sobre el tratamiento de su información mediante los canales oficiales de contacto de Viora.',
                    ],
                },
                {
                    title: '10. Cambios en esta política',
                    paragraphs: [
                        'Viora puede actualizar esta Política de Privacidad debido a cambios en la plataforma, nuevos servicios, mejoras de seguridad o requisitos legales. La versión vigente estará disponible en la Landing Page o en la aplicación web.',
                    ],
                },
            ],
        },
    },
};

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function clearFooterPhysics(instance) {
    if (!instance) return;

    if (instance.animationFrame) {
        cancelAnimationFrame(instance.animationFrame);
    }

    if (instance.resizeHandler) {
        window.removeEventListener('resize', instance.resizeHandler);
    }

    if (instance.canvas) {
        instance.canvas.remove();
    }
}

function createFooterPhysics(container) {
    if (!container) return null;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) return null;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
    const balls = [];
    const pointer = {
        id: null,
        ball: null,
        x: 0,
        y: 0,
        previousX: 0,
        previousY: 0,
        previousTime: 0,
    };

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrame = 0;
    let lastTime = performance.now();

    const isMobile = () => window.innerWidth <= 768;
    const getBallCount = () => 14;
    const getBallRadius = () => Math.round(isMobile() ? 36 : 72);
    const getGravity = () => (isMobile() ? 1900 : 1300);

    function resizeCanvas() {
        const rect = container.getBoundingClientRect();

        width = Math.max(1, Math.round(rect.width || window.innerWidth));
        height = Math.max(1, Math.round(rect.height || (isMobile() ? 288 : 520)));
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        balls.forEach((ball) => {
            ball.radius = getBallRadius();
            ball.mass = ball.radius * ball.radius;
            ball.x = clamp(ball.x, ball.radius, width - ball.radius);
            ball.y = Math.min(ball.y, height - ball.radius);
        });
    }

    function createBalls() {
        const count = getBallCount();
        const radius = getBallRadius();

        balls.length = 0;

        for (let index = 0; index < count; index += 1) {
            balls.push({
                x: radius + Math.random() * Math.max(width - radius * 2, radius),
                y: -(Math.random() * height * 1.4 + radius * 2 + index * radius * 0.35),
                vx: (Math.random() - 0.5) * 80,
                vy: Math.random() * 40,
                radius,
                mass: radius * radius,
                restitution: 0.48,
                friction: 0.985,
                angularVelocity: (Math.random() - 0.5) * 0.45,
                angle: Math.random() * Math.PI * 2,
            });
        }
    }

    function resolveWallCollision(ball) {
        if (ball.x - ball.radius < 0) {
            ball.x = ball.radius;
            ball.vx = Math.abs(ball.vx) * ball.restitution;
        } else if (ball.x + ball.radius > width) {
            ball.x = width - ball.radius;
            ball.vx = -Math.abs(ball.vx) * ball.restitution;
        }

        if (ball.y + ball.radius > height) {
            ball.y = height - ball.radius;
            ball.vy = -Math.abs(ball.vy) * ball.restitution;
            ball.vx *= ball.friction;
            ball.angularVelocity *= 0.78;
        } else if (ball.y - ball.radius < -height * 2) {
            ball.y = -height * 2 + ball.radius;
            ball.vy = Math.abs(ball.vy) * 0.2;
        }
    }

    function resolveBallCollision(first, second) {
        const dx = second.x - first.x;
        const dy = second.y - first.y;
        const distance = Math.hypot(dx, dy) || 1;
        const minDistance = first.radius + second.radius;

        if (distance >= minDistance) return;

        const nx = dx / distance;
        const ny = dy / distance;
        const overlap = minDistance - distance;
        const firstPinned = pointer.ball === first;
        const secondPinned = pointer.ball === second;

        if (!firstPinned && !secondPinned) {
            first.x -= nx * overlap * 0.5;
            first.y -= ny * overlap * 0.5;
            second.x += nx * overlap * 0.5;
            second.y += ny * overlap * 0.5;
        } else if (firstPinned && !secondPinned) {
            second.x += nx * overlap;
            second.y += ny * overlap;
        } else if (!firstPinned && secondPinned) {
            first.x -= nx * overlap;
            first.y -= ny * overlap;
        }

        const relativeVx = second.vx - first.vx;
        const relativeVy = second.vy - first.vy;
        const velocityAlongNormal = relativeVx * nx + relativeVy * ny;

        if (velocityAlongNormal > 0) return;

        const restitution = Math.min(first.restitution, second.restitution);
        const firstInvMass = firstPinned ? 0 : 1 / first.mass;
        const secondInvMass = secondPinned ? 0 : 1 / second.mass;
        const impulse = -(1 + restitution) * velocityAlongNormal / (firstInvMass + secondInvMass || 1);

        if (!firstPinned) {
            first.vx -= impulse * firstInvMass * nx;
            first.vy -= impulse * firstInvMass * ny;
            first.angularVelocity -= impulse * firstInvMass * 0.012;
        }

        if (!secondPinned) {
            second.vx += impulse * secondInvMass * nx;
            second.vy += impulse * secondInvMass * ny;
            second.angularVelocity += impulse * secondInvMass * 0.012;
        }
    }

    function step(delta) {
        const gravity = getGravity();

        balls.forEach((ball) => {
            if (pointer.ball === ball) return;

            ball.vy += gravity * delta;
            ball.vx *= 0.999;
            ball.vy *= 0.999;
            ball.angularVelocity *= 0.80;
            ball.x += ball.vx * delta;
            ball.y += ball.vy * delta;
            ball.angle += ball.angularVelocity * delta;

            if (Math.abs(ball.angularVelocity) < 0.1) {
                ball.angularVelocity = 0;
            }

            resolveWallCollision(ball);
        });

        for (let pass = 0; pass < 3; pass += 1) {
            for (let i = 0; i < balls.length; i += 1) {
                for (let j = i + 1; j < balls.length; j += 1) {
                    resolveBallCollision(balls[i], balls[j]);
                }
            }
        }
    }

    function draw() {
        context.clearRect(0, 0, width, height);

        balls.forEach((ball) => {
            context.save();
            context.translate(ball.x, ball.y);
            context.rotate(ball.angle);

            if (image.complete && image.naturalWidth > 0) {
                context.drawImage(image, -ball.radius, -ball.radius, ball.radius * 2, ball.radius * 2);
            } else {
                context.beginPath();
                context.arc(0, 0, ball.radius, 0, Math.PI * 2);
                context.fillStyle = '#ffffff';
                context.fill();
            }

            context.restore();
        });
    }

    function animate(now) {
        const delta = Math.min((now - lastTime) / 1000, 0.032);

        lastTime = now;
        step(delta);
        draw();
        animationFrame = requestAnimationFrame(animate);
    }

    function getCanvasPoint(event) {
        const rect = canvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }

    function findBallAtPoint(x, y) {
        for (let index = balls.length - 1; index >= 0; index -= 1) {
            const ball = balls[index];
            const distance = Math.hypot(x - ball.x, y - ball.y);

            if (distance <= ball.radius) return ball;
        }

        return null;
    }

    function handlePointerDown(event) {
        const point = getCanvasPoint(event);
        const ball = findBallAtPoint(point.x, point.y);

        if (!ball) return;

        pointer.id = event.pointerId;
        pointer.ball = ball;
        pointer.x = point.x;
        pointer.y = point.y;
        pointer.previousX = point.x;
        pointer.previousY = point.y;
        pointer.previousTime = performance.now();
        ball.vx = 0;
        ball.vy = 0;
        canvas.setPointerCapture(pointer.id);
        event.preventDefault();
    }

    function handlePointerMove(event) {
        if (event.pointerId !== pointer.id || !pointer.ball) return;

        const point = getCanvasPoint(event);
        const now = performance.now();
        const elapsed = Math.max((now - pointer.previousTime) / 1000, 0.016);
        const ball = pointer.ball;

        ball.x = clamp(point.x, ball.radius, width - ball.radius);
        ball.y = clamp(point.y, ball.radius, height - ball.radius);
        ball.vx = (point.x - pointer.previousX) / elapsed;
        ball.vy = (point.y - pointer.previousY) / elapsed;
        ball.angularVelocity = clamp(ball.vx / Math.max(ball.radius, 1), -8, 8);

        pointer.previousX = point.x;
        pointer.previousY = point.y;
        pointer.previousTime = now;
        event.preventDefault();
    }

    function handlePointerEnd(event) {
        if (event.pointerId !== pointer.id) return;

        if (canvas.hasPointerCapture?.(pointer.id)) {
            canvas.releasePointerCapture(pointer.id);
        }

        pointer.id = null;
        pointer.ball = null;
    }

    container.innerHTML = '';
    container.appendChild(canvas);
    image.src = FOOTER_BADGE_TEXTURE;

    resizeCanvas();
    createBalls();

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerEnd);
    canvas.addEventListener('pointercancel', handlePointerEnd);

    const resizeHandler = () => {
        resizeCanvas();
    };

    window.addEventListener('resize', resizeHandler);

    animationFrame = requestAnimationFrame((now) => {
        lastTime = now;
        animate(now);
    });

    return {
        canvas,
        resizeHandler,
        get animationFrame() {
            return animationFrame;
        },
    };
}

function attachFooterPhysics(section) {
    const container = section.querySelector('[data-footer-matter]');

    if (!container || section.dataset.footerPhysicsInitialized === 'true') return;

    let physicsInstance = null;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                physicsInstance = createFooterPhysics(container);
                section.dataset.footerPhysicsInitialized = 'true';
                observer.disconnect();
            });
        },
        { threshold: 0.18 }
    );

    observer.observe(section);

    window.addEventListener('pagehide', () => clearFooterPhysics(physicsInstance), { once: true });
}

function attachLegalDrawer(section) {
    const drawer = section.querySelector('[data-legal-drawer]');
    const panel = drawer?.querySelector('.legal-drawer__panel');
    const triggers = section.querySelectorAll('[data-legal-drawer-open]');
    const closeButtons = drawer?.querySelectorAll('[data-legal-drawer-close]');
    const contents = drawer?.querySelectorAll('[data-legal-drawer-content]');

    if (!drawer || !panel || !triggers.length || section.dataset.legalDrawerReady === 'true') return;

    let activeTrigger = null;
    let closeTimer = 0;
    let activeContentKey = 'terms';

    function getLegalLanguage() {
        return i18n.currentLang === 'es' ? 'es' : 'en';
    }

    function appendParagraphs(parent, paragraphs = []) {
        paragraphs.forEach((text) => {
            const paragraph = document.createElement('p');

            paragraph.textContent = text;
            parent.appendChild(paragraph);
        });
    }

    function renderLegalArticle(content, copy, titleId) {
        content.innerHTML = '';

        const title = document.createElement('h2');
        const updated = document.createElement('p');

        title.id = titleId;
        title.textContent = copy.title;
        updated.className = 'legal-drawer__updated';
        updated.textContent = copy.updated;

        content.append(title, updated);
        appendParagraphs(content, copy.intro);

        copy.sections.forEach((sectionItem) => {
            const heading = document.createElement('h3');

            heading.textContent = sectionItem.title;
            content.appendChild(heading);
            appendParagraphs(content, sectionItem.paragraphs);

            if (sectionItem.bullets?.length) {
                const list = document.createElement('ul');

                list.className = 'legal-drawer__list';
                sectionItem.bullets.forEach((item) => {
                    const listItem = document.createElement('li');

                    listItem.textContent = item;
                    list.appendChild(listItem);
                });
                content.appendChild(list);
            }
        });
    }

    function renderLegalContent() {
        const language = getLegalLanguage();
        const copy = LEGAL_COPY[language] || LEGAL_COPY.en;

        contents.forEach((content) => {
            const contentKey = content.dataset.legalDrawerContent;
            const contentCopy = copy[contentKey];

            if (!contentCopy) return;

            renderLegalArticle(
                content,
                contentCopy,
                contentKey === 'privacy' ? 'legal-drawer-privacy-title' : 'legal-drawer-title'
            );
        });

        setActiveContent(activeContentKey);
    }

    function setActiveContent(contentKey) {
        activeContentKey = contentKey;
        let activeTitleId = 'legal-drawer-title';

        contents.forEach((content) => {
            const isActive = content.dataset.legalDrawerContent === contentKey;

            content.hidden = !isActive;

            if (isActive) {
                const title = content.querySelector('h2');

                if (title?.id) activeTitleId = title.id;
            }
        });

        panel.setAttribute('aria-labelledby', activeTitleId);
    }

    function openDrawer(contentKey, trigger) {
        window.clearTimeout(closeTimer);
        activeTrigger = trigger;
        renderLegalContent();
        setActiveContent(contentKey);
        drawer.hidden = false;
        document.body.classList.add('legal-drawer-open');

        requestAnimationFrame(() => {
            drawer.classList.add('is-open');
            panel.focus({ preventScroll: true });
        });
    }

    function closeDrawer() {
        drawer.classList.remove('is-open');
        document.body.classList.remove('legal-drawer-open');

        closeTimer = window.setTimeout(() => {
            drawer.hidden = true;
            activeTrigger?.focus?.({ preventScroll: true });
            activeTrigger = null;
        }, 430);
    }

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            openDrawer(trigger.dataset.legalDrawerOpen || 'terms', trigger);
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || drawer.hidden) return;
        closeDrawer();
    });

    renderLegalContent();
    i18n.subscribe(renderLegalContent);

    section.dataset.legalDrawerReady = 'true';
}

export function initializeFooterSection(root = document) {
    const section = root.querySelector('[data-footer-section]');

    if (!section || section.dataset.footerInitialized === 'true') return;

    attachFooterPhysics(section);
    attachLegalDrawer(section);

    section.dataset.footerInitialized = 'true';
}
