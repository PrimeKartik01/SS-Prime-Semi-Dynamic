import { renderProperties } from "../propertyList/propertyList.js";

let allProperties = [];

export function initSearch(properties) {

    const searchContainer = document.getElementById("searchContainer");
    if (!searchContainer) return;

    allProperties = properties;

    renderSearch();

    populateDropdowns();

    registerEvents();

}

function renderSearch() {

    const container = document.getElementById("searchContainer");

    container.innerHTML = `

        <!-- ====== MOBILE: Clean pill search bar (visible only on mobile) ====== -->
        <div class="flex md:hidden items-center bg-white rounded-2xl shadow-2xl overflow-hidden">

            <div class="pl-3 flex-shrink-0 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="m21 21-4.35-4.35"/>
                </svg>
            </div>

            <input
                id="searchInputMobile"
                type="text"
                placeholder="Search City, Location, Project..."
                class="flex-1 h-14 px-3 bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm"
            >

            <button
                id="searchBtnMobile"
                class="flex-shrink-0 h-14 px-5 bg-yellow-500 text-white font-bold flex items-center gap-2 text-sm active:bg-yellow-600"
            >
                Search
            </button>

        </div>

        <!-- ====== DESKTOP / TABLET: 2-row white card search bar (hidden on mobile) ====== -->
        <div class="hidden md:block bg-white rounded-2xl shadow-2xl overflow-hidden">

            <!-- Row 1: Dropdowns + Search Button -->
            <div class="flex items-stretch" style="min-height:76px;">

                <!-- City -->
                <div class="flex-1 flex items-center px-5 py-3 border-r border-gray-100 cursor-pointer gap-2">
                    <svg class="text-[#1a3c2e] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <div class="relative flex items-center flex-1">
                        <select id="cityFilter" class="appearance-none w-full bg-transparent text-gray-800 font-medium text-sm outline-none cursor-pointer pr-5 leading-snug">
                            <option value="" style="color:#111;background:#fff;">Select City</option>
                        </select>
                        <svg class="pointer-events-none absolute right-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"/>
                        </svg>
                    </div>
                </div>

                <!-- Location -->
                <div class="flex-1 flex items-center px-5 py-3 border-r border-gray-100 cursor-pointer gap-2">
                   
                    <svg class="text-[#1a3c2e] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                       
                    <div class="relative flex items-center flex-1">
                        <select id="locationFilter" class="appearance-none w-full bg-transparent text-gray-800 font-medium text-sm outline-none cursor-pointer pr-5 leading-snug">
                            <option value="" style="color:#111;background:#fff;">Select Location</option>
                        </select>
                        <svg class="pointer-events-none absolute right-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"/>
                        </svg>
                    </div>
                </div>

                <!-- Project -->
                <div class="flex-1 flex items-center px-5 py-3 border-r border-gray-100 cursor-pointer gap-2">
                   
                    <svg class="text-[#1a3c2e] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                    </svg>

                    <div class="relative flex items-center flex-1">
                        <select id="builderFilter" class="appearance-none w-full bg-transparent text-gray-800 font-medium text-sm outline-none cursor-pointer pr-5 leading-snug">
                            <option value="" style="color:#111;background:#fff;">Select Project</option>
                        </select>
                        <svg class="pointer-events-none absolute right-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"/>
                        </svg>
                    </div>
                </div>

                <!-- Project Type -->
                <div class="flex-1 flex items-center px-5 py-3 border-r border-gray-100 cursor-pointer gap-2">

                        <svg class="text-[#1a3c2e] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
                        </svg>
                        
                    <div class="relative flex items-center flex-1">
                        <select id="typeFilter" class="appearance-none w-full bg-transparent text-gray-800 font-medium text-sm outline-none cursor-pointer pr-5 leading-snug">
                            <option value="" style="color:#111;background:#fff;">Property Types</option>
                        </select>
                        <svg class="pointer-events-none absolute right-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"/>
                        </svg>
                    </div>
                </div>

                <!-- Property Type -->
                <div class="flex-1 flex items-center px-5 py-3 border-r border-gray-100 cursor-pointer gap-2">

                    <svg class="text-[#1a3c2e] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    
                    <div class="relative flex items-center flex-1">
                        <select id="categoryFilter" class="appearance-none w-full bg-transparent text-gray-800 font-medium text-sm outline-none cursor-pointer pr-5 leading-snug">
                            <option value="" style="color:#111;background:#fff;">Property Category</option>
                        </select>
                        <svg class="pointer-events-none absolute right-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"/>
                        </svg>
                    </div>
                </div>

                <!-- Search Button -->
                <div class="flex items-center px-4 py-3 flex-shrink-0">
                    <button
                        id="searchBtn"
                        class="flex items-center gap-2 h-full px-7 bg-yellow-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm whitespace-nowrap"
                        style="min-height:50px;"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        Search
                    </button>
                </div>

            </div>

            <!-- Row 2: Text search input + Clear -->
            <div class="flex items-center border-t border-gray-100 px-5 py-3 gap-3">
                <svg class="text-[#1a3c2e] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                    id="searchInput"
                    type="text"
                    placeholder="Search by project name, builder, location..."
                    class="flex-1 bg-transparent text-gray-800 font-medium text-sm outline-none placeholder-gray-400"
                >
                <button id="clearFilters" class="flex-shrink-0 text-xs text-gray-400 hover:text-red-500 transition-colors duration-150 px-3 py-1.5 rounded-lg hover:bg-red-50">
                    Clear All
                </button>
            </div>

            <!-- Hidden selects for filter compatibility -->
            <select id="bhkFilter" class="hidden"><option value=""></option></select>
            <select id="statusFilter" class="hidden"><option value=""></option></select>
            <select id="budgetFilter" class="hidden"><option value=""></option></select>

        </div>

    `;

}

function populateDropdowns() {

    populateSelect("cityFilter", "city");

    populateSelect("locationFilter", "location");

    populateSelect("builderFilter", "builder");

    populateSelect("typeFilter", "type");

    populateSelect("categoryFilter", "category");

}

function populateSelect(selectId, key) {

    const select = document.getElementById(selectId);
    if (!select) return;

    const values = [...new Set(allProperties.map(item => item[key]).filter(v => v && v.trim()))];

    values.sort();

    values.forEach(value => {

        const option = document.createElement("option");

        option.value = value;

        option.textContent = value;

        option.style.color = "#111";

        option.style.background = "#fff";

        select.appendChild(option);

    });

}

function scrollToPropertySection() {

    const propertySection = document.getElementById("propertyContainer");
    if (!propertySection) return;

    propertySection.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });

}

function filterProperties() {

    const keyword = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();

    const category = document.getElementById("categoryFilter")?.value || "";

    const type = document.getElementById("typeFilter")?.value || "";

    const builder = document.getElementById("builderFilter")?.value || "";

    const city = document.getElementById("cityFilter")?.value || "";

    const location = document.getElementById("locationFilter")?.value || "";

    const bhk = document.getElementById("bhkFilter")?.value || "";

    const status = document.getElementById("statusFilter")?.value || "";

    const budget = document.getElementById("budgetFilter")?.value || "";

    const filtered = allProperties.filter(property => {

        const searchMatch = !keyword ||
            property.title.toLowerCase().includes(keyword) ||
            property.builder.toLowerCase().includes(keyword) ||
            property.location.toLowerCase().includes(keyword) ||
            property.city.toLowerCase().includes(keyword);

        const categoryMatch = !category || property.category === category;

        const typeMatch = !type || property.type === type;

        const builderMatch = !builder || property.builder === builder;

        const cityMatch = !city || property.city === city;

        const locationMatch = !location || property.location === location;

        const bhkMatch = !bhk || property.bhk === bhk;

        const statusMatch = !status || property.status === status;

        const budgetMatch = !budget || property.price <= Number(budget);

        return (
            searchMatch &&
            categoryMatch &&
            typeMatch &&
            builderMatch &&
            cityMatch &&
            locationMatch &&
            bhkMatch &&
            statusMatch &&
            budgetMatch
        );

    });

    renderProperties(filtered, 1);
    scrollToPropertySection();

}

function registerEvents() {

    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const typeFilter = document.getElementById("typeFilter");
    const builderFilter = document.getElementById("builderFilter");
    const cityFilter = document.getElementById("cityFilter");
    const locationFilter = document.getElementById("locationFilter");
    const clearFilters = document.getElementById("clearFilters");


    // Search Button
    if (searchBtn) searchBtn.addEventListener("click", filterProperties);

    // Desktop Search Input — live filter + Enter key
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            filterProperties();
        });
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") filterProperties();
        });
    }

    // Dropdown Events
    if (categoryFilter) categoryFilter.addEventListener("change", filterProperties);
    if (typeFilter) typeFilter.addEventListener("change", filterProperties);
    if (builderFilter) builderFilter.addEventListener("change", filterProperties);
    if (cityFilter) cityFilter.addEventListener("change", filterProperties);
    if (locationFilter) locationFilter.addEventListener("change", filterProperties);


    // Clear Filters
    if (clearFilters) {
        clearFilters.addEventListener("click", () => {

            if (searchInput) searchInput.value = "";

            const mobileInput = document.getElementById("searchInputMobile");
            if (mobileInput) mobileInput.value = "";

            if (categoryFilter) categoryFilter.value = "";
            if (typeFilter) typeFilter.value = "";
            if (builderFilter) builderFilter.value = "";
            if (cityFilter) cityFilter.value = "";
            if (locationFilter) locationFilter.value = "";

            const bhkFilter = document.getElementById("bhkFilter");
            const statusFilter = document.getElementById("statusFilter");
            const budgetFilter = document.getElementById("budgetFilter");
            if (bhkFilter) bhkFilter.value = "";
            if (statusFilter) statusFilter.value = "";
            if (budgetFilter) budgetFilter.value = "";

            renderProperties(allProperties, 1);
            scrollToPropertySection();

        });
    }


    // ====== Mobile Search Pill Handlers ======
    const searchInputMobile = document.getElementById("searchInputMobile");
    const searchBtnMobile = document.getElementById("searchBtnMobile");

    if (searchInputMobile && searchBtnMobile) {

        searchBtnMobile.addEventListener("click", () => {
            if (searchInput) searchInput.value = searchInputMobile.value;
            filterProperties();
        });

        searchInputMobile.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                if (searchInput) searchInput.value = searchInputMobile.value;
                filterProperties();
            }
        });

        searchInputMobile.addEventListener("input", () => {
            if (searchInput) searchInput.value = searchInputMobile.value;
            if (searchInputMobile.value.length === 0) {
                filterProperties();
            }
        });

    }

}