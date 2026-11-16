const LEADRAT_URL = "https://connect.leadrat.com/api/v1/integration/Website";

const cityIntegrations = {
    gurgaon: {
        state: "Haryana",
        apiKeyEnv: "LEADRAT_GURGAON_API_KEY"
    },
    gurugram: {
        state: "Haryana",
        apiKeyEnv: "LEADRAT_GURGAON_API_KEY"
    },
    pune: {
        state: "Maharashtra",
        apiKeyEnv: "LEADRAT_PUNE_API_KEY"
    }
};

function getSubmittedDateTime(date = new Date()) {
    const submittedDate = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    }).format(date).replace(/\//g, "-");

    const submittedTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    }).format(date);

    return { submittedDate, submittedTime };
}

function buildLeadPayload(lead, state) {
    const { submittedDate, submittedTime } = getSubmittedDateTime();
    const notes = [
        `Source: ${lead.source}`,
        lead.propertyId && `Property ID: ${lead.propertyId}`,
        lead.price && `Price: ${lead.price}`
    ].filter(Boolean).join("; ");

    return {
        name: lead.name,
        state,
        city: lead.city,
        location: "",
        budget: lead.budget,
        notes,
        email: lead.email,
        countryCode: "91",
        mobile: lead.phone,
        project: lead.project,
        property: "",
        leadExpectedBudget: "",
        propertyType: "",
        submittedDate,
        submittedTime,
        LeadId: "",
        subsource: "",
        leadStatus: "Schedule Site Visit or Schedule Meeting",
        callRecordingUrl: "",
        scheduledDate: "",
        additionalProperties: {}
    };
}

function getSafeErrorDetail(responseBody, lead) {
    let responseData;

    try {
        responseData = JSON.parse(responseBody);
    } catch {
        responseData = responseBody;
    }

    let detail = "";
    if (typeof responseData === "string") {
        detail = responseData;
    } else if (responseData && typeof responseData === "object") {
        const validationErrors = Array.isArray(responseData.errors)
            ? responseData.errors
            : responseData.errors && typeof responseData.errors === "object"
                ? Object.values(responseData.errors).flatMap((errors) =>
                    Array.isArray(errors) ? errors : [errors]
                )
                : [];
        const errors = validationErrors.map((error) =>
            typeof error === "string" ? error : error?.message
        );
        detail = [
            responseData.message,
            responseData.error,
            responseData.detail,
            ...errors
        ].filter((message) => typeof message === "string").join("; ");

        if (!detail) detail = JSON.stringify(responseData);
    }

    const sensitiveValues = [
        lead.name,
        lead.email,
        lead.phone,
        lead.phone && `91${lead.phone}`,
        lead.phone && `+91${lead.phone}`,
        lead.project,
        lead.city,
        lead.budget,
        lead.propertyId,
        lead.price
    ].filter(Boolean);

    return sensitiveValues
        .reduce((safeDetail, value) => safeDetail.split(String(value)).join("[redacted]"), detail)
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 800);
}

export async function forwardLeadToLeadrat(lead) {
    const cityKey = String(lead.city || "").trim().toLowerCase();
    const integration = cityIntegrations[cityKey];

    if (!integration) return false;

    const apiKey = process.env[integration.apiKeyEnv];
    if (!apiKey) {
        throw new Error(`${integration.apiKeyEnv} is not configured`);
    }

    const response = await fetch(LEADRAT_URL, {
        method: "POST",
        headers: {
            "API-Key": apiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify([buildLeadPayload(lead, integration.state)]),
        signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
        const responseBody = await response.text();
        const detail = getSafeErrorDetail(responseBody, lead);
        const statusText = response.statusText ? ` ${response.statusText}` : "";
        throw new Error(
            `LeadRAT API returned HTTP ${response.status}${statusText}${detail ? `: ${detail}` : ""}`
        );
    }

    return true;
}
