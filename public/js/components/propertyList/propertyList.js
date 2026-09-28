import { propertyCard, propertySkeletonCard } from "../propertyCard/propertyCard.js";

const ITEMS_PER_SLIDE = 4;
let currentProperties = [];

export function renderPropertySkeletons(containerId = "propertyContainer", count = 4) {

    const container = document.getElementById(containerId);

    if (!container) return;

    const skeletons = Array.from({ length: count }, () => propertySkeletonCard()).join("");

    container.innerHTML = skeletons;

}

export function renderProperties(properties, _page, _itemsPerPageOverride) {

    const container = document.getElementById("propertyContainer");
    if (!container) return;

    currentProperties = properties;

    // Remove any grid classes — the Swiper wrapper takes full control
    container.className = "relative";

    if (!properties.length) {

        container.innerHTML = `
            <div class="text-center py-20">
                <h2 class="text-xl font-semibold text-white">No Property Found</h2>
            </div>
        `;

        return;

    }

    // Chunk properties into groups of ITEMS_PER_SLIDE
    const chunks = [];
    for (let i = 0; i < properties.length; i += ITEMS_PER_SLIDE) {
        chunks.push(properties.slice(i, i + ITEMS_PER_SLIDE));
    }

    const slidesMarkup = chunks.map(chunk => `
        <div class="swiper-slide !h-auto py-2">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-1">
                ${chunk.map(propertyCard).join("")}
            </div>
        </div>
    `).join("");

    container.innerHTML = `

        <!-- ← Left Nav Button -->
        <button id="propListPrev"
            class="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full  shadow-lg border border-gray-200 text-blue-900 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous properties">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m15 18-6-6 6-6"/></svg>
        </button>

        <!-- → Right Nav Button -->
        <button id="propListNext"
            class="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 shadow-lg border border-gray-200 text-gray-900 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next properties">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6"/></svg>
        </button>

        <!-- Outer Swiper (padded so cards stay clear of the side buttons) -->
        <div class="swiper propertyListSwiper overflow-hidden px-12 md:px-14">
            <div class="swiper-wrapper">
                ${slidesMarkup}
            </div>
        </div>

        <!-- Dots + counter -->
        <div class="flex items-center justify-center gap-3 mt-6">
            <div id="propListPagination" class="flex items-center gap-2"></div>
        </div>

    `;

    // ── Outer list Swiper ───────────────────────────────────────────────
    const listSwiper = new Swiper(".propertyListSwiper", {

        loop: false,

        speed: 500,

        slidesPerView: 1,

        autoHeight: false,

        on: {

            init(swiper) {
                updateListNav(swiper);
            },

            slideChange(swiper) {
                updateListNav(swiper);
            },

        },

    });

    function updateListNav(swiper) {

        const prevBtn = document.getElementById("propListPrev");
        const nextBtn = document.getElementById("propListNext");
        const counter = document.getElementById("propListCounter");
        const paginationEl = document.getElementById("propListPagination");

        const total = swiper.slides.length;
        const current = swiper.activeIndex;

        // Counter
        if (counter) counter.textContent = `${current + 1} / ${total}`;

        // Prev
        if (prevBtn) {
            prevBtn.disabled = current === 0;
        }

        // Next
        if (nextBtn) {
            nextBtn.disabled = current === total - 1;
        }

        // Dot pagination
        if (paginationEl) {
            paginationEl.innerHTML = Array.from({ length: total }, (_, i) => `
                <button
                    data-index="${i}"
                    aria-label="Go to slide ${i + 1}"
                    class="w-2.5 h-2.5 rounded-full transition-all duration-200 ${i === current ? "bg-yellow-500 scale-125" : "bg-gray-300 hover:bg-yellow-300"}"
                ></button>
            `).join("");

            paginationEl.querySelectorAll("button[data-index]").forEach(btn => {
                btn.addEventListener("click", () => {
                    listSwiper.slideTo(Number(btn.dataset.index));
                });
            });
        }

    }

    // Wire up custom nav buttons
    document.getElementById("propListPrev")?.addEventListener("click", () => listSwiper.slidePrev());
    document.getElementById("propListNext")?.addEventListener("click", () => listSwiper.slideNext());

    // ── Inner per-card image Swipers ───────────────────────────────────
    container.querySelectorAll(".propertySwiper").forEach(swiperEl => {

        new Swiper(swiperEl, {

            loop: true,

            speed: 800,

            autoplay: {

                delay: 3000,

                disableOnInteraction: false,

            },

            navigation: {

                nextEl: swiperEl.querySelector(".swiper-button-next"),

                prevEl: swiperEl.querySelector(".swiper-button-prev"),

            },

        });

    });

}