export function initHeroCarousel({

    containerId,
    slides

}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `

        <section
            class="relative overflow-hidden"
            style="height: 65vh; min-height: 550px;"
        >

            <!-- Floating Decorative Shapes -->
            <div class="absolute top-20 right-10 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl float-pulse pointer-events-none z-10"></div>
            <div class="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl float-pulse-delay pointer-events-none z-10"></div>

            <div class="swiper heroSwiper h-full">

                <div class="swiper-wrapper">

                    ${slides.map(slide => `

                        <div class="swiper-slide relative">

                            <img
                                src="${slide.image}"
                                alt="${slide.title}"
                                class="absolute inset-0 w-full h-full object-cover"
                            >

                            <!-- Premium Gradient Overlay -->
                            <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>

                            <div class="absolute inset-0 flex items-center">

                                <div class="max-w-7xl mx-auto w-full px-6 text-center">

                                    <!-- Subtitle Pill -->
                                    <div class="hero-text-animate">
                                        <span class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium tracking-wide">
                                            <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                                            ${slide.subtitle}
                                        </span>
                                    </div>

                                    <h1
                                        class="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mt-6 hero-text-animate-delay font-display"
                                    >
                                        ${slide.title}
                                    </h1>

                                </div>

                            </div>

                        </div>

                    `).join("")}

                </div>

                <div class="swiper-pagination"></div>

            </div>

            <!-- Custom Nav Arrows -->
            <div class="absolute hidden md:block bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 left-4 md:left-6 z-20">
                <button class="hero-nav-btn hero-prev">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
                </button>
            </div>
            <div class="absolute hidden md:block  bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 right-4 md:right-6 z-20">
                <button class="hero-nav-btn hero-next">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                </button>
            </div>

            <!-- Search Component -->

            <div
                class="absolute bottom-12 md:bottom-4 left-0 right-0 z-20 pb-6 px-2"
            >

                <div class="max-w-7xl mx-auto">

                    <div id="searchContainer"></div>

                </div>

            </div>

        </section>

    `;

    new Swiper(".heroSwiper", {

        loop: true,

        speed: 1500,

        effect: "fade",

        autoplay: {

            delay: 5000,

            disableOnInteraction: false

        },

        pagination: {

            el: ".swiper-pagination",

            clickable: true

        },

        navigation: {

            nextEl: ".hero-next",

            prevEl: ".hero-prev"

        }

    });

}