
export function companySlider({
    containerId,
    companies = []
}) {

    const container = document.getElementById(containerId);

    if (!container || !companies.length) return;

    const logos = [...companies, ...companies];

    container.innerHTML = `
        <section class=" md:pt-8 overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#FFFDF9] to-[#FFFDF9]">

            <div>

             

                <div class="relative overflow-hidden ">

                <!-- Ambient Lighting Glow -->  
                <div
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[200px] md:h-[200px] w-[300px] h-[300px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none">
                </div>

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
