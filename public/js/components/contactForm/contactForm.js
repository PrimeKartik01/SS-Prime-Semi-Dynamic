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
                        placeholder="Full Name"
                        class="w-full h-14 rounded-xl border border-slate-300 px-5 outline-none focus:border-amber-500">

                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        class="w-full h-14 rounded-xl border border-slate-300 px-5 outline-none focus:border-amber-500">

                    <input
                        type="email"
                        placeholder="Email Address"
                        class="w-full h-14 rounded-xl border border-slate-300 px-5 outline-none focus:border-amber-500">

                    <select class="w-full h-14 rounded-xl border border-slate-300 px-5 outline-none focus:border-amber-500">

                        <option>Select City</option>

                        <option>Gurgaon</option>

                        <option>Pune</option>

                    </select>

                    <select class="w-full h-14 rounded-xl border border-slate-300 px-5 outline-none focus:border-amber-500">

                        <option>Select Budget</option>

                        <option>₹1 Cr - ₹2 Cr</option>

                        <option>₹2 Cr - ₹3 Cr</option>

                        <option>₹3 Cr - ₹5 Cr</option>

                        <option>₹5 Cr+</option>

                    </select>

                    <textarea
                        rows="5"
                        placeholder="Tell us about your requirement..."
                        class="w-full rounded-xl border border-slate-300 p-5 outline-none resize-none focus:border-amber-500"></textarea>

                    <button
                        class="w-full h-14 rounded-xl bg-amber-500 hover:bg-amber-400 transition duration-300 font-semibold text-slate-950">

                        Schedule Site Visit

                    </button>

                </form>

            </div>

        </div>

    </div>

</section>

`;

}