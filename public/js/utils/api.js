export async function submitJobApplication(applicationData) {
    try {
        console.log("submitJobApplication: Sending request with data:", applicationData);

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

        if (!response.ok) {
            return { success: false, message: result.message || `Server returned status code ${response.status}` };
        }

        console.log("submitJobApplication: API responded successfully:", result);
        return { success: true, data: result };
    } catch (error) {
        console.error("submitJobApplication: Submission failed:", error);
        return { success: false, message: "Something went wrong. Please try again." };
    }
}

export async function submitLead(leadData) {
    try {
        console.log("submitLead: Sending request to API with data:", leadData);
        
        const response = await fetch("/api/enquiries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(leadData)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            return { success: false, message: result.message || `Server returned status code ${response.status}` };
        }
        
        console.log("submitLead: API responded successfully:", result);
        return { success: true, data: result };
    } catch (error) {
        console.error("submitLead: Submission failed:", error);
        return { success: false, message: "Something went wrong. Please try again." };
    }
}
