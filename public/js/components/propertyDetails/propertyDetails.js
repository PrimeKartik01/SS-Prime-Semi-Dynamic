import { initNavbar } from "../navbar/navbar.js";
import { navbarData } from "../../data/navbarData.js";
import { properties } from "../../data/properties.js";

function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function renderPropertyDetails(property) {
    return `
        <div class="bg-white shadow-xl overflow-hidden">
            <div class="swiper propertyDetailsSwiper">
                <div class="swiper-wrapper">
                    ${property.images.map(image => `
                        <div class="swiper-slide">
                            <img src="${image}" class="w-full h-[450px] object-cover" />
                        </div>
                    `).join("")}
                </div>
                <div class="swiper-pagination"></div>
            </div>

            <div class="p-8 space-y-8">
                <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <p class="text-sm text-yellow-600 font-semibold uppercase">${property.category}</p>
                        <h1 class="text-4xl font-bold text-gray-900 mt-3">${property.title}</h1>
                        <p class="text-gray-500 mt-3">Builder ${property.builder}, ${property.location}, ${property.city}</p>
                    </div>
                    <div class="rounded-3xl bg-yellow-500 text-white p-6 w-full sm:w-auto">
                        <p class="text-sm uppercase tracking-[0.2em]">Starting From</p>
                        <p class="text-3xl font-bold mt-2">${property.priceLabel}</p>
                    </div>
                </div>

                <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div class="rounded-3xl border border-gray-200 p-6">
                        <p class="text-sm text-gray-400">BHK</p>
                        <p class="mt-3 text-xl font-semibold">${property.bhk}</p>
                    </div>
                    <div class="rounded-3xl border border-gray-200 p-6">
                        <p class="text-sm text-gray-400">Carpet Area</p>
                        <p class="mt-3 text-xl font-semibold">${property.carpetArea}</p>
                    </div>
                    <div class="rounded-3xl border border-gray-200 p-6">
                        <p class="text-sm text-gray-400">Possession</p>
                        <p class="mt-3 text-xl font-semibold">${property.possession}</p>
                    </div>
                    <div class="rounded-3xl border border-gray-200 p-6">
                        <p class="text-sm text-gray-400">RERA No.</p>
                        <p class="mt-3 text-xl font-semibold">${property.rera}</p>
                    </div>
                </div>

                <div class="grid gap-6 lg:grid-cols-2">
                    <div class="rounded-3xl border border-gray-200 p-8 space-y-4">
                        <h2 class="text-2xl font-semibold">Project Overview</h2>
                        <p class="text-gray-600">
                            ${property.summary || "Discover premium property features, specifications, and amenities designed for modern living."}
                        </p>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div>
                                <p class="text-sm text-gray-400">Status</p>
                                <p class="mt-2 font-semibold">${property.status}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-400">Type</p>
                                <p class="mt-2 font-semibold">${property.type}</p>
                            </div>
                        </div>
                    </div>
                    <div class="rounded-3xl border border-gray-200 p-8 space-y-4">
                        <h2 class="text-2xl font-semibold">Key Highlights</h2>
                        <ul class="list-disc list-inside text-gray-600 space-y-2">
                            <li>Premium location in ${property.location}, ${property.city}</li>
                            <li>Trusted builder: ${property.builder}</li>
                            <li>Flexible BHK options: ${property.bhk}</li>
                            <li>Ready by ${property.possession}</li>
                        </ul>
                    </div>
                </div>

                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <a href="./index.html" class="inline-flex items-center justify-center rounded-3xl border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-100">
                        Back to listings
                    </a>
                    <button class="enquireBtn inline-flex items-center justify-center rounded-3xl bg-yellow-500 px-6 py-3 text-white hover:bg-yellow-600 cursor-pointer" data-id="${property.id}">
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderNotFound() {
    return `
        <div class="rounded-3xl bg-white p-12 shadow-xl text-center">
            <h1 class="text-4xl font-bold mb-4">Property not found</h1>
            <p class="text-gray-600 mb-6">The property you are looking for does not exist or the link is invalid.</p>
            <a href="./index.html" class="inline-flex items-center justify-center rounded-3xl bg-yellow-500 px-6 py-3 text-white hover:bg-yellow-600">Back to listings</a>
        </div>
    `;
}

function init() {
    initNavbar({
        containerId: "navbar",
        data: navbarData,
    });

    const idParam = getQueryParam("id");
    const propertyId = idParam ? Number(idParam) : null;
    const property = properties.find(item => item.id === propertyId);
    const container = document.getElementById("propertyDetails");

    if (!container) return;

    container.innerHTML = property ? renderPropertyDetails(property) : renderNotFound();

    if (property) {
        new Swiper(".propertyDetailsSwiper", {
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }
}

window.addEventListener("DOMContentLoaded", init);
