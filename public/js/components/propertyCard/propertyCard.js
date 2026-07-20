export function propertyCard(property) {

    return `

    <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl duration-300">

        <div class="swiper propertySwiper">

            <div class="swiper-wrapper">

                ${property.images.map(image => `

                    <div class="swiper-slide">

                        <img
                            src="${image}"
                            class="w-full h-72 object-cover"
                        >

                    </div>

                `).join("")}

            </div>

            <div class="swiper-pagination"></div>
            <button
                class="enquireBtn absolute top-4 right-4 z-20 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-semibold duration-300 shadow-md shadow-black-500"
                data-id="${property.id}"
            >
                Enquire Now
            </button>

        </div>
        

        <div class="p-4">

            <div class="flex justify-between">

                <div>

                    <p class="text-xs text-yellow-600 font-semibold uppercase">

                        ${property.category}

                    </p>

                    <h2 class="text-2xl font-bold mt-2">

                        ${property.title}

                    </h2>

                    <p class="text-gray-500 mt-2">

                        📍${property.city}

                    </p>

                </div>

            </div>

            <div class="flex justify-between gap-4 mt-6">

                <div>

                    <p class="text-xs text-gray-400">

                        Builder

                    </p>

                    <p class="font-semibold text-XS">

                        ${property.builder}

                    </p>

                </div>

                <div>

                    <p class="text-xs text-gray-400">

                        Type

                    </p>

                    <h4 class="font-semibold">

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

               <a href="./property-details.html?id=${property.id}" class="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 md:px-5 md:py-3 rounded-lg text-white font-semibold inline-flex items-center justify-center gap-2  transition-colors shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span class="text-xs md:text-md">View</span>
                </a>

            </div>

        </div>

    </div>

    `;

}