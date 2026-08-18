export function initGalleryCarousel({
    containerId,
    galleryItems = []
}) {
    const container = document.getElementById(containerId);

    if (!container) return;

    const totalItems = galleryItems.length;
    let currentIndex = 0;

    // Duplicate items for infinite carousel effect
    const duplicatedItems = [...galleryItems, ...galleryItems];

    const swiperHTML = `
        <section class="py-10 bg-slate-50">
            <div class="max-w-[1700px] px-6 lg:px-12">
                <!-- Gallery Carousel -->
                <div class="relative fade-up">
                    <!-- Carousel Container -->
                    <div class="overflow-hidden rounded-3xl shadow-2xl border border-slate-200">
                        <div class="swiper gallery-swiper h-[300px] md:h-[500px]">
                            <div class="swiper-wrapper">
                                ${duplicatedItems.map((item, idx) => `
                                    <div class="swiper-slide">
                                        <img
                                            src="${item.image}"
                                            alt="${item.title}"
                                            class="w-full h-full object-cover"
                                            loading="lazy"
                                        >
                                    </div>
                                `).join("")}
                            </div>

                            <!-- Navigation Buttons -->
                            <div class="swiper-button-prev gallery-button-prev"></div>
                            <div class="swiper-button-next gallery-button-next"></div>

                            <!-- Pagination Dots -->
                            <div class="swiper-pagination gallery-pagination"></div>
                        </div>
                    </div>

                  
                 
                </div>
            </div>
        </section>
    `;

    container.innerHTML = swiperHTML;

    // Initialize Swiper after DOM is ready
    setTimeout(() => {
        if (typeof Swiper !== 'undefined') {
            const gallerySwiperEl = document.querySelector('.gallery-swiper');
            if (gallerySwiperEl) {
                new Swiper(gallerySwiperEl, {
                    loop: true,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.gallery-pagination',
                        clickable: true,
                        bulletClass: 'swiper-pagination-bullet gallery-bullet',
                        bulletActiveClass: 'swiper-pagination-bullet-active',
                    },
                    navigation: {
                        nextEl: '.gallery-button-next',
                        prevEl: '.gallery-button-prev',
                    },
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true,
                    },
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true,
                    },
                    speed: 800,
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 1,
                        },
                    },
                });
            }
        }
    }, 100);
}
