const API_URL = "/api/enquiries";

export const submitLead = async (leadData) => {

    try {

        const response = await fetch(API_URL, {

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

        console.error("API Error:", error);

        return {
            success: false,
            status: 500,
            message: "Unable to connect to the server."
        };

    }

};