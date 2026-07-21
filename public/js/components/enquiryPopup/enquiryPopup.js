import { properties } from "../../data/properties.js";
import { submitLead } from "../../utils/api.js";

let popup;
let popupContent;

let propertyIdInput;
let propertyPriceInput;

let projectInput;
let cityInput;
let budgetInput;

export function initEnquiryPopup() {
    // If popup doesn't exist, inject it dynamically
    if (!document.querySelector("#enquiryPopup")) {
        const popupContainer = document.createElement("div");
        popupContainer.innerHTML = `
            <div id="enquiryPopup" class="fixed inset-0 z-[9999] hidden items-center justify-center p-4">
                <!-- Overlay -->
                <div id="popupOverlay" class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

                <!-- Modal -->
                <div id="popupContent"
                    class="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl scale-95 opacity-0 transition-all duration-300">

                    <!-- Header -->
                    <div class="relative bg-yellow-500 px-8 py-8 text-white">
                        <button id="closePopup" class="absolute top-5 right-5 text-3xl leading-none hover:rotate-90 duration-300">
                            &times;
                        </button>
                        <p class="uppercase tracking-[4px] text-sm opacity-90">SS Prime</p>
                        <h2 class="text-3xl font-bold mt-2">Request A Callback</h2>
                        <p class="mt-3 text-white/90">Fill in your details and our property expert will contact you shortly.</p>
                    </div>

                    <!-- Form -->
                    <form id="popupForm" class="p-8 space-y-5">
                        <!-- Hidden -->
                        <input type="hidden" id="propertyId" name="propertyId">
                        <input type="hidden" id="propertyPrice" name="price">

                        <!-- Name -->
                        <div>
                            <label class="font-semibold block mb-2">Full Name</label>
                            <input type="text" id="popupName" name="name" placeholder="Enter your name"
                                class="w-full border rounded-xl px-4 py-3 outline-none focus:border-yellow-500" required>
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="font-semibold block mb-2">Email Address</label>
                            <input type="email" id="popupEmail" name="email" placeholder="Enter your email"
                                class="w-full border rounded-xl px-4 py-3 outline-none focus:border-yellow-500" required>
                        </div>

                        <!-- Phone -->
                        <div>
                            <label class="font-semibold block mb-2">Mobile Number</label>
                            <input type="tel" id="popupPhone" name="phone" placeholder="Enter your mobile number"
                                class="w-full border rounded-xl px-4 py-3 outline-none focus:border-yellow-500" required>
                        </div>

                        <!-- Project -->
                        <div>
                            <label class="font-semibold block mb-2">Interested Project</label>
                            <input type="text" id="popupProject" name="project" readonly
                                class="w-full border rounded-xl px-4 py-3 bg-gray-100 hidden">
                            <select id="popupProjectSelect" name="project"
                                class="w-full border rounded-xl px-4 py-3 outline-none focus:border-yellow-500 bg-white">
                                <option value="">Select Project</option>
                            </select>
                        </div>

                        <!-- City & Budget -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="font-semibold block mb-2">City</label>
                                <input type="text" id="popupCity" name="city" readonly
                                    class="w-full border rounded-xl px-4 py-3 bg-gray-100 hidden">
                                <select id="popupCitySelect" name="city"
                                    class="w-full border rounded-xl px-4 py-3 outline-none focus:border-yellow-500 bg-white">
                                    <option value="">Select City</option>
                                </select>
                            </div>
                            <div>
                                <label class="font-semibold block mb-2">Budget</label>
                                <input type="text" id="popupBudget" name="budget" readonly
                                    class="w-full border rounded-xl px-4 py-3 bg-gray-100 hidden">
                                <select id="popupBudgetSelect" name="budget"
                                    class="w-full border rounded-xl px-4 py-3 outline-none focus:border-yellow-500 bg-white">
                                    <option value="">Select Budget</option>
                                    <option value="Flexible">Flexible</option>
                                    <option value="Under ₹50 Lakhs">Under ₹50 Lakhs</option>
                                    <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                                    <option value="₹1 Crore - ₹2 Crore">₹1 Crore - ₹2 Crore</option>
                                    <option value="₹2 Crore - ₹3 Crore">₹2 Crore - ₹3 Crore</option>
                                    <option value="₹3 Crore - ₹5 Crore">₹3 Crore - ₹5 Crore</option>
                                    <option value="₹5 Crore+">₹5 Crore+</option>
                                </select>
                            </div>
                        </div>

                        <!-- Submit -->
                        <button type="submit"
                            class="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-xl font-semibold duration-300 cursor-pointer">
                            Request Callback
                        </button>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(popupContainer.firstElementChild);

        // Inject stylesheet style block if not already present
        if (!document.querySelector('#enquiryPopupStyles')) {
            const style = document.createElement("style");
            style.id = "enquiryPopupStyles";
            style.textContent = `
                #enquiryPopup {
                    transition: opacity .3s ease;
                }

                #popupContent {
                    transition: transform .3s ease, opacity .3s ease;
                    max-height: calc(100vh - 40px);
                    overflow-y: auto;
                }

                #popupContent::-webkit-scrollbar {
                    width: 6px;
                }

                #popupContent::-webkit-scrollbar-track {
                    background: #f3f4f6;
                }

                #popupContent::-webkit-scrollbar-thumb {
                    background: #eab308;
                    border-radius: 100px;
                }

                #popupContent::-webkit-scrollbar-thumb:hover {
                    background: #ca8a04;
                }

                #popupForm input, #popupForm select {
                    transition: all .25s ease;
                }

                #popupForm input:focus, #popupForm select:focus {
                    box-shadow: 0 0 0 4px rgba(234, 179, 8, .15);
                }

                #popupForm button {
                    transition: all .3s ease;
                }

                #popupForm button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(234, 179, 8, .35);
                }

                #closePopup {
                    transition: all .3s ease;
                }

                #closePopup:hover {
                    transform: rotate(90deg);
                }

                @media (max-width:640px) {
                    #popupContent {
                        max-width: 100%;
                        border-radius: 24px;
                    }
                    #popupContent h2 {
                        font-size: 1.8rem;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    popup = document.querySelector("#enquiryPopup");
    popupContent = document.querySelector("#popupContent");

    propertyIdInput = document.querySelector("#propertyId");
    propertyPriceInput = document.querySelector("#propertyPrice");

    projectInput = document.querySelector("#popupProject");
    cityInput = document.querySelector("#popupCity");
    budgetInput = document.querySelector("#popupBudget");

    const closeButton = document.querySelector("#closePopup");
    const overlay = document.querySelector("#popupOverlay");

    if (closeButton) {
        closeButton.addEventListener("click", closeEnquiryPopup);
    }

    if (overlay) {
        overlay.addEventListener("click", closeEnquiryPopup);
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeEnquiryPopup();
        }
    });

    // Populate dropdowns with unique options
    const projectSelect = document.querySelector("#popupProjectSelect");
    const citySelect = document.querySelector("#popupCitySelect");

    if (projectSelect) {
        // Keep initial select option
        projectSelect.innerHTML = '<option value="">Select Project</option>';
        const uniqueProjects = [...new Set(properties.map(p => p.title).filter(Boolean))].sort();
        uniqueProjects.forEach(project => {
            const option = document.createElement("option");
            option.value = project;
            option.textContent = project;
            projectSelect.appendChild(option);
        });
    }

    if (citySelect) {
        // Keep initial select option
        citySelect.innerHTML = '<option value="">Select City</option>';
        const uniqueCities = [...new Set(properties.map(p => p.city).filter(Boolean))].sort();
        uniqueCities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }

    // Wire up custom event listener from navbar enquire CTA
    window.addEventListener("open-lead-modal", () => {
        openEnquiryPopup();
    });

    // Wire up form submission success handler
    // Wire up form submission success handler
    const form = document.querySelector("#popupForm");

    if (form) {

        form.addEventListener("submit", async (e) => {

            e.preventDefault();

            const submitBtn = form.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";
            submitBtn.classList.add("opacity-50", "cursor-not-allowed");

            const isSpecificProperty = !!propertyIdInput.value;

            // Query selects fresh inside handler (they live in a different scope)
            const _projectSelect = document.querySelector("#popupProjectSelect");
            const _citySelect = document.querySelector("#popupCitySelect");
            const _budgetSelect = document.querySelector("#popupBudgetSelect");

            const chosenProject = isSpecificProperty
                ? projectInput.value
                : (_projectSelect?.value || "General Enquiry");

            const chosenCity = isSpecificProperty
                ? cityInput.value
                : (_citySelect?.value || "All Cities");

            const chosenBudget = isSpecificProperty
                ? budgetInput.value
                : (_budgetSelect?.value || "Flexible");

            const leadData = {

                name: form.querySelector("#popupName").value.trim(),

                email: form.querySelector("#popupEmail").value.trim(),

                phone: form.querySelector("#popupPhone").value.trim(),

                propertyId: propertyIdInput?.value || "",

                price: propertyPriceInput?.value || "",

                project: chosenProject,

                city: chosenCity,

                budget: chosenBudget,

                source: "Popup Form"

            };

            try {

                const result = await submitLead(leadData);

                if (!result.success) {

                    alert(result.message);

                    return;

                }

                // Hide header and form
                const header = popupContent.querySelector(".relative.bg-yellow-500");

                form.classList.add("hidden");

                if (header) {
                    header.classList.add("hidden");
                }

                const successContainer = document.createElement("div");

                successContainer.className =
                    "p-10 flex flex-col items-center text-center justify-center space-y-6 animate-fade-in";

                successContainer.innerHTML = `

                <div class="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-500 shadow-lg shadow-emerald-500/20">

                    <svg class="w-10 h-10 text-emerald-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">

                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>

                    </svg>

                </div>

                <h3 class="text-3xl font-bold text-slate-900">

                    Request Submitted!

                </h3>

                <p class="text-slate-600 leading-relaxed max-w-sm">

                    Thank you,

                    <span class="font-semibold text-slate-800">

                        ${leadData.name}

                    </span>.

                    <br><br>

                    Our property experts are reviewing your request for

                    <span class="font-semibold text-slate-800">

                        ${chosenProject}

                    </span>

                    and will contact you shortly on

                    <span class="font-semibold text-slate-800">

                        ${leadData.phone}

                    </span>.

                </p>

                <div class="w-12 h-1 bg-yellow-500 rounded-full"></div>

            `;

                popupContent.appendChild(successContainer);

                setTimeout(() => {

                    closeEnquiryPopup();

                    setTimeout(() => {

                        successContainer.remove();

                        form.reset();

                        form.classList.remove("hidden");

                        if (header) {
                            header.classList.remove("hidden");
                        }

                    }, 400);

                }, 3500);

            }

            catch (error) {

                console.error("Popup Form Error:", error);

                alert("Something went wrong. Please try again.");

            }

            finally {

                submitBtn.disabled = false;

                submitBtn.textContent = originalBtnText;

                submitBtn.classList.remove("opacity-50", "cursor-not-allowed");

            }

        });

    }
}

export function openEnquiryPopup(property) {
    const projectSelect = document.querySelector("#popupProjectSelect");
    const citySelect = document.querySelector("#popupCitySelect");
    const budgetSelect = document.querySelector("#popupBudgetSelect");

    if (property) {
        propertyIdInput.value = property.id || "";
        propertyPriceInput.value = property.price || "";
        projectInput.value = property.title || "";
        cityInput.value = property.city || "";
        budgetInput.value = property.priceLabel || "";

        // Show read-only inputs, hide selects
        projectInput.classList.remove("hidden");
        if (projectSelect) projectSelect.classList.add("hidden");

        cityInput.classList.remove("hidden");
        if (citySelect) citySelect.classList.add("hidden");

        budgetInput.classList.remove("hidden");
        if (budgetSelect) budgetSelect.classList.add("hidden");
    } else {
        propertyIdInput.value = "";
        propertyPriceInput.value = "";

        // Hide read-only inputs, show selects
        projectInput.classList.add("hidden");
        if (projectSelect) {
            projectSelect.classList.remove("hidden");
            projectSelect.value = "";
        }

        cityInput.classList.add("hidden");
        if (citySelect) {
            citySelect.classList.remove("hidden");
            citySelect.value = "";
        }

        budgetInput.classList.add("hidden");
        if (budgetSelect) {
            budgetSelect.classList.remove("hidden");
            budgetSelect.value = "";
        }
    }

    popup.classList.remove("hidden");
    popup.classList.add("flex");

    requestAnimationFrame(() => {
        popupContent.classList.remove("scale-95", "opacity-0");
        popupContent.classList.add("scale-100", "opacity-100");
    });
}

export function closeEnquiryPopup() {
    popupContent.classList.remove("scale-100", "opacity-100");
    popupContent.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
        popup.classList.remove("flex");
        popup.classList.add("hidden");
    }, 300);
}
