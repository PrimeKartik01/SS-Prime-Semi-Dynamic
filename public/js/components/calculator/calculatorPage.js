import { initNavbar } from "../navbar/navbar.js";
import { navbarData } from "../../data/navbarData.js";
import { initFooter } from "../footer/footer.js";
import { initEMICalculator, formatCurrency } from "../emiCalculator/emiCalculator.js";
import { initEnquiryPopup, openEnquiryPopup } from "../enquiryPopup/enquiryPopup.js";

function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Navbar & Footer
    initNavbar({
        containerId: "navbar",
        data: navbarData,
    });

    initFooter("footer");
    initEnquiryPopup();

    // 2. Determine initial property price from URL if present
    const priceParam = getQueryParam("price");
    let initialPrice = 5000000; // default 50 Lakhs

    if (priceParam) {
        const parsed = parseFloat(priceParam);
        if (Number.isFinite(parsed) && parsed > 0) {
            initialPrice = parsed;
        }
    }

    // 3. Initialize EMI Calculator
    initEMICalculator({
        container: "#emi-calculator",
        propertyPrice: initialPrice,
        defaultDownPayment: 20,
        defaultInterestRate: 8.5,
        defaultTenure: 20,
        onLoanAssistance: (snapshot) => {
            // Open lead enquiry popup prefilled with loan data
            openEnquiryPopup({
                id: "loan-assistance",
                title: "Home Loan Assistance",
                builder: "SS Prime Financial Advisory",
                priceLabel: `${formatCurrency(snapshot.emi)}/mo`,
                city: "Gurgaon / Pune",
                summary: `Loan Amount: ${formatCurrency(snapshot.loanAmount)} | Tenure: ${snapshot.tenure} Yrs | Rate: ${snapshot.interestRate}%`
            });
        },
    });
});
