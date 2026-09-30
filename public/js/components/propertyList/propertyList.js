import { propertyCard, propertySkeletonCard } from "../propertyCard/propertyCard.js";

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

    const slidesMarkup = properties.map(property => `
        <div class="swiper-slide !h-auto py-2 px-1 md:px-3">
            ${propertyCard(property)}
        </div>
    `).join("");

    container.innerHTML = `

        <!-- ← Left Nav Button -->
        <button id="propListPrev"
            class="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full  shadow-lg bg-[#B68D37] text-white transition-all duration-200 disabled:opacity-0 disabled:cursor-not-allowed"
            aria-label="Previous properties">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m15 18-6-6 6-6"/></svg>
        </button>

        <!-- → Right Nav Button -->
        <button id="propListNext"
            class="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg bg-[#B68D37] text-white transition-all duration-200 disabled:opacity-0 disabled:cursor-not-allowed"
            aria-label="Next properties">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6"/></svg>
        </button>

        <!-- Outer Swiper (padded so cards stay clear of the side buttons) -->
        <div class="swiper propertyListSwiper overflow-hidden px-12 md:px-14">
            <div class="swiper-wrapper">
                ${slidesMarkup}
            </div>
        </div>

    `;

    // ── Outer list Swiper ───────────────────────────────────────────────
    const listSwiper = new Swiper(".propertyListSwiper", {

        loop: false,

        speed: 500,

        slidesPerView: 1,

        slidesPerGroup: 1,

        breakpoints: {
            640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            1440: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
        },

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

        const total = swiper.snapGrid.length;
        const current = swiper.snapIndex;

        // Counter
        if (counter) counter.textContent = `${current + 1} / ${total}`;

        // Prev
        if (prevBtn) {
            prevBtn.disabled = swiper.isBeginning;
        }

        // Next
        if (nextBtn) {
            nextBtn.disabled = swiper.isEnd;
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
                    listSwiper.slideTo(Number(btn.dataset.index) * listSwiper.params.slidesPerGroup);
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