export function initFooter(containerId = "footer") {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `

<footer class="bg-slate-950 text-slate-300 ">

    <div class="mx-auto px-10 py-16">

        <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

            <div>

                <a href="index.html" class="flex justify-center items-center">
                    <img src="img/logo.webp" alt="SS Prime Infra Logo" class="h-25 object-cover drop-shadow-lg">
                </a>

                <p class="mt-6 text-slate-400 leading-7">
                    Helping you find premium residential properties across Pune. Discover luxury apartments, investment opportunities and dream homes from India's leading developers.
                </p>

                <div class="flex gap-4 mt-8">

                    <a href="#" class="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 transition">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>

                    <a href="#" class="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 transition">
                        <i class="fa-brands fa-instagram"></i>
                    </a>

                    <a href="#" class="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 transition">
                        <i class="fa-brands fa-linkedin-in"></i>
                    </a>

                    <a href="#" class="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 transition">
                        <i class="fa-brands fa-youtube"></i>
                    </a>

                </div>

            </div>

            <div>

                <h3 class="text-xl font-semibold text-white mb-6">
                    Quick Links
                </h3>

                <ul class="space-y-4">

                    <li><a href="index.html" class="hover:text-amber-500 transition">Home</a></li>

                    <li><a href="projects.html" class="hover:text-amber-500 transition">Projects</a></li>

                    <li><a href="about.html" class="hover:text-amber-500 transition">About Us</a></li>

                    <li><a href="calculator.html" class="hover:text-amber-500 transition">EMI Calculator</a></li>

                    <li><a href="careers.html" class="hover:text-amber-500 transition">Careers</a></li>

                    <li><a href="contact.html" class="hover:text-amber-500 transition">Contact</a></li>

                </ul>

            </div>

            <div>

                <h3 class="text-xl font-semibold text-white mb-6">
                    Featured Projects
                </h3>

                <ul class="space-y-4">

                    <li><a href="#" class="hover:text-amber-500 transition">SPJ</a></li>

                    <li><a href="#" class="hover:text-amber-500 transition">Hero Homes</a></li>

                    <li><a href="#" class="hover:text-amber-500 transition">AIPL</a></li>

                    <li><a href="#" class="hover:text-amber-500 transition">Smart World</a></li>

                    <li><a href="#" class="hover:text-amber-500 transition">Pride World City</a></li>

                </ul>

            </div>

            <div>

                <h3 class="text-xl font-semibold text-white mb-6">
                    Contact
                </h3>

                <div class="space-y-5">

                    <div class="flex gap-3">
                        <i class="fa-solid fa-location-dot text-amber-500 mt-1 shrink-0"></i>
                        <div>
                            <span class="block text-xs text-amber-400 uppercase tracking-widest font-semibold mb-0.5">NCR Office</span>
                            <a href="https://www.google.com/maps/dir//SS+Prime+Infra+Pvt+Ltd,+Ground+floor,+Block-D,+Pioneer+Urban+Square,+Office+no+:-006,+Sector+62,+Gurugram,+Ghata,+Haryana+122098/@28.4199057,77.0931277,14z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x390d23b6f6e61b6f:0x4fc30b68f5127c0!2m2!1d77.0896093!2d28.4150296?entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" class="hover:text-amber-500 transition">
                                SS Prime Infra Pvt Ltd, Ground Floor, Block-D, Pioneer Urban Square, Office No. 006, Sector 62, Gurugram, Haryana 122098
                            </a>
                        </div>
                    </div>

                    <div class="flex gap-3">
                        <i class="fa-solid fa-location-dot text-amber-500 mt-1 shrink-0"></i>
                        <div>
                            <span class="block text-xs text-amber-400 uppercase tracking-widest font-semibold mb-0.5">Maharashtra Office</span>
                            <a href="https://www.google.com/maps?sca_esv=cf5c3a640caff83a&sxsrf=APpeQnunwSMbo_g7QTwFe_fvSVwdW4LGgQ:1787137880010&uact=5&gs_lp=Egxnd3Mtd2l6LXNlcnAiEXNzcHJpbWVpbmZyYSBwdW5lMgYQABgWGB5I4BNQrwZYixJwAXgAkAEAmAGTAaABrQaqAQMwLja4AQPIAQD4AQGYAgagAtQFwgIHECMYsAMYJ8ICChAAGEcY1gQYsAPCAhcQLhjcBhi4BhjaBhjYAhjIAxiwA9gBAcICBBAjGCfCAgcQABiABBgNwgINEC4YgAQYDRjHARivAcICBhAAGB4YDcICBxAjGLACGCfCAgsQABiABBiKBRiGA5gDAOIDBRIBMSBAiAYBkAYGugYECAEYGZIHAzEuNaAH0iayBwMwLjW4B84FwgcFMS4yLjPIBxKACAE&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KV_Hcn0Xv8I7McnmUa5qS3Np&daddr=Office+No.+410,+ICON+Towers,+Survey+Number+83/1,+near+Kasturi+Chowk,+Wakad,+Maharashtra+411057" target="_blank" rel="noopener noreferrer" class="hover:text-amber-500 transition">
                                Office No. 410, ICON Towers, Survey Number 83/1, Near Kasturi Chowk, Wakad, Pune, Maharashtra 411057
                            </a>
                        </div>
                    </div>

                    <div class="flex gap-3">

                        <i class="fa-solid fa-phone text-amber-500 mt-1"></i>

                        <a href="tel:+919898981498" class="hover:text-amber-500">
                            +91-9898981498
                        </a>

                    </div>

                    <div class="flex gap-3">

                        <i class="fa-solid fa-envelope text-amber-500 mt-1"></i>

                        <a href="mailto:info@ssprimeinfra.com" class="hover:text-amber-500">
                            info@ssprimeinfra.com
                        </a>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <div class="border-t border-slate-800">

        <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

            <p class="text-sm text-slate-500">
                © 2026 SS Prime Infra. All Rights Reserved.
            </p>

            <div class="flex gap-6 text-sm">

                <a href="privacy-policy.html" class="hover:text-amber-500 transition">
                    Privacy Policy
                </a>
            </div>

        </div>

    </div>

</footer>

`;

}