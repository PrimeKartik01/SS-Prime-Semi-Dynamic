export function initTestimonials({
    containerId,
    testimonials = []
}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const starsHtml = (rating) => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += `
                <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
            `;
        }
        return stars;
    };

    container.innerHTML = `
        <style>
            /* Custom Swiper Styles for Testimonials */
            .testimonialsSwiper {
                padding-bottom: 0rem !important;
            }
            .testimonialsSwiper .swiper-pagination-bullet {
                background: #475569 !important;
                opacity: 0.6;
                width: 10px;
                height: 10px;
                transition: all 0.3s ease;
            }
            .testimonialsSwiper .swiper-pagination-bullet-active {
                background: #f59e0b !important;
                opacity: 1;
                width: 24px;
                border-radius: 5px;
            }
            .testimonialsSwiper .swiper-button-next,
            .testimonialsSwiper .swiper-button-prev {
                color: #f59e0b !important;
                background: rgba(15, 23, 42, 0.6);
                border: 1px solid rgba(251, 191, 36, 0.2);
                width: 50px;
                height: 50px;
                border-radius: 50%;
                transition: all 0.3s ease;
                backdrop-filter: blur(4px);
            }
            .testimonialsSwiper .swiper-button-next:hover,
            .testimonialsSwiper .swiper-button-prev:hover {
                background: #f59e0b;
                color: #0f172a !important;
                border-color: #f59e0b;
                box-shadow: 0 0 15px rgba(245, 158, 11, 0.4);
            }
            .testimonialsSwiper .swiper-button-next::after,
            .testimonialsSwiper .swiper-button-prev::after {
                font-size: 1.25rem !important;
                font-weight: bold;
            }
            @media (max-width: 1024px) {
                .testimonialsSwiper .swiper-button-next,
                .testimonialsSwiper .swiper-button-prev {
                    display: none !important;
                }
            }
        </style>

        <section class="py-8 md:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
            <!-- Ambient Background Glows -->
            <div class="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"></div>
            <div class="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"></div>

            <div class="max-w-[1700px] mx-auto px-6 lg:px-12 relative z-10">
                <!-- Section Header -->
                <div class="text-center max-w-4xl mx-auto mb-16 fade-up">
                    <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest border border-amber-500/20">
                        <i class="fa-solid fa-comments"></i> Client Testimonials
                    </span>
                    <h2 class="text-4xl md:text-5xl lg:text-6xl font-black mt-4 tracking-tight">
                        What Our <span class="text-amber-400">Happy Clients</span> Say
                    </h2>
                    <p class="mt-4 text-slate-400 text-lg font-light">
                        Real stories from home buyers and property investors who found their ideal properties with SS Prime Infra.
                    </p>
                </div>

                <!-- Swiper Slider -->
                <div class="relative px-0 lg:px-12 fade-up">
                    <div class="swiper testimonialsSwiper">
                        <div class="swiper-wrapper">
                            ${testimonials.map(item => `
                                <div class="swiper-slide h-auto">
                                    <div class="group relative h-full bg-slate-900/40 border border-slate-800 hover:border-amber-500/30 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 shadow-2xl backdrop-blur-sm flex flex-col justify-between">
                                        <!-- Star Rating & Quote Icon -->
                                        <div class="flex items-center justify-between mb-8">
                                            <div class="flex gap-1 text-amber-400">
                                                ${starsHtml(item.rating)}
                                            </div>
                                        </div>

                                        <!-- Text Content -->
                                        <p class="text-slate-300 text-base md:text-lg leading-relaxed font-light mb-8 italic">
                                            "${item.text}"
                                        </p>

                                        <!-- Author Info -->
                                        <div class="flex items-center gap-4 pt-6 border-t border-slate-800/80">
                                            <div class="w-12 h-12 rounded-full bg-gradient-to-br ${item.avatarBg} flex items-center justify-center text-slate-950 font-bold text-sm shrink-0 shadow-lg">
                                                ${item.initials}
                                            </div>
                                            <div>
                                                <h4 class="text-white font-bold text-base transition-colors duration-300 group-hover:text-amber-400">
                                                    ${item.name}
                                                </h4>
                                                <p class="text-slate-400 text-xs mt-0.5">
                                                    ${item.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>

                       
                       
                    </div>

                    <!-- Add Navigation Arrows -->
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
        </section>
    `;

    // Initialize Swiper after the markup is in the DOM
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonialsSwiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: `#${containerId} .swiper-pagination`,
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: `#${containerId} .swiper-button-next`,
                prevEl: `#${containerId} .swiper-button-prev`,
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1100: {
                    slidesPerView: 3,
                }
            }
        });
    } else {
        console.warn('Swiper library is not loaded on this page.');
    }
}
