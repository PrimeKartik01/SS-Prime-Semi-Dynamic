export function propertyCard(property) {

    return `

    <div class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl duration-300">

        <div class="swiper propertySwiper">

            <div class="swiper-wrapper">

                ${property.images.map(image => `

                    <div class="swiper-slide relative">

                        <div class="property-image-loader absolute inset-0 z-10 flex items-center justify-center bg-gray-100" aria-label="Loading property image">
                            <div class="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-yellow-500"></div>
                        </div>

                        <img
                            src="${image}"
                            class="w-full h-38 lg:h-62 object-cover opacity-0 transition-opacity duration-300"
                            onload="this.classList.remove('opacity-0'); this.parentElement.querySelector('.property-image-loader')?.remove()"
                            onerror="this.classList.remove('opacity-0'); this.parentElement.querySelector('.property-image-loader')?.remove()"
                        >

                    </div>

                `).join("")}

            </div>

            <div class="swiper-pagination"></div>
            <button
                class="enquireBtn absolute text-xs top-4 right-4 z-20 bg-yellow-500 hover:bg-yellow-600 text-white p-1 md:px-4 py-2 rounded-lg font-semibold duration-300 shadow-md shadow-black-500"
                data-id="${property.id}"
            >
                Enquire Now
            </button>

        </div>
        

        <div class="p-3 md:p-4">

            <p class="text-gray-500 mt-2 flex items-center gap-1 text-xs md:text-sm w-max rounded-lg my-2">

                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                ${property.city}

            </p>

            <div class="flex justify-between  gap-1 md:gap-3">
                    <div>
                        <h2 class="text-[14px] md:text-2xl font-bold">

                            ${property.title}

                        </h2>

                    </div>

                    <div>
                        <p class="w-max border rounded-md py-0.5 border-orange-200 px-3 text-xs text-yellow-600 font-semibold uppercase">

                            ${property.category}

                        </p>
                    </div>

            </div>

            <div class="flex justify-between gap-4 mt-3 md:mt-6">

                <div>

                    <p class="text-xs text-gray-400">

                        Builder

                    </p>

                    <p class="font-semibold text-sm md:text-md">

                        ${property.builder}

                    </p>

                </div>

                <div>

                    <p class="text-xs text-gray-400">

                        Type

                    </p>

                    <h4 class="font-semibold text-sm md:text-md">

                        ${property.type}

                    </h4>

                </div>

            </div>

            

            <div class="flex justify-between items-end mt-3">

                <div>

                    <p class="text-gray-400 text-sm">

                        Starting From

                    </p>

                    <h2 class="text-md md:text-xl font-bold text-yellow-600">

                        ${property.priceLabel}

                    </h2>

                </div>

               <div class="flex items-center gap-2">
                    <a href="./calculator.html?price=${(property.price && property.price > 0) ? property.price * 100000 : 5000000}" title="Calculate EMI" class="bg-amber-100 hover:bg-amber-200 text-amber-800 p-2 md:px-3 md:py-3 rounded-lg font-medium inline-flex items-center gap-1 transition-colors text-xs" aria-label="Calculate EMI">
                        <i class="fa-solid fa-calculator"></i>
                        <span class="hidden sm:inline">EMI</span>
                    </a>
                    <a href="./property-details.html?id=${property.id}" class="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 md:px-5 md:py-3 rounded-lg text-white font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span class="text-xs md:text-md">View</span>
                    </a>
               </div>

            </div>

        </div>

    </div>

    `;

}

export function propertySkeletonCard() {

    return `

    <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">

        <!-- Image Skeleton -->
        <div class="w-full h-48 lg:h-72 bg-gray-200 relative">
            <div class="absolute top-4 right-4 w-28 h-9 bg-gray-300 rounded-lg"></div>
        </div>
        
        <div class="p-4">

            <div class="flex justify-between md:flex-col-reverse md:gap-3">

                <div>

                    <!-- Title Skeleton -->
                    <div class="h-6 bg-gray-200 rounded-md w-3/4 mb-2"></div>

                    <!-- City Skeleton -->
                    <div class="h-4 bg-gray-200 rounded-md w-1/2"></div>

                </div>

                <div>

                    <!-- Category Badge Skeleton -->
                    <div class="h-5 bg-gray-200 rounded-md w-24"></div>

                </div>

            </div>

            <!-- Specs Skeleton -->
            <div class="flex justify-between gap-4 mt-6">

                <div class="space-y-2 w-1/3">

                    <div class="h-3 bg-gray-200 rounded w-12"></div>

                    <div class="h-4 bg-gray-200 rounded w-20"></div>

                </div>

                <div class="space-y-2 w-1/3">

                    <div class="h-3 bg-gray-200 rounded w-12"></div>

                    <div class="h-4 bg-gray-200 rounded w-20"></div>

                </div>

            </div>

            <!-- Price & Button Skeleton -->
            <div class="flex justify-between items-end mt-4 pt-2 border-t border-gray-100">

                <div class="space-y-2">

                    <div class="h-3 bg-gray-200 rounded w-20"></div>

                    <div class="h-6 bg-gray-200 rounded w-28"></div>

                </div>

                <div class="flex gap-2">

                    <div class="w-10 h-10 bg-gray-200 rounded-lg"></div>

                    <div class="w-24 h-10 bg-gray-200 rounded-lg"></div>

                </div>

            </div>

        </div>

    </div>

    `;

}
