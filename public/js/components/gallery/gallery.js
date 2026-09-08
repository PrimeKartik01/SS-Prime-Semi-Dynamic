export function renderGalleryComponent(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // We will render the grid and lightbox HTML into this container
    container.innerHTML = `
        <div id="gallery-grid" class="grid grid-cols-1 gap-4 md:auto-rows-[220px] md:grid-cols-4"></div>
        <div id="gallery-lightbox" class="gallery-lightbox fixed inset-0 z-[100] hidden flex min-h-screen items-center justify-center bg-slate-950/95 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Gallery image preview">
            <button id="lightbox-close" class="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-amber-400 hover:text-amber-400" type="button" aria-label="Close image preview">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="flex min-h-[calc(100vh-2rem)] w-full max-w-5xl flex-col items-center justify-center gap-4 text-center sm:min-h-[calc(100vh-4rem)] sm:gap-5">
                <img id="lightbox-image" class="mx-auto max-h-[calc(100vh-12rem)] max-w-full object-contain sm:max-h-[calc(100vh-13rem)]" src="" alt="">
                <div class="max-w-xl shrink-0 text-white">
                    <p class="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-amber-400">SS Prime Infra</p>
                    <h2 id="lightbox-title" class="font-display text-3xl"></h2>
                    <p id="lightbox-description" class="mt-4 text-sm leading-7 text-slate-300"></p>
                </div>
            </div>
        </div>
    `;

    const grid = document.getElementById("gallery-grid");
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxDescription = document.getElementById("lightbox-description");

    if (!grid || !lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription) return;

    grid.innerHTML = items.map((item, index) => {
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

    grid.querySelectorAll("[data-gallery-index]").forEach((card) => {
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
