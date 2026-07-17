import { propertyCard } from "../propertyCard/propertyCard.js";

const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let currentProperties = [];
let isPaginationBound = false;

export function renderProperties(properties, page = 1) {

    const container = document.getElementById("propertyContainer");
    if (!container) return;
    currentProperties = properties;

    const totalPages = Math.max(1, Math.ceil(properties.length / ITEMS_PER_PAGE));
    currentPage = Math.min(Math.max(page, 1), totalPages);

    if (!properties.length) {

        container.innerHTML = `

            <div class="col-span-full text-center py-20">

                <h2 class="text-3xl font-bold">

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

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleProperties = properties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const cards = visibleProperties.map(propertyCard).join("");

    const paginationMarkup = totalPages > 1 ? `

        <div class="col-span-full mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div class="flex flex-wrap items-center justify-center gap-2">

                <button
                    data-page="${currentPage - 1}"
                    class="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}"
                    ${currentPage === 1 ? "disabled" : ""}
                >
                    Prev
                </button>

                ${Array.from({ length: totalPages }, (_, index) => {

                    const pageNumber = index + 1;

                    return `

                        <button
                            data-page="${pageNumber}"
                            class="px-3 py-2 rounded-lg border ${pageNumber === currentPage ? "bg-yellow-500 text-white border-yellow-500" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"}"
                        >
                            ${pageNumber}
                        </button>

                    `;

                }).join("")}

                <button
                    data-page="${currentPage + 1}"
                    class="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}"
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
    const totalPages = Math.max(1, Math.ceil(currentProperties.length / ITEMS_PER_PAGE));

    if (!Number.isInteger(requestedPage) || requestedPage < 1 || requestedPage > totalPages) {

        return;

    }

    renderProperties(currentProperties, requestedPage);

}