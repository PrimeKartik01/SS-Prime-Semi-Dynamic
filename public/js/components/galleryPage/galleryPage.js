import { initNavbar } from "../navbar/navbar.js";
import { navbarData } from "../../data/navbarData.js";
import { galleryItems } from "../../data/aboutData.js";
import { initFooter } from "../footer/footer.js";
import { initEnquiryPopup } from "../enquiryPopup/enquiryPopup.js";

function renderGallery(items) {
    const container = document.getElementById("gallery-grid");
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxDescription = document.getElementById("lightbox-description");

    if (!container || !lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription) return;

    container.innerHTML = items.map((item, index) => {
        const layoutClasses = [
            "md:col-span-2 md:row-span-2",
            "md:col-span-2",
            "md:col-span-2",
            "md:col-span-2 md:row-span-2",
        ][index] || "";

        return `
        <button class="group relative min-h-[330px] overflow-hidden bg-slate-950 text-left fade-up md:min-h-0 ${layoutClasses}" type="button" data-gallery-index="${index}">
            <img class="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110" src="${item.image}" alt="${item.title}" loading="lazy">
            <span class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/90"></span>
            <span class="absolute inset-x-6 bottom-6 flex flex-col text-white">
                <span class="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">0${index + 1}</span>
                <span class="mt-2 font-display text-2xl sm:text-3xl">${item.title}</span>
                <span class="mt-3 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-white/70"><i class="fa-solid fa-arrow-up-right-from-square"></i> View image</span>
            </span>
        </button>
    `;
    }).join("");

    const openLightbox = (index) => {
        const item = items[index];
        if (!item) return;
        lightboxImage.src = item.image;
        lightboxImage.alt = item.title;
        lightboxTitle.textContent = item.title;
        lightboxDescription.textContent = item.description;
        lightbox.classList.remove("hidden");
        document.body.classList.add("overflow-hidden");
    };

    const closeLightbox = () => {
        lightbox.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
    };

    container.querySelectorAll("[data-gallery-index]").forEach((card) => {
        card.addEventListener("click", () => openLightbox(Number(card.dataset.galleryIndex)));
    });
    document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeLightbox();
    });
}

initNavbar({ containerId: "navbar", data: navbarData });
renderGallery(galleryItems);
initFooter("footer");
initEnquiryPopup();