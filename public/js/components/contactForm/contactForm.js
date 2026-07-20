import { properties } from "../../data/properties.js";
import { submitLead } from "../../utils/api.js";

export function initContactForm(containerId = "contact-form") {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `

<section class="py-15 bg-slate-50">

    <div class="max-w-[1700px] mx-auto px-6 lg:px-10">

        <div class="grid lg:grid-cols-2 gap-20 items-center">

            <div>

                <span class="inline-block text-amber-500 uppercase tracking-[5px] font-semibold">

                    Contact Our Experts

                </span>

                <h2 class="mt-6 text-5xl font-bold text-slate-900 leading-tight">

                    Looking For Your

                    <span class="text-amber-500">

                        Dream Property?

                    </span>

                </h2>

                <p class="mt-8 text-lg leading-8 text-slate-600">

                    Whether you're buying your first home, upgrading to a luxury residence,
                    or searching for the perfect investment, our dedicated property consultants
                    are here to guide you through every step.

                </p>

                <div class="space-y-8 mt-12">

                    <div class="flex gap-5">

                        <div class="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">

                            <i class="fa-solid fa-building text-amber-500 text-2xl"></i>

                        </div>

                        <div>

                            <h3 class="text-xl font-bold">

                                500+ Premium Projects

                            </h3>

                            <p class="mt-2 text-slate-500">

                                Access verified residential and commercial projects across Gurgaon and Pune.

                            </p>

                        </div>

                    </div>

                    <div class="flex gap-5">

                        <div class="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">

                            <i class="fa-solid fa-wallet text-amber-500 text-2xl"></i>

                        </div>

                        <div>

                            <h3 class="text-xl font-bold">

                                Best Price Guarantee

                            </h3>

                            <p class="mt-2 text-slate-500">

                                Get exclusive launch prices, offers and flexible payment plans.

                            </p>

                        </div>

                    </div>

                    <div class="flex gap-5">

                        <div class="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">

                            <i class="fa-solid fa-headset text-amber-500 text-2xl"></i>

                        </div>

                        <div>

                            <h3 class="text-xl font-bold">

                                Dedicated Relationship Manager

                            </h3>

                            <p class="mt-2 text-slate-500">

                                From site visit to possession, we'll be with you throughout the journey.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

            <div class="bg-white rounded-[40px] shadow-2xl border border-slate-200 p-10 lg:p-14">

                <h3 class="text-3xl font-bold text-slate-900">

                    Schedule a Free Consultation

                </h3>

                <p class="mt-4 text-slate-500">

                    Fill in your details and our property expert will contact you shortly.

                </p>

                <form class="mt-10 space-y-6">

                    <input
                        type="text"
                        id="contactName"
                        placeholder="Full Name"
                        class="w-full h-14 rounded-xl border border-slate-300 px-5 outline-none focus:border-amber-500"
                        required>

                    <input
                        type="email"
                        id="contactEmail"
                        placeholder="Email Address"
                        class="w-full h-14 rounded-xl border border-slate-300 px-5 outline-none focus:border-amber-500"
                        required>

                    <input
                        type="tel"
                        id="contactPhone"
                        placeholder="Mobile Number"
                        class="w-full h-14 rounded-xl border border-slate-300 px-5 outline-none focus:border-amber-500"
                        required>

                    <select
                        id="contactProjectSelect"
                        class="w-full h-14 rounded-xl border border-slate-300 px-5 outline-none focus:border-amber-500 bg-white"
                        required>
                        <option value="">Select Project</option>
                    </select>

                    <select
                        id="contactCitySelect"
                        class="w-full h-14 rounded-xl border border-slate-300 px-5 outline-none focus:border-amber-500 bg-white"
                        required>
                        <option value="">Select City</option>
                    </select>

                    <select
                        id="contactBudgetSelect"
                        class="w-full h-14 rounded-xl border border-slate-300 px-5 outline-none focus:border-amber-500 bg-white"
                        required>
                        <option value="">Select Budget</option>
                        <option value="Flexible">Flexible</option>
                        <option value="Under ₹50 Lakhs">Under ₹50 Lakhs</option>
                        <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                        <option value="₹1 Crore - ₹2 Crore">₹1 Crore - ₹2 Crore</option>
                        <option value="₹2 Crore - ₹3 Crore">₹2 Crore - ₹3 Crore</option>
                        <option value="₹3 Crore - ₹5 Crore">₹3 Crore - ₹5 Crore</option>
                        <option value="₹5 Crore+">₹5 Crore+</option>
                    </select>

                    <button
                        class="w-full h-14 rounded-xl bg-amber-500 hover:bg-amber-400 transition duration-300 font-semibold text-slate-950 cursor-pointer">

                        Schedule Site Visit

                    </button>

                </form>

            </div>

        </div>

    </div>

</section>

`;

    // Populate dropdowns dynamically
    const projectSelect = container.querySelector("#contactProjectSelect");
    const citySelect = container.querySelector("#contactCitySelect");

    const propertiesData = Array.isArray(properties) ? properties : [];

    if (projectSelect) {
        projectSelect.innerHTML = '<option value="">Select Project</option>';
        const uniqueProjects = [...new Set(propertiesData.map(p => p.title).filter(Boolean))].sort();
        uniqueProjects.forEach(project => {
            const option = document.createElement("option");
            option.value = project;
            option.textContent = project;
            projectSelect.appendChild(option);
        });
    }

    if (citySelect) {
        citySelect.innerHTML = '<option value="">Select City</option>';
        const uniqueCities = [...new Set(propertiesData.map(p => p.city).filter(Boolean))].sort();
        uniqueCities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }

    // Submit handler
    // Submit handler
    const form = container.querySelector("form");

    if (form) {

        form.addEventListener("submit", async (e) => {

            e.preventDefault();

            const submitBtn = form.querySelector("button");
            const originalBtnText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";
            submitBtn.classList.add("opacity-50", "cursor-not-allowed");

            const leadData = {

                name: container.querySelector("#contactName").value.trim(),

                email: container.querySelector("#contactEmail").value.trim(),

                phone: container.querySelector("#contactPhone").value.trim(),

                project: container.querySelector("#contactProjectSelect").value || "General Enquiry",

                city: container.querySelector("#contactCitySelect").value || "All Cities",

                budget: container.querySelector("#contactBudgetSelect").value || "Flexible",

                source: "Contact Form"

            };

            try {

                const result = await submitLead(leadData);

                if (!result.success) {

                    alert(result.message);

                    return;

                }

                const formWrapper = form.parentElement;

                if (formWrapper) {

                    formWrapper.innerHTML = `

                    <div class="flex flex-col items-center text-center justify-center py-10 space-y-6 animate-fade-in">

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

                            </span>

                            <br><br>

                            Our property experts are reviewing your enquiry for

                            <span class="font-semibold text-slate-800">

                                ${leadData.project}

                            </span>

                            and will contact you shortly on

                            <span class="font-semibold text-slate-800">

                                ${leadData.phone}

                            </span>.

                        </p>

                        <div class="w-12 h-1 bg-amber-500 rounded-full"></div>

                    </div>

                `;

                }

            }

            catch (error) {

                console.error(error);

                alert("Something went wrong. Please try again.");

            }

            finally {

                if (submitBtn && document.body.contains(submitBtn)) {

                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                    submitBtn.classList.remove("opacity-50", "cursor-not-allowed");

                }

            }

        });

    }

}