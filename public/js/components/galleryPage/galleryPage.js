import { initNavbar } from "../navbar/navbar.js";
import { navbarData } from "../../data/navbarData.js";
import { galleryItems } from "../../data/aboutData.js";
import { initFooter } from "../footer/footer.js";
import { initEnquiryPopup } from "../enquiryPopup/enquiryPopup.js";
import { renderGalleryComponent } from "../gallery/gallery.js";

initNavbar({ containerId: "navbar", data: navbarData });
renderGalleryComponent("gallery-container", galleryItems);
initFooter("footer");
initEnquiryPopup();
