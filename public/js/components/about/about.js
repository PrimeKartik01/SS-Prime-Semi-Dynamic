import { initNavbar } from "../navbar/navbar.js";
import { navbarData } from "../../data/navbarData.js";
import { companySlider } from "../companySlider/companySlider.js";
import { companiesLogoData } from "../../data/companiesLogoData.js";
import { initContactForm } from "../contactForm/contactForm.js";
import { initFooter } from "../footer/footer.js";
import { initEnquiryPopup } from "../enquiryPopup/enquiryPopup.js";

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Navbar
    initNavbar({
        containerId: "navbar",
        data: navbarData,
    });

    // Initialize Company Logos Slider
    companySlider({
        containerId: "company-slider",
        companies: companiesLogoData,
    });

    // Initialize Contact Form
    initContactForm("contact-form");

    // Initialize Footer
    initFooter("footer");

    // Initialize Lead Modal Popup
    initEnquiryPopup();
});
