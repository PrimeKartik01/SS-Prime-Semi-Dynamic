
import { properties } from "../public/js/data/properties.js";

// Get all properties
export const getAllProperties = () => {
    return properties;
};

// Get property by ID
export const getPropertyById = (id) => {
    return properties.find(
        (property) => property.id === Number(id)
    );
};

// Get properties by city
export const getPropertiesByCity = (city) => {
    if (!city?.trim()) return [];

    return properties.filter((property) =>
        property.city?.toLowerCase().includes(city.toLowerCase().trim())
    );
};

// Get properties by category
export const getPropertiesByCategory = (category) => {
    if (!category?.trim()) return [];

    return properties.filter(
        (property) =>
            property.category?.toLowerCase() === category.toLowerCase().trim()
    );
};

// Search properties by keyword
export const searchPropertiesByKeyword = (keyword) => {
    if (!keyword?.trim()) return [];

    const searchTerm = keyword.toLowerCase().trim();

    return properties.filter((property) => {
        const searchableFields = [
            property.title,
            property.builder,
            property.category,
            property.type,
            property.city,
            property.address,
            property.bhk,
            property.status,
        ];

        return searchableFields.some((field) =>
            field?.toString().toLowerCase().includes(searchTerm)
        );
    });
};

// Convert advertised price into lakhs.
// ₹2.5 Cr = 250 lakhs
// ₹78.75 L = 78.75 lakhs
// ₹35,000 Per Month = 0.35 lakhs
const getPriceInLakhs = (priceLabel = "") => {
    const label = priceLabel.toLowerCase().trim();

    if (!label || label.includes("request")) {
        return null;
    }

    // Handle monthly rental prices
    const monthlyAmount = label.match(
        /₹\s*([\d,]+(?:\.\d+)?)\s*per month/
    );

    if (monthlyAmount) {
        return [
            Number(monthlyAmount[1].replace(/,/g, "")) / 100000,
        ];
    }

    // Handle Crore and Lakh prices
    const amounts = [
        ...label.matchAll(
            /([\d,.]+)\s*(crores?|cr|lakhs?|l)\b/g
        ),
    ];

    if (amounts.length > 0) {
        return amounts.map((match) => {
            const amount = Number(match[1].replace(/,/g, ""));
            const unit = match[2];

            return unit.startsWith("cr") || unit.startsWith("crore")
                ? amount * 100
                : amount;
        });
    }

    return null;
};

// Identify whether a property is for Buy or Rent
const getPropertyPurpose = (property) => {
    const priceLabel = property.priceLabel?.toLowerCase() || "";

    if (priceLabel.includes("per month")) {
        return "rent";
    }

    if (getPriceInLakhs(priceLabel)) {
        return "buy";
    }

    return "unknown";
};

// Advanced property search
export const searchProperties = ({
    city,
    category,
    purpose,
    type,
    bhk,
    minBudget,
    maxBudget,
    keyword,
    limit,
} = {}) => {
    let results = [...properties];

    // 1. City filter
    if (city?.trim()) {
        const searchCity = city.toLowerCase().trim();

        results = results.filter((property) =>
            property.city?.toLowerCase().includes(searchCity)
        );
    }

    // 2. Category filter
    if (category?.trim()) {
        const searchCategory = category.toLowerCase().trim();

        results = results.filter(
            (property) =>
                property.category?.toLowerCase() === searchCategory
        );
    }

    // 3. Buy / Rent filter
    if (purpose?.trim()) {
        const searchPurpose = purpose.toLowerCase().trim();

        results = results.filter(
            (property) =>
                getPropertyPurpose(property) === searchPurpose
        );
    }

    // 4. Property type filter
    if (type?.trim()) {
        const searchType = type.toLowerCase().trim();

        results = results.filter((property) =>
            property.type?.toLowerCase().includes(searchType)
        );
    }

    // 5. BHK filter
    if (bhk !== undefined && bhk !== null && bhk !== "") {
        const requestedBHK = String(bhk).match(/\d+(?:\.\d+)?/)?.[0];

        results = results.filter((property) => {
            if (!property.bhk || !requestedBHK) return false;

            const availableBHK =
                property.bhk.match(/\d+(?:\.\d+)?/g) || [];

            return availableBHK.includes(requestedBHK);
        });
    }

    // 6. Budget filter
    // IMPORTANT: null and undefined budgets must be ignored.
    const hasMinBudget =
        minBudget !== undefined &&
        minBudget !== null &&
        minBudget !== "";

    const hasMaxBudget =
        maxBudget !== undefined &&
        maxBudget !== null &&
        maxBudget !== "";

    if (hasMinBudget || hasMaxBudget) {
        results = results.filter((property) => {
            const prices = getPriceInLakhs(property.priceLabel);

            // Do not guess Price on Request values
            if (!prices) return false;

            const lowestPrice = Math.min(...prices);
            const highestPrice = Math.max(...prices);

            const minimum = hasMinBudget ? Number(minBudget) : 0;

            const maximum = hasMaxBudget
                ? Number(maxBudget)
                : Infinity;

            if (
                !Number.isFinite(minimum) ||
                !Number.isFinite(maximum) ||
                minimum < 0 ||
                maximum < minimum
            ) {
                return false;
            }

            // Match overlapping advertised price ranges
            return lowestPrice <= maximum && highestPrice >= minimum;
        });
    }

    // 7. Keyword filter
    if (keyword?.trim()) {
        const searchTerm = keyword.toLowerCase().trim();

        results = results.filter((property) => {
            const searchableFields = [
                property.title,
                property.builder,
                property.category,
                property.type,
                property.city,
                property.address,
                property.bhk,
                property.status,
            ];

            return searchableFields.some((field) =>
                field?.toString().toLowerCase().includes(searchTerm)
            );
        });
    }

    // 8. Optional result limit
    if (limit !== undefined && limit !== null && limit !== "") {
        const resultLimit = Number(limit);

        if (Number.isInteger(resultLimit) && resultLimit >= 0) {
            results = results.slice(0, resultLimit);
        }
    }

    return results;
};
