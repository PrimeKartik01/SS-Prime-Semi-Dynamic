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
                class="enquireBtn absolute top-4 right-4 z-20 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-semibold duration-300"
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

                        📍 ${property.location}, ${property.city}

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

            

            <div class="flex justify-between items-end mt-8">

                <div>

                    <p class="text-gray-400 text-sm">

                        Starting From

                    </p>

                    <h2 class="text-xl font-bold text-yellow-600">

                        ${property.priceLabel}

                    </h2>

                </div>

                <a
                    href="./property-details.html?id=${property.id}"
                    class="bg-yellow-500 hover:bg-yellow-600 p-3 rounded-xl text-white font-semibold inline-flex items-center"
                >
                    View Details
                </a>

            </div>

        </div>

    </div>

    `;

}