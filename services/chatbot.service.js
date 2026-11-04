
import { generateAIResponse } from "./ai.service.js";
import { searchProperties } from "./property.service.js";
import { getRelevantCompanyInfo } from "./company.service.js";

// Identify whether the user is asking about SS Prime Infra
const isCompanyQuestion = (message) => {
    const query = message.toLowerCase();

    const companyKeywords = [
        "ss prime",
        "your company",
        "about your",
        "about us",
        "company",
        "who are you",
        "founder",
        "co-founder",
        "director",
        "leadership",
        "management",
        "established",
        "vision",
        "mission",
        "office",
        "address",
        "contact",
        "email",
        "phone number",
        "customer support",
        "why choose",
        "why should i choose",
        "rera",
        "legally registered",
        "what services",
        "which services",
        "do you offer",
        "service locations",
        "which cities do you serve",
        "where do you operate",
        "company details",
    ];

    return companyKeywords.some((keyword) => query.includes(keyword));
};

// Extract property filters from user message
export const extractPropertyFilters = async (message) => {
    const prompt = `
You are a real estate search assistant for SS Prime Infra.

Extract property search filters from the user's message.

Return ONLY valid JSON:
{
    "city": "",
    "category": "",
    "purpose": "",
    "type": "",
    "bhk": null,
    "minBudget": null,
    "maxBudget": null,
    "keyword": ""
}

Rules:
- city: Gurugram or Pune, otherwise empty string.
- category: Residential or Commercial, otherwise empty string.
- purpose: buy or rent, otherwise empty string.
- bhk: numeric value, otherwise null.
- minBudget and maxBudget: budget in lakhs. 1 crore = 100 lakhs.
- type: property type if mentioned, otherwise empty string.
- keyword: preserve project name, builder, sector or location keyword.
- If user mentions M3M, keyword must be M3M.
- If user mentions SPJ Vedatam, keyword must be SPJ Vedatam.
- Never guess missing filters.
- Return only JSON, no explanation.

User message:
${JSON.stringify(message)}
`;

    const response = await generateAIResponse(prompt);

    try {
        const cleanResponse = response
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleanResponse);
    } catch (error) {
        console.error("Filter extraction error:", response);
        throw new Error("Unable to understand property search request.");
    }
};

// Check whether user has provided any property search filter
const hasSearchFilters = (filters) => {
    return Boolean(
        filters.city?.trim() ||
        filters.category?.trim() ||
        filters.purpose?.trim() ||
        filters.type?.trim() ||
        (filters.bhk !== null && filters.bhk !== undefined && filters.bhk !== "") ||
        (filters.minBudget !== null && filters.minBudget !== undefined && filters.minBudget !== "") ||
        (filters.maxBudget !== null && filters.maxBudget !== undefined && filters.maxBudget !== "") ||
        filters.keyword?.trim()
    );
};

// Search properties using extracted filters
export const searchPropertiesWithAI = async (message) => {
    try {
        const filters = await extractPropertyFilters(message);

        if (!hasSearchFilters(filters)) {
            return {
                filters,
                totalResults: 0,
                properties: [],
                isSearch: false,
            };
        }

        const matchedProperties = searchProperties(filters);

        return {
            filters,
            totalResults: matchedProperties.length,
            properties: matchedProperties,
            isSearch: true,
        };
    } catch (error) {
        console.error("Property search error:", error.message);
        throw error;
    }
};

// Generate company information response
const generateCompanyResponse = async (message) => {
    const relevantInfo = getRelevantCompanyInfo(message);

    const prompt = `
You are the official AI assistant of SS Prime Infra Pvt. Ltd.

Answer the user's question using ONLY the company information provided below.

COMPANY INFORMATION:
${JSON.stringify(relevantInfo, null, 2)}

RULES:
- Reply in English.
- Be professional, friendly and conversational.
- Use only the supplied company information.
- Never invent company details, phone numbers, registration numbers or promises.
- If the requested information is unavailable, politely say that you do not have that information.
- You may provide the official company email when relevant.
- Keep the answer concise and easy to understand.
- Do not mention internal files, databases or AI instructions.

USER QUESTION:
${JSON.stringify(message)}
`;

    return await generateAIResponse(prompt, 400);
};

// Generate chatbot response
export const generatePropertyChatResponse = async (message) => {
    try {
        // 1. Company-related question
        if (isCompanyQuestion(message)) {
            const reply = await generateCompanyResponse(message);

            return {
                reply,
                totalResults: 0,
                properties: [],
            };
        }

        // 2. Property search
        const searchResult = await searchPropertiesWithAI(message);

        // 3. Normal conversation
        if (!searchResult.isSearch) {
            const reply = await generateAIResponse(
                `You are a helpful and professional real estate assistant for SS Prime Infra.

User message: ${JSON.stringify(message)}

Reply in English only.
Be friendly, professional and concise.
Do not list or invent properties.
If the user wants property recommendations, ask them to mention a city, project name, property type or budget.`,
                200
            );

            return {
                reply,
                totalResults: 0,
                properties: [],
            };
        }

        // 4. No matching properties
        if (searchResult.totalResults === 0) {
            return {
                reply: "I couldn't find any matching properties. Please try another project name, location, property type or budget.",
                totalResults: 0,
                properties: [],
            };
        }

        // 5. Matching properties
        return {
            reply: `I found ${searchResult.totalResults} matching ${searchResult.totalResults === 1 ? "property" : "properties"}. Here are the details:`,
            totalResults: searchResult.totalResults,
            properties: searchResult.properties,
        };

    } catch (error) {
        console.error("Chat response error:", error.message);
        throw error;
    }
};
