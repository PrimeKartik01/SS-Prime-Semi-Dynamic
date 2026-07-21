// ─── Lead Enquiry API ─────────────────────────────────────────────────────────
// Used by: enquiryPopup, contactForm
// Sends to: /api/enquiries  →  primeleads@ssprimeinfra.in

export const submitLead = async (leadData) => {

    try {

        const response = await fetch("/api/enquiries", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(leadData)

        });

        const result = await response.json();

        return {
            success: response.ok,
            status: response.status,
            ...result
        };

    } catch (error) {

        console.error("Lead API Error:", error);

        return {
            success: false,
            status: 500,
            message: "Unable to connect to the server."
        };

    }

};

// ─── Job Application API ──────────────────────────────────────────────────────
// Used by: applyPopup (careers page only)
// Sends to: /api/applications  →  hrinfo@ssprimeinfra.in

export const submitJobApplication = async (applicationData) => {

    try {

        const isFormData = applicationData instanceof FormData;

        const options = {
            method: "POST",
            body: isFormData ? applicationData : JSON.stringify(applicationData)
        };

        if (!isFormData) {
            options.headers = {
                "Content-Type": "application/json"
            };
        }

        const response = await fetch("/api/applications", options);

        const result = await response.json();

        return {
            success: response.ok,
            status: response.status,
            ...result
        };

    } catch (error) {

        console.error("HR Application API Error:", error);

        return {
            success: false,
            status: 500,
            message: "Unable to connect to the server."
        };

    }

};
