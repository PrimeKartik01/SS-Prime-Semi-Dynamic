export function initFooter(containerId = "footer") {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `

<footer class="bg-slate-950 text-slate-300 ">

    <div class="max-w-7xl mx-auto px-6 py-16">

        <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

            <div>

                <h2 class="text-3xl font-bold text-white">
                    SS Prime <span class="text-amber-500">Infra</span>
                </h2>

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

                    <li><a href="careers.html" class="hover:text-amber-500 transition">Careers</a></li>

                    <li><a href="contact.html" class="hover:text-amber-500 transition">Contact</a></li>

                </ul>

            </div>

            <div>

                <h3 class="text-xl font-semibold text-white mb-6">
                    Featured Projects
                </h3>

                <ul class="space-y-4">

                    <li><a href="#" class="hover:text-amber-500 transition">Godrej Ivara</a></li>

                    <li><a href="#" class="hover:text-amber-500 transition">VTP Cielo</a></li>

                    <li><a href="#" class="hover:text-amber-500 transition">Lodha Massimo</a></li>

                    <li><a href="#" class="hover:text-amber-500 transition">Pride World City</a></li>

                    <li><a href="#" class="hover:text-amber-500 transition">Ganga Legend County</a></li>

                </ul>

            </div>

            <div>

                <h3 class="text-xl font-semibold text-white mb-6">
                    Contact
                </h3>

                <div class="space-y-5">

                    <div class="flex gap-3">

                        <i class="fa-solid fa-location-dot text-amber-500 mt-1"></i>

                        <span>Pune, Maharashtra</span>

                    </div>

                    <div class="flex gap-3">

                        <i class="fa-solid fa-phone text-amber-500 mt-1"></i>

                        <a href="tel:+919999999999" class="hover:text-amber-500">
                            +91 99999 99999
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

                <a href="#" class="hover:text-amber-500 transition">
                    Privacy Policy
                </a>

                <a href="#" class="hover:text-amber-500 transition">
                    Terms & Conditions
                </a>

            </div>

        </div>

    </div>

</footer>

`;

}