export function companySlider({
    containerId,
    companies = []
}) {

    const container = document.getElementById(containerId);

    if (!container) return;

    const logos = [...companies, ...companies];

    container.innerHTML = `
        <section class="py-16 bg-white overflow-hidden">
            <div class="max-w-7xl mx-auto px-6">

                <div class="text-center mb-10">
                    <span class="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
                        Trusted Partners
                    </span>

                    <h2 class="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
                        Brands We Work With
                    </h2>

                    <p class="mt-3 text-gray-600 max-w-2xl mx-auto">
                        Partnering with industry-leading companies to deliver exceptional experiences.
                    </p>
                </div>

                <div class="relative overflow-hidden">

                    <div class="absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-white to-transparent z-10"></div>

                    <div class="absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-white to-transparent z-10"></div>

                    <div class="company-slider-track flex items-center gap-12 w-max">

                        ${logos.map(company => `
                            <div class="flex-shrink-0 flex items-center justify-center w-44 h-24 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <img
                                    src="${company.logo}"
                                    alt="${company.name}"
                                    class="h-20 object-contain  duration-300"
                                >
                            </div>
                        `).join("")}

                    </div>

                </div>

            </div>
        </section>
    `;
}