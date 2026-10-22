
export function companySlider({
    containerId,
    companies = []
}) {

    const container = document.getElementById(containerId);
    if (!container || !companies.length) return;

    // Triple-clone so there's always enough track on both sides for seamless dragging
    const logos = [...companies, ...companies, ...companies];

    container.innerHTML = `
        <style>
            .cs-viewport {
                overflow: hidden;
                cursor: grab;
                user-select: none;
                -webkit-user-select: none;
            }
            .cs-viewport:active {
                cursor: grabbing;
            }
            .cs-track {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                width: max-content;
                will-change: transform;
            }
            .cs-track.cs-animating {
                animation: cs-scroll var(--cs-duration, 40s) linear infinite;
            }
            .cs-track.cs-paused {
                animation-play-state: paused;
            }
            @keyframes cs-scroll {
                from { transform: translateX(var(--cs-start, 0px)); }
                to   { transform: translateX(var(--cs-end, -50%)); }
            }
        </style>

        <section class="md:pt-8 bg-gradient-to-br from-[#FFFDF9] to-[#FFFDF9]">
            <div>
                <div class="cs-viewport relative">
                    <!-- Ambient glow -->
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[200px] md:h-[200px] w-[300px] h-[300px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>

                    <div class="cs-track cs-animating" id="${containerId}-track">
                        ${logos.map(company => `
                            <div class="group flex-shrink-0 w-30 md:w-48 h-30 md:h-48 flex items-center justify-center rounded-2xl hover:-translate-y-1 transition-all duration-300">
                                <div class="w-full h-full flex items-center justify-center p-6">
                                    <img
                                        src="${company.logo}"
                                        alt="${company.name}"
                                        draggable="false"
                                        class="max-w-full max-h-full object-contain group-hover:opacity-100 transition-all duration-300"
                                    >
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        </section>
    `;

    const viewport = container.querySelector('.cs-viewport');
    const track    = container.querySelector('.cs-track');

    if (!viewport || !track) return;

    // ── Measure one full "set" width (1/3 of total track since we tripled logos) ──
    function getSetWidth() {
        return track.scrollWidth / 3;
    }

    // ── Get current translateX from the computed style (mid-animation) ──
    function getCurrentX() {
        const style = window.getComputedStyle(track);
        const matrix = new DOMMatrix(style.transform);
        return matrix.m41; // translateX
    }

    // ── Restart CSS animation from a given X position ──
    function restartAnimation(fromX) {
        const setWidth = getSetWidth();
        // Normalise fromX into the range [-setWidth * 2, 0] so the loop stays seamless
        let x = fromX % setWidth;
        if (x > 0) x -= setWidth;

        track.style.setProperty('--cs-start', `${x}px`);
        track.style.setProperty('--cs-end',   `${x - setWidth}px`);

        // Force reflow to restart animation
        track.classList.remove('cs-animating');
        void track.offsetWidth;
        track.classList.add('cs-animating');
    }

    // Kick off animation only after all images are loaded so scrollWidth is accurate
    const images = track.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;

    function startWhenReady() {
        loadedCount++;
        if (loadedCount >= totalImages) {
            restartAnimation(0);
        }
    }

    if (totalImages === 0) {
        restartAnimation(0);
    } else {
        images.forEach(img => {
            if (img.complete) {
                startWhenReady();
            } else {
                img.addEventListener('load', startWhenReady);
                img.addEventListener('error', startWhenReady); // error pe bhi start karo
            }
        });
    }

    // ── Hover: pause / resume ──
    let isDragging = false;

    viewport.addEventListener('mouseenter', () => {
        if (!isDragging) track.classList.add('cs-paused');
    });
    viewport.addEventListener('mouseleave', () => {
        if (!isDragging) track.classList.remove('cs-paused');
    });

    // ── Drag / Swipe (pointer events — works for mouse + touch) ──
    let dragStartX   = 0;
    let dragStartTrackX = 0;
    let dragDeltaX   = 0;

    viewport.addEventListener('pointerdown', (e) => {
        isDragging    = true;
        dragStartX    = e.clientX;
        dragStartTrackX = getCurrentX();
        dragDeltaX    = 0;

        // Freeze animation mid-frame
        track.classList.add('cs-paused');
        track.style.animation = 'none';
        track.style.transform = `translateX(${dragStartTrackX}px)`;

        viewport.setPointerCapture(e.pointerId);
        viewport.style.cursor = 'grabbing';
    });

    viewport.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        dragDeltaX = e.clientX - dragStartX;
        let newX   = dragStartTrackX + dragDeltaX;

        // Clamp within a safe range so it never flies off screen
        const setWidth = getSetWidth();
        if (newX > 0)              newX -= setWidth;
        if (newX < -setWidth * 2)  newX += setWidth;

        track.style.transform = `translateX(${newX}px)`;
    });

    function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        viewport.style.cursor = '';

        const finalX = dragStartTrackX + dragDeltaX;

        // Remove inline transform and restart CSS animation from final position
        track.style.transform = '';
        track.style.animation = '';
        track.classList.remove('cs-paused');

        restartAnimation(finalX);

        // If mouse is still inside viewport, re-pause
        if (viewport.matches(':hover')) {
            track.classList.add('cs-paused');
        }
    }

    viewport.addEventListener('pointerup',     onDragEnd);
    viewport.addEventListener('pointercancel', onDragEnd);
}
