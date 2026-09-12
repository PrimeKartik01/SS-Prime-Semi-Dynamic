import { propertyCard, propertySkeletonCard } from "../propertyCard/propertyCard.js";

const DESKTOP_ITEMS_PER_PAGE = 6;
const MOBILE_ITEMS_PER_PAGE = 3;
let currentPage = 1;
let currentProperties = [];
let currentItemsPerPage = null;
let isPaginationBound = false;
let isViewportListenerBound = false;

function getItemsPerPage() {

    return window.matchMedia("(max-width: 767px)").matches
        ? MOBILE_ITEMS_PER_PAGE
        : DESKTOP_ITEMS_PER_PAGE;

}

export function renderPropertySkeletons(containerId = "propertyContainer", count = 4) {

    const container = document.getElementById(containerId);

    if (!container) return;

    const skeletons = Array.from({ length: count }, () => propertySkeletonCard()).join("");

    container.innerHTML = skeletons;

}

export function renderProperties(properties, page = 1, itemsPerPageOverride = null) {


    const container = document.getElementById("propertyContainer");
    if (!container) return;
    currentProperties = properties;
    currentItemsPerPage = itemsPerPageOverride ?? currentItemsPerPage ?? getItemsPerPage();

    if (!isViewportListenerBound) {

        window.matchMedia("(max-width: 767px)").addEventListener("change", () => {
            renderProperties(currentProperties, currentPage, currentItemsPerPage);
        });
        isViewportListenerBound = true;

    }

    const itemsPerPage = currentItemsPerPage;
    const totalPages = Math.max(1, Math.ceil(properties.length / itemsPerPage));
    currentPage = Math.min(Math.max(page, 1), totalPages);

    if (!properties.length) {

        container.innerHTML = `

            <div class="col-span-full text-center py-20">

                <h2 class="text-xl font-semibold text-white">

                    No Property Found

                </h2>

            </div>

        `;

        return;

    }

    if (!isPaginationBound) {

        container.addEventListener("click", handlePaginationClick);
        isPaginationBound = true;

    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleProperties = properties.slice(startIndex, startIndex + itemsPerPage);

    const cards = visibleProperties.map(propertyCard).join("");

    const paginationMarkup = totalPages > 1 ? `

        <div class="col-span-full mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div class="flex flex-wrap items-center justify-center gap-2">

                <button
                    data-page="${currentPage - 1}"
                    class="px-4 p-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}"
                    ${currentPage === 1 ? "disabled" : ""}
                >
                    Prev
                </button>

                ${[currentPage, currentPage + 1]
                    .filter(pageNumber => pageNumber <= totalPages)
                    .map(pageNumber => `

                        <button
                            data-page="${pageNumber}"
                            class="py-1 px-2 rounded-lg border ${pageNumber === currentPage ? "bg-yellow-500 text-white border-yellow-500" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"}"
                        >
                            ${pageNumber}
                        </button>

                    `).join("")}

                <button
                    data-page="${currentPage + 1}"
                    class="px-4 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}"
                    ${currentPage === totalPages ? "disabled" : ""}
                >
                    Next
                </button>

            </div>

        </div>

    ` : "";

    container.innerHTML = `${cards}${paginationMarkup}`;

    new Swiper(".propertySwiper", {

        loop: true,

        speed: 800,

        autoplay: {

            delay: 3000,

            disableOnInteraction: false,

        },

        pagination: {

            el: ".swiper-pagination",

            clickable: true,

        },

    });

}

function handlePaginationClick(event) {

    const button = event.target.closest("[data-page]");

    if (!button) return;

    const requestedPage = Number(button.dataset.page);
    const totalPages = Math.max(1, Math.ceil(currentProperties.length / (currentItemsPerPage ?? getItemsPerPage())));

    if (!Number.isInteger(requestedPage) || requestedPage < 1 || requestedPage > totalPages) {

        return;

    }

    renderProperties(currentProperties, requestedPage);

}