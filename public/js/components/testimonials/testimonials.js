export function initTestimonials({
    containerId,
    testimonials = []
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
            /* Custom Swiper Styles for Testimonials */
            .testimonialsSwiper {
                padding-top: 1rem !important;
                padding-bottom: 3rem !important;
                padding-left: 0.25rem !important;
                padding-right: 0.25rem !important;
            }
            .testimonialsSwiper .swiper-pagination {
                bottom: 0px !important;
            }
            .testimonialsSwiper .swiper-pagination-bullet {
                background: #cbd5e1 !important;
                opacity: 0.7;
                width: 9px;
                height: 9px;
                transition: all 0.3s ease;
                margin: 0 4px !important;
            }
            .testimonialsSwiper .swiper-pagination-bullet-active {
                background: #1d4ed8 !important;
                opacity: 1;
                width: 10px;
                height: 10px;
            }
            .testimonialsSwiper .swiper-button-next,
            .testimonialsSwiper .swiper-button-prev {
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
            .testimonialsSwiper .swiper-button-next:hover,
            .testimonialsSwiper .swiper-button-prev:hover {
                background: #2563eb;
                color: #ffffff !important;
                border-color: #2563eb;
                box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
            }
            .testimonialsSwiper .swiper-button-next::after,
            .testimonialsSwiper .swiper-button-prev::after {
                font-size: 1.1rem !important;
                font-weight: bold;
            }
            .testimonialsSwiper .swiper-button-prev {
                left: -18px !important;
            }
            .testimonialsSwiper .swiper-button-next {
                right: -18px !important;
            }
            @media (max-width: 1024px) {
                .testimonialsSwiper .swiper-button-next,
                .testimonialsSwiper .swiper-button-prev {
                    display: none !important;
                }
            }
        </style>

        <section class="py-12 md:py-20 bg-[#FFFDF9] text-slate-900 relative overflow-hidden">
            <!-- Subtle Ambient Backdrop Wave Accents -->
            <div class="absolute inset-y-0 left-0 w-1/3 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent"></div>
            <div class="absolute inset-y-0 right-0 w-1/3 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent"></div>

            <div class="max-w-[1700px] mx-auto px-2 lg:px-12 relative z-10">
                <!-- Section Header -->
                <div class="text-center max-w-4xl mx-auto mb-2 md:mb-6 fade-up">
                    <div class="flex items-center justify-center gap-3 mb-3 text-xs md:text-2xl">
                        <span class="w-10 md:w-16 h-[1.5px] bg-[#B68D37]"></span>
                        <span class="inline-flex items-center gap-2 px-6 py-2 rounded-full  border border-[#B68D37] text-[#B68D37] font-bold uppercase tracking-widest shadow-xs">
                            <i class="fa-solid fa-user-group text-[#B68D37]"></i> CLIENT TESTIMONIALS
                        </span>
                        <span class="w-10 md:w-16 h-[1.5px] bg-[#B68D37]"></span>
                    </div>
                    <p class="mt-3 text-slate-600 text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed hidden md:block">
                        Real stories from home buyers and property investors </p>
                </div>

                <!-- Swiper Slider -->
                <div class="relative px-2 sm:px-6 lg:px-12 fade-up">
                    <div class="swiper testimonialsSwiper overflow-hidden">
                        <div class="swiper-wrapper">
                            ${testimonials.map(item => `
                                <div class="swiper-slide h-auto">
                                    <div class="group relative h-full bg-white border border-[#B68D37] rounded-[28px] p-6 md:p-7 shadow-[0_8px_30px_rgba(37,99,235,0.06)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
                                        

                                        <!-- Top Profile Header (Avatar + Info + Stars) -->
                                        <div>
                                            <div class="flex items-center gap-4 mb-5 relative z-10">
                                                <div class="relative w-16 h-16 rounded-full overflow-hidden shrink-0 shadow-sm border-2 border-white bg-slate-100">
                                                    ${item.image ? `
                                                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover object-center" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'w-full h-full bg-gradient-to-br ${item.avatarBg || 'from-blue-600 to-indigo-700'} flex items-center justify-center text-white font-bold text-base\\'>${item.initials || 'SP'}</div>';">
                                                    ` : `
                                                        <div class="w-full h-full bg-gradient-to-br ${item.avatarBg || 'from-blue-600 to-indigo-700'} flex items-center justify-center text-white font-bold text-base">
                                                            ${item.initials || 'SP'}
                                                        </div>
                                                    `}
                                                </div>
                                                <div>
                                                    <h3 class="text-[#0F172A] font-bold text-base md:text-lg tracking-tight leading-snug">${item.name}</h3>
                                                    <p class="text-slate-500 text-xs font-medium mt-0.5 mb-1.5">${item.role}</p>
                                                    <div class="flex items-center gap-1 text-amber-400">
                                                        ${starsHtml(item.rating || 5)}
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Quote Body -->
                                            <div class="relative z-10">
                                                <svg class="w-6 h-6 text-[#B68D37] mb-2" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                                                </svg>
                                                <p class="text-slate-600 text-xs md:text-sm leading-relaxed font-normal">
                                                    "${item.text}"
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            `).join("")}
                        </div>

                        <!-- Pagination Dots -->
                        <div class="swiper-pagination testimonials-pagination"></div>
                    </div>

                    <!-- Navigation Arrows -->
                  
                </div>
            </div>
        </section>
    `;

    // Initialize Swiper after the markup is in the DOM
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonialsSwiper', {
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
                }
            }
        });
    } else {
        console.warn('Swiper library is not loaded on this page.');
    }
}
