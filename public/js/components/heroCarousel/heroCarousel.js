export function initHeroCarousel({

    containerId,
    slides

}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `

        <section
            class="relative overflow-hidden h-[550px] md:h-[100vh] bg-slate-800"
           
        >

            <div class="swiper heroSwiper h-full">

                <div class="swiper-wrapper">

                    ${slides.map(slide => {
        const mobileImg = slide.mobile_image || slide.mobileImage || slide.image;
        return `
                        <div class="swiper-slide relative bg-slate-800 animate-pulse">
                            <!-- Mobile Image -->
                            <img
                                src="${mobileImg}"
                                alt="${slide.title || 'Banner'}"
                                class="block md:hidden absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700"
                                onload="this.classList.remove('opacity-0'); this.closest('.swiper-slide')?.classList.remove('animate-pulse');"
                                onerror="this.classList.remove('opacity-0');"
                            >
                            <!-- Desktop Image -->
                            <img
                                src="${slide.image}"
                                alt="${slide.title || 'Banner'}"
                                class="hidden md:block absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700"
                                onload="this.classList.remove('opacity-0'); this.closest('.swiper-slide')?.classList.remove('animate-pulse');"
                                onerror="this.classList.remove('opacity-0');"
                            >
                        </div>
                    `;
    }).join("")}

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

    container.querySelectorAll('img').forEach(img => {
        if (img.complete && img.naturalWidth > 0) {
            img.classList.remove('opacity-0');
            img.closest('.swiper-slide')?.classList.remove('animate-pulse');
        }
    });

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