export function initNavbar({
    containerId,
    data
}) {

    const container =
        document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `
    
    <nav
        id="main-navbar"
        class="fixed top-0 pt-2 md:pt-4 max-w-[1700px] left-1/2 -translate-x-1/2 w-full z-50 transition-all duration-500"
    >

        <div
            class="w-full px-6 lg:px-8"
        >

            <div
                class="flex items-center justify-between h-20"
            >

                <!-- Logo -->
                <a href="index.html" class="relative z-10">

                    <img
                        src="${data.logo}"
                        alt="SS Prime Infra"
                        class="h-14 md:h-20 object-cover drop-shadow-lg"
                    >

                </a>

                <!-- Right Actions -->
                <div class="flex items-center gap-4 md:gap-6">

                    <!-- Desktop CTA -->
                    <a
                        href="javascript:void(0)"
                        class="enquire-now-cta hidden lg:inline-flex items-center gap-2 px-7 py-3 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:from-amber-400 hover:to-amber-500 hover:scale-105 transition-all duration-300 text-sm tracking-wide shadow-lg shadow-amber-500/25"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                        ${data.ctaText}
                    </a>

                    <!-- Hamburger Button -->
                    <button
                        id="mobile-menu-btn"
                        class="relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] group cursor-pointer z-10"
                        aria-label="Open menu"
                    >
                        <span class="hamburger-line block w-6 h-[2px] bg-white rounded-full group-hover:bg-amber-400"></span>
                        <span class="hamburger-line block w-6 h-[2px] bg-white rounded-full group-hover:bg-amber-400"></span>
                        <span class="hamburger-line block w-6 h-[2px] bg-white rounded-full group-hover:bg-amber-400"></span>
                    </button>

                </div>

            </div>

        </div>

    </nav>

    <!-- Overlay -->
    <div
        id="mobile-overlay"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm opacity-0 invisible transition-all duration-500 z-[60]"
    ></div>

    <!-- Drawer -->
    <div
        id="mobile-menu"
        class="fixed top-0 right-0 h-screen w-[300px] bg-gradient-to-b from-slate-900 via-slate-950 to-black translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-[70] shadow-2xl"
    >
        <div class="p-8">

            <!-- Close Button -->
            <div class="flex justify-end">
                <button
                    id="close-menu"
                    class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
                    aria-label="Close menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <!-- Accent Line -->
            <div class="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mt-6 mb-10"></div>

            <!-- Navigation Links -->
            <div class="flex flex-col gap-6">

                ${data.links.map(link => `
                    <a
                        href="${link.href}"
                        class="text-white/80 font-medium tracking-wide text-sm hover:text-amber-400 hover:translate-x-2 transition-all duration-300 flex items-center gap-3"
                    >
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-500/40"></span>
                        ${link.label}
                    </a>
                `).join("")}

                <!-- Drawer CTA -->
                <a
                    href="javascript:void(0)"
                    class="enquire-now-cta mt-6 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-center font-semibold text-sm tracking-wide hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/20"
                >
                    ${data.ctaText}
                </a>

            </div>

        </div>

    </div>
    `;

    const navbar =
        document.getElementById("main-navbar");

    const mobileBtn =
        document.getElementById("mobile-menu-btn");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const mobileOverlay =
        document.getElementById("mobile-overlay");

    const closeMenu =
        document.getElementById("close-menu");

    function openMenu() {

        document.body.style.overflow = "hidden";

        mobileMenu.classList.remove(
            "translate-x-full"
        );

        mobileOverlay.classList.remove(
            "opacity-0",
            "invisible"
        );

    }

    function closeMobileMenu() {

        document.body.style.overflow = "";

        mobileMenu.classList.add(
            "translate-x-full"
        );

        mobileOverlay.classList.add(
            "opacity-0",
            "invisible"
        );

    }

    mobileBtn.addEventListener(
        "click",
        openMenu
    );

    closeMenu.addEventListener(
        "click",
        closeMobileMenu
    );

    mobileOverlay.addEventListener(
        "click",
        closeMobileMenu
    );

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                (e) => {
                    const href = link.getAttribute("href");
                    if (href && href.startsWith("#")) {
                        e.preventDefault();
                        closeMobileMenu();
                        const target = document.querySelector(href);
                        if (target) {
                            setTimeout(() => {
                                target.scrollIntoView({ behavior: "smooth", block: "start" });
                            }, 350);
                        }
                    } else {
                        closeMobileMenu();
                    }
                }
            );

        });

    // Bind click event to Enquire Now CTAs to open modal popup
    container.querySelectorAll(".enquire-now-cta").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent("open-lead-modal"));
        });
    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            navbar.classList.add("navbar-scrolled");

        } else {

            navbar.classList.remove("navbar-scrolled");

        }

    });

}