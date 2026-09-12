
export function companySlider({
    containerId,
    companies = []
}) {

    const container = document.getElementById(containerId);

    if (!container || !companies.length) return;

    const logos = [...companies, ...companies];

    container.innerHTML = `
        <section class="py-4 md:py-8 bg-gray-50 overflow-hidden">

            <div>

                <div class="text-center  text-sm  md:text-2xl mb-4">

                    <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-semibold tracking-wide">
                        <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
                        Trusted Partners
                    </span>

                </div>

                <div class="relative overflow-hidden">

                    <div class="company-slider-track flex items-center gap-6 w-max">

                        ${logos.map(company => `
                            <div class="group flex-shrink-0 w-48 h-48 flex items-center justify-center rounded-2xl hover:-translate-y-1 transition-all duration-300">

                                <div class="w-full h-full flex items-center justify-center p-6">

                                    <img
                                        src="${company.logo}"
                                        alt="${company.name}"
                                        loading="lazy"
                                        class="max-w-full max-h-full object-contain  group-hover:opacity-100 transition-all duration-300"
                                    >

                                </div>

                            </div>
                        `).join("")}

                    </div>

                </div>

            </div>

        </section>
    `;
}
