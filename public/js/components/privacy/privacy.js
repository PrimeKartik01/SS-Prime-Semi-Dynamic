import { initNavbar } from "../navbar/navbar.js";
import { navbarData } from "../../data/navbarData.js";
import { initFooter } from "../footer/footer.js";
import { initEnquiryPopup } from "../enquiryPopup/enquiryPopup.js";

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Navbar
    initNavbar({
        containerId: "navbar",
        data: navbarData,
    });

    // Initialize Footer
    initFooter("footer");

    // Initialize Enquiry Lead Popup
    initEnquiryPopup();
});
