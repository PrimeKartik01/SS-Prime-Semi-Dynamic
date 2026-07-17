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

            <div class="pl-4 flex-shrink-0 text-gray-400">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="m21 21-4.35-4.35"/>
                </svg>
                Search
            </button>

        </div>

        <!-- ====== DESKTOP / TABLET: Full glassmorphism filter card (hidden on mobile) ====== -->
        <div class="hidden md:block rounded-2xl shadow-2xl p-5" style="background: rgba(0,0,0,0.45); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.12);">

            <!-- Row 1: Search input + dropdowns + Search button -->
            <div class="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-7 gap-3">

                <select id="categoryFilter" class="h-11 rounded-xl border border-white/30 bg-white/95 text-gray-800 px-3 outline-none cursor-pointer">
                    <option value="" style="color:#111;background:#fff;">Category</option>
                </select>

                <select id="typeFilter" class="h-11 rounded-xl border border-white/30 bg-white/95 text-gray-800 px-3 outline-none cursor-pointer">
                    <option value="" style="color:#111;background:#fff;">Property Type</option>
                </select>

                <select id="builderFilter" class="h-11 rounded-xl border border-white/30 bg-white/95 text-gray-800 px-3 outline-none cursor-pointer">
                    <option value="" style="color:#111;background:#fff;">Builder</option>
                </select>

                <select id="cityFilter" class="h-11 rounded-xl border border-white/30 bg-white/95 text-gray-800 px-3 outline-none cursor-pointer">
                    <option value="" style="color:#111;background:#fff;">City</option>
                </select>

                <select id="bhkFilter" class="h-11 rounded-xl border border-white/30 bg-white/95 text-gray-800 px-3 outline-none cursor-pointer">
                    <option value="" style="color:#111;background:#fff;">BHK</option>
                </select>

                <select id="statusFilter" class="h-11 rounded-xl border border-white/30 bg-white/95 text-gray-800 px-3 outline-none cursor-pointer">
                    <option value="" style="color:#111;background:#fff;">Status</option>
                </select>

                <select id="budgetFilter" class="h-11 rounded-xl border border-white/30 bg-white/95 text-gray-800 px-3 outline-none cursor-pointer">
                    <option value="" style="color:#111;background:#fff;">Budget</option>
                    <option value="50"  style="color:#111;background:#fff;">Under ₹50 Lakh</option>
                    <option value="75"  style="color:#111;background:#fff;">Under ₹75 Lakh</option>
                    <option value="100" style="color:#111;background:#fff;">Under ₹1 Crore</option>
                    <option value="150" style="color:#111;background:#fff;">Under ₹1.5 Crore</option>
                    <option value="200" style="color:#111;background:#fff;">Under ₹2 Crore</option>
                </select>

            </div>

            <!-- Row 2: Secondary filters -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
               
                <input
                    id="searchInput"
                    type="text"
                    placeholder="Search Project, Builder, Location..."
                    class=" xl:col-span-2 h-11 px-4 rounded-xl border border-white/30 bg-white/95 text-gray-800 placeholder-gray-400 focus:border-yellow-400 outline-none"
                >

                <button
                    id="searchBtn"
                    class=" lg:col-span-1 h-11 rounded-xl bg-yellow-500 text-white font-semibold hover:bg-yellow-400 transition-colors duration-200"
                >
                   Search
                </button>

                <button
                    id="clearFilters"
                    class="h-11 rounded-xl border border-red-300/80 text-red-200 hover:bg-red-500 hover:text-white transition-colors duration-200"
                >
                    Clear
                </button>

            </div>

        </div>

    `;

}

function populateDropdowns() {

    populateSelect("categoryFilter", "category");

    populateSelect("typeFilter", "type");

    populateSelect("builderFilter", "builder");

    populateSelect("cityFilter", "city");

    populateSelect("bhkFilter", "bhk");

    populateSelect("statusFilter", "status");

}

function populateSelect(selectId, key) {

    const select = document.getElementById(selectId);

    const values = [...new Set(allProperties.map(item => item[key]))];

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

function filterProperties() {

    const keyword = document.getElementById("searchInput").value.toLowerCase().trim();

    const category = document.getElementById("categoryFilter").value;

    const type = document.getElementById("typeFilter").value;

    const builder = document.getElementById("builderFilter").value;

    const city = document.getElementById("cityFilter").value;

    const bhk = document.getElementById("bhkFilter").value;

    const status = document.getElementById("statusFilter").value;

    const budget = document.getElementById("budgetFilter").value;

    const filtered = allProperties.filter(property => {

        const searchMatch =

            property.title.toLowerCase().includes(keyword) ||

            property.builder.toLowerCase().includes(keyword) ||

            property.location.toLowerCase().includes(keyword) ||

            property.city.toLowerCase().includes(keyword);

        const categoryMatch =
            !category || property.category === category;

        const typeMatch =
            !type || property.type === type;

        const builderMatch =
            !builder || property.builder === builder;

        const cityMatch =
            !city || property.city === city;

        const bhkMatch =
            !bhk || property.bhk === bhk;

        const statusMatch =
            !status || property.status === status;

        const budgetMatch =
            !budget || property.price <= Number(budget);

        return (

            searchMatch &&

            categoryMatch &&

            typeMatch &&

            builderMatch &&

            cityMatch &&

            bhkMatch &&

            statusMatch &&

            budgetMatch

        );

    });

    renderProperties(filtered, 1);

}

function registerEvents() {

    const searchBtn = document.getElementById("searchBtn");

    const searchInput = document.getElementById("searchInput");

    const categoryFilter = document.getElementById("categoryFilter");

    const typeFilter = document.getElementById("typeFilter");

    const builderFilter = document.getElementById("builderFilter");

    const cityFilter = document.getElementById("cityFilter");

    const bhkFilter = document.getElementById("bhkFilter");

    const statusFilter = document.getElementById("statusFilter");

    const budgetFilter = document.getElementById("budgetFilter");

    const clearFilters = document.getElementById("clearFilters");


    // Search Button
    searchBtn.addEventListener("click", filterProperties);


    // Enter Key
    searchInput.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            filterProperties();

        }

    });


    // Live Search
    searchInput.addEventListener("input", () => {

        if (searchInput.value.length === 0) {

            filterProperties();

        }

    });


    // Dropdown Events
    categoryFilter.addEventListener("change", filterProperties);

    typeFilter.addEventListener("change", filterProperties);

    builderFilter.addEventListener("change", filterProperties);

    cityFilter.addEventListener("change", filterProperties);

    bhkFilter.addEventListener("change", filterProperties);

    statusFilter.addEventListener("change", filterProperties);

    budgetFilter.addEventListener("change", filterProperties);


    // Clear Filters
    clearFilters.addEventListener("click", () => {

        searchInput.value = "";

        // Also clear mobile search input
        const mobileInput = document.getElementById("searchInputMobile");
        if (mobileInput) mobileInput.value = "";

        categoryFilter.value = "";

        typeFilter.value = "";

        builderFilter.value = "";

        cityFilter.value = "";

        bhkFilter.value = "";

        statusFilter.value = "";

        budgetFilter.value = "";

        renderProperties(allProperties, 1);

    });


    // ====== Mobile Search Pill Handlers ======
    const searchInputMobile = document.getElementById("searchInputMobile");
    const searchBtnMobile = document.getElementById("searchBtnMobile");

    if (searchInputMobile && searchBtnMobile) {

        // Sync mobile value to desktop input, then filter
        searchBtnMobile.addEventListener("click", () => {
            searchInput.value = searchInputMobile.value;
            filterProperties();
        });

        searchInputMobile.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                searchInput.value = searchInputMobile.value;
                filterProperties();
            }
        });

        searchInputMobile.addEventListener("input", () => {
            searchInput.value = searchInputMobile.value;
            if (searchInputMobile.value.length === 0) {
                filterProperties();
            }
        });

    }

}