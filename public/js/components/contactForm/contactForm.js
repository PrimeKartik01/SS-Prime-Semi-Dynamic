import { properties } from "../../data/properties.js";
import { submitLead } from "../../utils/api.js";

export function initContactForm(containerId = "contact-form") {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `

<section>

    <div class="max-w-[1700px] mx-auto">
    <div
        class="contact-form-background relative min-h-[650px] overflow-hidden bg-cover bg-center"
    >

        <!-- Form -->
        <div class="relative z-10 flex flex-col h-full p-5 md:p-10 lg:p-16 max-w-[1440px] mx-auto ">

                    <div class="lg:col-span-7 space-y-5">

                        <!-- Header Badge / Subtitle -->
                        <div class="space-y-1.5">
                            <div class="flex items-center gap-3">
                                <span class="w-8 h-[2px] bg-[#C59B27]"></span>
                                <span class="text-xs sm:text-sm font-bold tracking-[3px] uppercase text-[#C59B27]">Contact Our Experts</span>
                            </div>
                        </div>

                        <!-- Main Heading -->
                        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] leading-[1.18]">
                            Looking For<br class="hidden sm:inline" />
                            <span class="text-[#B68D37]">Dream Property</span>
                        </h2>

                        <!-- Main Paragraph -->
                        <p class="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
                            At <strong class="text-slate-900 font-semibold">SS Prime Infra</strong>, we believe buying a
                            property is more than just a transaction—it's a life-changing decision. Our mission is to
                            simplify the journey by offering trusted guidance, verified projects, and complete
                            transparency at every stage.
                        </p>

                        <!-- Expandable Read More Text -->
                        <div id="aboutMoreExpansion"
                            class="grid grid-rows-[0fr] opacity-0 overflow-hidden transition-all duration-500 ease-in-out">
                            <div class="min-h-0 overflow-hidden">
                                <p class="pt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                                    From luxury residences and premium commercial spaces to high-return investment
                                    opportunities, our experienced advisors ensure every client finds the perfect
                                    property with complete confidence and peace of mind.
                                </p>
                            </div>
                        </div>

                    </div>


                     
                    <div class="">
                       
                        <div class="w-full max-w-xl backdrop-blur-sm p-6 shadow-2xl rounded-2xl">

                            <h2 class="text-2xl font-bold text-[#B68D37]">
                               Schedule Free Consultation
                            </h2>

                            <form class="mt-4 grid grid-cols-2 gap-2 ">

                                <input type="text" id="contactName" placeholder="Full Name"
                                    class="w-full h-10 rounded-xl placeholder:text-sm placeholder:text-[#111827] px-5 border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                                    required>

                                <input type="email" id="contactEmail" placeholder="Email Address"
                                    class="w-full h-10 rounded-xl placeholder:text-sm placeholder:text-[#111827] px-5 border border-gray-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                                    required>

                                <input type="tel" id="contactPhone" placeholder="Mobile Number"
                                    class="w-full h-10 rounded-xl placeholder:text-sm placeholder:text-[#111827] px-5 border border-gray-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                                    required>

                                <select id="contactProjectSelect"
                                    class="w-full h-10 rounded-xl text-sm px-5 border border-gray-200 outline-none focus:border-amber-500"
                                    required>
                                    <option value="">Select Project</option>
                                </select>

                                <select id="contactCitySelect"
                                    class="w-full h-10 rounded-xl text-sm px-5 border border-gray-200 outline-none focus:border-amber-500"
                                    required>
                                    <option value="">Select City</option>
                                </select>

                                <select id="contactBudgetSelect"
                                    class="w-full h-10 rounded-xl text-sm px-5 border border-gray-200 outline-none focus:border-amber-500"
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
                                    class="w-full h-10 rounded-3xl text-sm w-max px-4  bg-[#B68D37] hover:bg-yellow-400 hover:shadow-lg hover:shadow-gray-400 transition duration-300 font-medium cursor-pointer text-white">
                                    Schedule Now
                                </button>

                            </form>
                        </div>
                    </div>

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
    const form = container.querySelector("form");

    if (form) {
        if (form.dataset.listenerAttached === "true") return;
        form.dataset.listenerAttached = "true";

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