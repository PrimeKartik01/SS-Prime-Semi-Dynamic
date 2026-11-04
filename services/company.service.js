
import { companyInfo } from "../public/js/data/companyInfo.js";

const knowledgeSections = [
    {
        keywords: ["service", "buy", "buying", "sell", "selling", "rent", "renting", "lease", "leasing"],
        data: {
            services: companyInfo.services,
            propertyCategories: companyInfo.propertyCategories,
            propertyTypes: companyInfo.propertyTypes,
        },
    },
    {
        keywords: ["office", "address", "location", "city", "where"],
        data: {
            serviceLocations: companyInfo.serviceLocations,
            offices: companyInfo.offices,
        },
    },
    {
        keywords: ["contact", "email", "phone", "reach"],
        data: {
            contact: companyInfo.contact,
            offices: companyInfo.offices,
        },
    },
    {
        keywords: ["founder", "director", "leadership", "team", "management"],
        data: {
            leadership: companyInfo.leadership,
        },
    },
    {
        keywords: ["vision"],
        data: { vision: companyInfo.vision },
    },
    {
        keywords: ["mission"],
        data: { mission: companyInfo.mission },
    },
    {
        keywords: ["why choose", "benefit", "advantage", "trust"],
        data: { whyChooseUs: companyInfo.whyChooseUs },
    },
    {
        keywords: ["enquiry", "enquire", "process", "site visit"],
        data: { enquiryProcess: companyInfo.enquiryProcess },
    },
    {
        keywords: ["support", "available", "working hours", "timing"],
        data: { customerSupport: companyInfo.customerSupport },
    },
    {
        keywords: ["rera", "legal", "registered"],
        data: { legalInformation: companyInfo.legalInformation },
    },
];

// Retrieve relevant company information
export const getRelevantCompanyInfo = (message) => {
    const query = message.toLowerCase();

    const basicInfo = {
        name: companyInfo.name,
        business: companyInfo.business,
        established: companyInfo.established,
        serviceLocations: companyInfo.serviceLocations,
    };

    const matchedSections = knowledgeSections.filter((section) =>
        section.keywords.some((keyword) => query.includes(keyword))
    );

    // General company question: return basic company profile
    if (matchedSections.length === 0) {
        return {
            ...basicInfo,
            services: companyInfo.services,
            vision: companyInfo.vision,
            mission: companyInfo.mission,
        };
    }

    // Return only relevant sections
    const relevantInfo = { ...basicInfo };

    matchedSections.forEach((section) => {
        Object.assign(relevantInfo, section.data);
    });

    return relevantInfo;
};
