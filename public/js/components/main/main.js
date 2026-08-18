import { properties } from "../../data/properties.js";
import { renderProperties } from "../propertyList/propertyList.js";
import { initSearch } from "../search/search.js";

import { initNavbar } from "../navbar/navbar.js";
import { navbarData } from "../../data/navbarData.js";

import { initHeroCarousel } from "../heroCarousel/heroCarousel.js";
import { heroSlides } from "../../data/heroData.js";

import { companySlider } from "../companySlider/companySlider.js";
import { companiesLogoData } from "../../data/companiesLogoData.js";


import { initContactForm } from "../contactForm/contactForm.js";

import { initFooter } from "../footer/footer.js";
import { initTestimonials } from "../testimonials/testimonials.js";
import { testimonialsData } from "../../data/testimonialsData.js";

import {
    initEnquiryPopup,
    openEnquiryPopup
} from "../enquiryPopup/enquiryPopup.js";

initNavbar({
    containerId: "navbar",
    data: navbarData,
});

initHeroCarousel({
    containerId: "hero",
    slides: heroSlides
});

initSearch(properties);

renderProperties(properties);

companySlider({
    containerId: "company-slider",
    companies: companiesLogoData
});

initTestimonials({
    containerId: "testimonials",
    testimonials: testimonialsData
});

initContactForm("contact-form");

initFooter("footer");


initEnquiryPopup();

document.addEventListener("click", (e) => {

    const button = e.target.closest(".enquireBtn");

    if (!button) return;

    const property = properties.find(item => item.id == button.dataset.id);

    if (!property) return;

    openEnquiryPopup(property);

});