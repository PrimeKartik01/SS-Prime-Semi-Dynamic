export function initManagers({
    containerId,
    managers = []
}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const starsHtml = (rating = 5) => {
        let stars = '';
        for (let i = 0; i < rating; i++) {
            stars += `
                <svg class="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
            `;
        }
        return stars;
    };

    container.innerHTML = `
        <style>
            /* Custom Swiper Styles for Managers */
            .managersSwiper {
                padding-top: 1rem !important;
                padding-bottom: 3rem !important;
                padding-left: 0.25rem !important;
                padding-right: 0.25rem !important;
            }
            .managersSwiper .swiper-pagination {
                bottom: 0px !important;
            }
            .managersSwiper .swiper-pagination-bullet {
                background: #cbd5e1 !important;
                opacity: 0.7;
                width: 9px;
                height: 9px;
                transition: all 0.3s ease;
                margin: 0 4px !important;
            }
            .managersSwiper .swiper-pagination-bullet-active {
                background: #2563eb !important;
                opacity: 1;
                width: 10px;
                height: 10px;
            }
            .managersSwiper .swiper-button-next,
            .managersSwiper .swiper-button-prev {
                color: #2563eb !important;
                background: #ffffff;
                border: 1px solid #e2e8f0;
                width: 48px;
                height: 48px;
                border-radius: 50%;
                transition: all 0.3s ease;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
                margin-top: -20px;
            }
            .managersSwiper .swiper-button-next:hover,
            .managersSwiper .swiper-button-prev:hover {
                background: #2563eb;
                color: #ffffff !important;
                border-color: #2563eb;
                box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
            }
            .managersSwiper .swiper-button-next::after,
            .managersSwiper .swiper-button-prev::after {
                font-size: 1.1rem !important;
                font-weight: bold;
            }
            .managersSwiper .swiper-button-prev {
                left: -18px !important;
            }
            .managersSwiper .swiper-button-next {
                right: -18px !important;
            }
            @media (max-width: 1024px) {
                .managersSwiper .swiper-button-next,
                .managersSwiper .swiper-button-prev {
                    display: none !important;
                }
            }
        </style>

        <section class="py-4pro md:py-8 bg-[#FFFDF9] text-slate-900 relative overflow-hidden">
            <!-- Subtle Architectural & Ambient Backdrop Accents -->
            <div class="absolute inset-y-0 left-0 w-1/3 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent"></div>
            <div class="absolute inset-y-0 right-0 w-1/3 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent"></div>

            <div class="max-w-[1700px] mx-auto px-6 lg:px-12 relative z-10">
                <!-- Section Header -->
                <div class="text-center max-w-4xl mx-auto mb-10 md:mb-14 fade-up">
                    <div class="flex items-center justify-center gap-3 mb-3">
                        <span class="w-10 md:w-16 h-[1.5px] bg-[#B68D37]"></span>
                        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full  border border-[#B68D37] text-[#B68D37] text-xs font-bold uppercase tracking-widest shadow-xs">
                            <i class="fa-solid fa-users text-[#B68D37]"></i> THE PEOPLE BEHIND IT
                        </span>
                        <span class="w-10 md:w-16 h-[1.5px] bg-[#B68D37]"></span>
                    </div>

                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-black text-[#0F172A] tracking-tight">
                        Meet Our <span class="text-[#B68D37]">Managers</span>
                    </h2>
                    <p class="mt-3 text-slate-600 text-sm md:text-base font-normal max-w-2xl mx-auto">
                        A passionate group of real estate professionals dedicated to turning your property dreams into reality.
                    </p>
                </div>

                <!-- Swiper Slider -->
                <div class="relative px-2 sm:px-6 lg:px-12 fade-up">
                    <div class="swiper managersSwiper overflow-hidden">
                        <div class="swiper-wrapper">
                            ${managers.map(item => `
                                <div class="swiper-slide h-auto">
                                    <div class="group relative h-full bg-white border border-[#B68D37] rounded-[28px] p-5 md:p-6 shadow-[0_8px_30px_rgba(37,99,235,0.06)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">

                                        <div class="relative z-10">
                                            <!-- Manager Image -->
                                            <div class="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden mb-4 bg-slate-100 border border-slate-100/80">
                                                <img src="${item.image || 'img/logo.webp'}" alt="${item.name}" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" onerror="this.onerror=null; this.src='img/logo.webp';">
                                            </div>

                                            <!-- Name & Role -->
                                            <h3 class="text-[#0F172A] font-bold text-lg md:text-xl tracking-tight">${item.name}</h3>
                                            <p class="text-[#B68D37] text-xs md:text-sm font-semibold mt-0.5 mb-3">${item.role}</p>

                                            <!-- Quote Text -->
                                            <div class="flex items-start gap-1.5 mb-4">
                                                <svg class="w-5 h-5 text-[#B68D37] shrink-0 mt-0.5 opacity-90" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                                                </svg>
                                                <p class="text-slate-600 text-xs md:text-sm leading-relaxed font-normal">
                                                    ${item.bio || item.text || ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>

                        <!-- Pagination Dots -->
                        <div class="swiper-pagination managers-pagination"></div>
                    </div>

                    <!-- Navigation Arrows -->
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
        </section>
    `;

    // Initialize Swiper after the markup is in the DOM
    if (typeof Swiper !== 'undefined') {
        new Swiper('.managersSwiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            pagination: {
                el: `#${containerId} .swiper-pagination`,
                clickable: true,
            },
            navigation: {
                nextEl: `#${containerId} .swiper-button-next`,
                prevEl: `#${containerId} .swiper-button-prev`,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                }
            }
        });
    } else {
        console.warn('Swiper library is not loaded on this page.');
    }
}
