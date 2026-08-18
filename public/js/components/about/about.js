import { initNavbar } from "../navbar/navbar.js";
import { navbarData } from "../../data/navbarData.js";
import { companySlider } from "../companySlider/companySlider.js";
import { companiesLogoData } from "../../data/companiesLogoData.js";
import { initContactForm } from "../contactForm/contactForm.js";
import { initFooter } from "../footer/footer.js";
import { initEnquiryPopup } from "../enquiryPopup/enquiryPopup.js";
import { initGalleryCarousel } from "../gallery/gallery.js";
import { aboutVision, aboutValues, aboutTeam, aboutStats, galleryItems } from "../../data/aboutData.js";

// ─── Helpers ────────────────────────────────────────────────

function renderStats(stats) {
    const container = document.getElementById("about-stats");
    if (!container) return;
    container.innerHTML = stats
        .map(
            (s) => `
        <div class="p-2">
            <div class="text-xl md:text-5xl font-semibold text-amber-400">${s.value}</div>
            <div class="mt-2 text-xs md:text-sm text-slate-400 uppercase tracking-widest font-medium">${s.label}</div>
        </div>`
        )
        .join("");
}

function renderVisionValues(vision, values) {
    const container = document.getElementById("about-vision-values");
    if (!container) return;

    const valueCards = values
        .map(
            (v) => `
        <div class="group bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 rounded-3xl p-8 transition duration-500">
            <div class="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-2xl group-hover:bg-amber-500 group-hover:text-slate-950 transition duration-500">
                <i class="${v.icon}"></i>
            </div>
            <h3 class="mt-6 text-xl font-bold text-white">${v.title}</h3>
            <p class="mt-3 text-slate-400 text-sm leading-relaxed">${v.description}</p>
        </div>`
        )
        .join("");

    container.innerHTML = `
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto fade-up">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest border border-amber-500/30">
                <i class="fa-solid fa-star"></i> Our Vision &amp; Values
            </span>
            <h2 class="text-4xl md:text-5xl font-black mt-4 text-white">
                The Principles That <span class="text-amber-400">Drive Us</span>
            </h2>
            <p class="mt-4 text-slate-400 text-lg font-light">
                Every decision we make at SS Prime Infra is guided by a set of core beliefs that put our clients first.
            </p>
        </div>

        <!-- Vision Statement -->
        <div class="mt-14 bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-3xl p-8 md:p-12 fade-up">
            <div class="flex flex-col md:flex-row  md:items-center gap-8">
                <div class="w-20 h-20 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 text-3xl shrink-0">
                    <i class="fa-solid fa-eye"></i>
                </div>
                <div>
                    <h3 class="text-2xl md:text-3xl font-bold text-white">${vision.heading}</h3>
                    <p class="mt-3 text-slate-300 text-lg leading-relaxed font-light">${vision.text}</p>
                </div>
            </div>
        </div>

        <!-- Values Grid -->
        <div class="grid md:grid-cols-3 gap-8 mt-10 fade-up">
            ${valueCards}
        </div>
    `;
}

function renderTeam(team) {
    const container = document.getElementById("about-team");
    if (!container) return;

    const memberCards = team
        .map(
            (m) => `
        <div class="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-500">
            <div class="relative h-64 bg-slate-900 flex items-center justify-center overflow-hidden">
                <img
                    src="${m.image}"
                    alt="${m.name}"
                    class="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                    onerror="this.style.display='none'"
                >
              
            </div>
            <div class="p-6 text-center">
                <h3 class="text-lg font-bold text-slate-900">${m.name}</h3>
                <p class="text-amber-500 text-sm font-semibold mt-1">${m.role}</p>
                <p class="text-slate-500 text-xs mt-3 leading-relaxed">${m.bio}</p>
                <div class="flex justify-center gap-3 mt-5">
                    <a href="${m.linkedin}" class="w-9 h-9 rounded-full bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-600 flex items-center justify-center transition duration-300">
                        <i class="fa-brands fa-linkedin-in text-sm"></i>
                    </a>
                    <a href="${m.instagram}" class="w-9 h-9 rounded-full bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-600 flex items-center justify-center transition duration-300">
                        <i class="fa-brands fa-instagram text-sm"></i>
                    </a>
                </div>
            </div>
        </div>`
        )
        .join("");

    const carouselCards = team
        .map(
            (m) => `
        <div class="swiper-slide">
            <div class="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-500 h-full">
                <div class="relative h-64 bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img
                        src="${m.image}"
                        alt="${m.name}"
                        class="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                        onerror="this.style.display='none'"
                    >
                </div>
                <div class="p-6 text-center">
                    <h3 class="text-lg font-bold text-slate-900">${m.name}</h3>
                    <p class="text-amber-500 text-sm font-semibold mt-1">${m.role}</p>
                    <p class="text-slate-500 text-xs mt-3 leading-relaxed">${m.bio}</p>
                </div>
            </div>
        </div>`
        )
        .join("");

    container.innerHTML = `
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto fade-up">
            <span class="text-amber-500 font-bold uppercase tracking-[4px] text-sm">The People Behind It</span>
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mt-3">
                Meet Our <span class="text-amber-500">Managers     </span>
            </h2>
            <p class="mt-4 text-slate-500">
                A passionate group of real estate professionals dedicated to turning your property dreams into reality.
            </p>
        </div>

        <!-- Mobile Carousel (visible only on small screens) -->
        <div class="mt-16 fade-up md:hidden">
            <div class="swiper team-carousel-mobile">
                <div class="swiper-wrapper">
                    ${carouselCards}
                </div>
                <div class="swiper-button-prev team-carousel-prev mt-4"></div>
                <div class="swiper-button-next team-carousel-next mt-4"></div>
            </div>
        </div>

        <!-- Desktop Grid (visible only on medium screens and up) -->
        <div class="hidden md:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 fade-up">
            ${memberCards}
        </div>
    `;

    // Initialize Swiper for mobile carousel after a short delay
    setTimeout(() => {
        if (typeof Swiper !== 'undefined') {
            const carouselEl = document.querySelector('.team-carousel-mobile');
            if (carouselEl) {
                new Swiper(carouselEl, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    pagination: {
                        el: '.team-carousel-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.team-carousel-next',
                        prevEl: '.team-carousel-prev',
                    },
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
                });
            }
        }
    }, 100);
}

// ─── Init ────────────────────────────────────────────────────

// Initialize Navbar
initNavbar({
    containerId: "navbar",
    data: navbarData,
});

// Initialize Company Logos Slider
companySlider({
    containerId: "company-slider",
    companies: companiesLogoData,
});

// Render data-driven sections
renderStats(aboutStats);
renderVisionValues(aboutVision, aboutValues);
renderTeam(aboutTeam);

// Initialize Gallery Carousel
initGalleryCarousel({
    containerId: "about-gallery",
    galleryItems: galleryItems,
});

// Initialize Contact Form
initContactForm("contact-form");

// Initialize Footer
initFooter("footer");

// Initialize Lead Modal Popup
initEnquiryPopup();
