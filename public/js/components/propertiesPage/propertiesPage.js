import { properties } from "../../data/properties.js";

import { initNavbar } from "../navbar/navbar.js";
import { navbarData } from "../../data/navbarData.js";

import { initFooter } from "../footer/footer.js";

import {
    initEnquiryPopup,
    openEnquiryPopup
} from "../enquiryPopup/enquiryPopup.js";

// ── Boot ──────────────────────────────────────────────────────────────────────

initNavbar({ containerId: "navbar", data: navbarData });
initFooter("footer");
initEnquiryPopup();

// ── State ─────────────────────────────────────────────────────────────────────

const state = {
    search: "",
    cities: new Set(),
    categories: new Set(),
    types: new Set(),
    statuses: new Set(),
    maxBudget: 700,      // in Lakhs (0 = unlimited)
    sort: "default",
};

// ── DOM helpers ───────────────────────────────────────────────────────────────

const $ = id => document.getElementById(id);

// ── Unique values from properties ─────────────────────────────────────────────

function unique(key) {
    return [...new Set(properties.map(p => p[key]).filter(Boolean))].sort();
}

// ── Build a checkbox filter group ─────────────────────────────────────────────

function buildCheckboxGroup(containerId, values, stateSet) {
    const container = $(containerId);
    if (!container) return;
    container.innerHTML = "";

    values.forEach(val => {
        const count = properties.filter(p => p[containerId.replace("Filters", "").toLowerCase()] === val).length;
        const id = `chk-${containerId}-${val.replace(/\s+/g, "-")}`;

        const label = document.createElement("label");
        label.className = "filter-checkbox-item";
        label.htmlFor = id;
        label.innerHTML = `
            <input type="checkbox" id="${id}" value="${val}" ${stateSet.has(val) ? "checked" : ""}>
            <span class="filter-checkbox-label">${val}</span>
            <span class="filter-checkbox-count">${count}</span>
        `;
        container.appendChild(label);

        label.querySelector("input").addEventListener("change", e => {
            if (e.target.checked) stateSet.add(val);
            else stateSet.delete(val);
            applyFilters();
        });
    });
}

// ── Populate filter UI ────────────────────────────────────────────────────────

function buildFilters() {
    // City
    buildCheckboxGroup("cityFilters", unique("city"), state.cities);

    // Category
    const cats = [...new Set(properties.map(p => p.category).filter(Boolean))].sort();
    const catContainer = $("categoryFilters");
    catContainer.innerHTML = "";
    cats.forEach(cat => {
        const count = properties.filter(p => p.category === cat).length;
        const id = `chk-cat-${cat}`;
        const label = document.createElement("label");
        label.className = "filter-checkbox-item";
        label.htmlFor = id;
        label.innerHTML = `
            <input type="checkbox" id="${id}" value="${cat}" ${state.categories.has(cat) ? "checked" : ""}>
            <span class="filter-checkbox-label">${cat}</span>
            <span class="filter-checkbox-count">${count}</span>
        `;
        catContainer.appendChild(label);
        label.querySelector("input").addEventListener("change", e => {
            if (e.target.checked) state.categories.add(cat);
            else state.categories.delete(cat);
            applyFilters();
        });
    });

    // Type
    const types = [...new Set(properties.map(p => p.type).filter(Boolean))].sort();
    const typeContainer = $("typeFilters");
    typeContainer.innerHTML = "";
    types.forEach(type => {
        const count = properties.filter(p => p.type === type).length;
        const id = `chk-type-${type.replace(/\s+/g, "-")}`;
        const label = document.createElement("label");
        label.className = "filter-checkbox-item";
        label.htmlFor = id;
        label.innerHTML = `
            <input type="checkbox" id="${id}" value="${type}" ${state.types.has(type) ? "checked" : ""}>
            <span class="filter-checkbox-label">${type}</span>
            <span class="filter-checkbox-count">${count}</span>
        `;
        typeContainer.appendChild(label);
        label.querySelector("input").addEventListener("change", e => {
            if (e.target.checked) state.types.add(type);
            else state.types.delete(type);
            applyFilters();
        });
    });

    // Status
    const statuses = [...new Set(properties.map(p => p.status).filter(Boolean))].sort();
    const statusContainer = $("statusFilters");
    statusContainer.innerHTML = "";
    statuses.forEach(status => {
        const count = properties.filter(p => p.status === status).length;
        const id = `chk-status-${status.replace(/\s+/g, "-")}`;
        const label = document.createElement("label");
        label.className = "filter-checkbox-item";
        label.htmlFor = id;
        label.innerHTML = `
            <input type="checkbox" id="${id}" value="${status}" ${state.statuses.has(status) ? "checked" : ""}>
            <span class="filter-checkbox-label">${status}</span>
            <span class="filter-checkbox-count">${count}</span>
        `;
        statusContainer.appendChild(label);
        label.querySelector("input").addEventListener("change", e => {
            if (e.target.checked) state.statuses.add(status);
            else state.statuses.delete(status);
            applyFilters();
        });
    });
}

// ── Filter + Sort logic ───────────────────────────────────────────────────────

function getFiltered() {
    let list = [...properties];

    // Search
    if (state.search) {
        const q = state.search.toLowerCase();
        list = list.filter(p =>
            p.title.toLowerCase().includes(q) ||
            (p.builder && p.builder.toLowerCase().includes(q)) ||
            (p.city && p.city.toLowerCase().includes(q)) ||
            (p.location && p.location.toLowerCase().includes(q))
        );
    }

    // City
    if (state.cities.size) {
        list = list.filter(p => state.cities.has(p.city));
    }

    // Category
    if (state.categories.size) {
        list = list.filter(p => state.categories.has(p.category));
    }

    // Type
    if (state.types.size) {
        list = list.filter(p => state.types.has(p.type));
    }

    // Status
    if (state.statuses.size) {
        list = list.filter(p => state.statuses.has(p.status));
    }

    // Budget
    if (state.maxBudget < 700) {
        list = list.filter(p => p.price <= state.maxBudget || p.price === 0);
    }

    // Sort
    if (state.sort === "price-asc") {
        list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (state.sort === "price-desc") {
        list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (state.sort === "rating") {
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
        // Featured first
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
}

// ── Count active filters ──────────────────────────────────────────────────────

function activeFilterCount() {
    return (
        (state.search ? 1 : 0) +
        state.cities.size +
        state.categories.size +
        state.types.size +
        state.statuses.size +
        (state.maxBudget < 700 ? 1 : 0)
    );
}

// ── Render a single property card ─────────────────────────────────────────────

function renderPropertyCard(property, index) {
    const hasImage = property.images && property.images.length > 0;
    const imageUrl = hasImage ? property.images[0] : null;
    const delay = (index % 9) * 50;

    const statusClass = property.status
        ? (["New Launch", "Pre Launch", "Pre-Launch"].includes(property.status)
            ? "status-new"
            : property.status === "Delivered"
                ? "status-delivered"
                : "")
        : "";

    return `
    <article class="prop-card fade-up" style="animation-delay:${delay}ms">

        <!-- Image -->
        <div class="prop-card-image-wrapper">
            ${hasImage
                ? `<img src="${imageUrl}" alt="${property.title}" loading="lazy"
                        onerror="this.parentElement.innerHTML='<div class=\\'prop-card-no-image\\'><svg xmlns=\\'http://www.w3.org/2000/svg\\' class=\\'w-12 h-12 text-gray-300\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke=\\'currentColor\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'1.5\\' d=\\'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z\\'/></svg></div>'"
                    />`
                : `<div class="prop-card-no-image"><svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg></div>`
            }
            ${property.status
                ? `<span class="prop-card-status ${statusClass}">${property.status}</span>`
                : ""}
            <button class="prop-card-enquire-btn enquireBtn" data-id="${property.id}">
                Enquire Now
            </button>
        </div>

        <!-- Body -->
        <div class="prop-card-body">
            <p class="prop-card-city">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                ${property.city || ""}${property.location ? ` · ${property.location}` : ""}
            </p>

            <div class="prop-card-title-row">
                <h3 class="prop-card-title">${property.title}</h3>
                <span class="prop-card-category">${property.category}</span>
            </div>

            <div class="prop-card-meta">
                <div class="prop-card-meta-item">
                    <label>Builder</label>
                    <span>${property.builder || "—"}</span>
                </div>
                <div class="prop-card-meta-item">
                    <label>Type</label>
                    <span>${property.type || "—"}</span>
                </div>
                ${property.bhk ? `<div class="prop-card-meta-item"><label>Config</label><span>${property.bhk}</span></div>` : ""}
            </div>

            <div class="prop-card-footer">
                <div>
                    <p class="prop-card-price-label">Starting From</p>
                    <p class="prop-card-price">${property.priceLabel}</p>
                </div>
                <div class="prop-card-actions">
                    <a href="./calculator.html?price=${(property.price && property.price > 0) ? property.price * 100000 : 5000000}"
                        class="prop-card-emi-btn" title="Calculate EMI">
                        <i class="fa-solid fa-calculator"></i>
                        EMI
                    </a>
                    <a href="./property-details.html?id=${property.id}" class="prop-card-view-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        View
                    </a>
                </div>
            </div>
        </div>

    </article>`;
}

// ── Render filtered list ──────────────────────────────────────────────────────

function applyFilters() {
    const filtered = getFiltered();
    const grid = $("allPropertiesGrid");
    const noResults = $("noResultsMsg");
    const shownCount = $("shownCount");
    const totalCount = $("totalCount");
    const resultsCountText = $("resultsCountText");
    const clearBtn = $("clearAllFilters");
    const mobileBadge = $("mobileFilterBadge");

    // Update counts
    if (shownCount) shownCount.textContent = filtered.length;
    if (totalCount) totalCount.textContent = properties.length;
    if (resultsCountText) {
        resultsCountText.textContent = `${filtered.length} ${filtered.length === 1 ? "Property" : "Properties"} Found`;
    }

    // Active filter count
    const active = activeFilterCount();
    if (clearBtn) {
        clearBtn.classList.toggle("hidden", active === 0);
    }
    if (mobileBadge) {
        if (active > 0) {
            mobileBadge.classList.remove("hidden");
            mobileBadge.textContent = active;
        } else {
            mobileBadge.classList.add("hidden");
        }
    }

    if (!grid) return;

    if (filtered.length === 0) {
        grid.classList.add("hidden");
        noResults?.classList.remove("hidden");
    } else {
        grid.classList.remove("hidden");
        noResults?.classList.add("hidden");
        grid.innerHTML = filtered.map((p, i) => renderPropertyCard(p, i)).join("");
    }
}

// ── Update budget range slider visual ────────────────────────────────────────

function updateSliderVisual(slider) {
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty("--range-pct", pct + "%");
}

// ── Reset all filters ─────────────────────────────────────────────────────────

function resetAllFilters() {
    state.search = "";
    state.cities.clear();
    state.categories.clear();
    state.types.clear();
    state.statuses.clear();
    state.maxBudget = 700;
    state.sort = "default";

    // Reset UI
    const searchInput = $("filterSearch");
    if (searchInput) searchInput.value = "";

    document.querySelectorAll("#filterPanel input[type='checkbox']").forEach(cb => {
        cb.checked = false;
    });

    const budget = $("budgetFilter");
    if (budget) {
        budget.value = 700;
        updateSliderVisual(budget);
    }

    const budgetLabel = $("budgetRangeLabel");
    if (budgetLabel) budgetLabel.textContent = "Any";

    const sortSelect = $("sortSelect");
    if (sortSelect) sortSelect.value = "default";

    applyFilters();
}

// ── Wire up events ────────────────────────────────────────────────────────────

function wireEvents() {
    // Search
    const searchInput = $("filterSearch");
    if (searchInput) {
        let debounce;
        searchInput.addEventListener("input", e => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                state.search = e.target.value.trim();
                applyFilters();
            }, 280);
        });
    }

    // Budget slider
    const budgetSlider = $("budgetFilter");
    const budgetLabel = $("budgetRangeLabel");
    if (budgetSlider) {
        updateSliderVisual(budgetSlider);
        budgetSlider.addEventListener("input", e => {
            state.maxBudget = Number(e.target.value);
            updateSliderVisual(e.target);
            if (budgetLabel) {
                budgetLabel.textContent = state.maxBudget >= 700 ? "Any" : `≤ ₹${state.maxBudget}L`;
            }
            applyFilters();
        });
    }

    // Sort
    const sortSelect = $("sortSelect");
    if (sortSelect) {
        sortSelect.addEventListener("change", e => {
            state.sort = e.target.value;
            applyFilters();
        });
    }

    // Clear all
    const clearBtn = $("clearAllFilters");
    if (clearBtn) clearBtn.addEventListener("click", resetAllFilters);

    // Reset from no-results
    const resetBtn = $("resetFiltersBtn");
    if (resetBtn) resetBtn.addEventListener("click", resetAllFilters);

    // Mobile filter toggle
    const mobileToggle = $("mobileFilterToggle");
    const filterPanel = $("filterPanel");
    const chevron = $("mobileFilterChevron");

    if (mobileToggle && filterPanel) {
        mobileToggle.addEventListener("click", () => {
            const isOpen = filterPanel.classList.contains("mobile-open");
            if (isOpen) {
                filterPanel.classList.remove("mobile-open");
                filterPanel.classList.add("hidden");
                filterPanel.classList.remove("lg:block");
                if (chevron) chevron.style.transform = "";
            } else {
                filterPanel.classList.add("mobile-open");
                filterPanel.classList.remove("hidden");
                if (chevron) chevron.style.transform = "rotate(180deg)";
            }
        });
    }

    // Enquiry popup delegation
    document.addEventListener("click", e => {
        const btn = e.target.closest(".enquireBtn");
        if (!btn) return;
        const property = properties.find(p => p.id == btn.dataset.id);
        if (property) openEnquiryPopup(property);
    });
}

// ── Init ──────────────────────────────────────────────────────────────────────

buildFilters();
wireEvents();
applyFilters();
