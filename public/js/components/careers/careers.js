import { initNavbar } from "../navbar/navbar.js";
import { navbarData } from "../../data/navbarData.js";
import { initFooter } from "../footer/footer.js";
import { jobs } from "../../data/jobs.js";
import { renderJobs, initJobFilters, initJobInteractions } from "../jobList/jobList.js";
import { initApplyPopup, openApplyPopup } from "../applyPopup/applyPopup.js";
import { initEnquiryPopup } from "../enquiryPopup/enquiryPopup.js";

document.addEventListener("DOMContentLoaded", () => {
    initNavbar({ containerId: "navbar", data: navbarData });
    initFooter("footer");
    initApplyPopup();
    initEnquiryPopup();

    renderJobs(jobs);
    initJobFilters(jobs);
    initJobInteractions(openApplyPopup);
});
