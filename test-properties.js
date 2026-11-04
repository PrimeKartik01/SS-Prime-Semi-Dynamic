import { searchProperties } from "./services/property.service.js";

// Test 1: Residential properties in Gurugram
const residential = searchProperties({
  city: "Gurugram",
  category: "Residential",
});

console.log("\nResidential Properties:", residential);

// Test 2: Commercial properties for rent
const rental = searchProperties({
  city: "Gurugram",
  category: "Commercial",
  purpose: "rent",
});

console.log("\nCommercial Rental Properties:", rental);

// Test 3: 3 BHK properties
const bhkProperties = searchProperties({
  city: "Gurugram",
  bhk: "3 BHK",
});

console.log("\n3 BHK Properties:", bhkProperties);

// Test 4: Residential properties between 2 Cr and 4 Cr
const budgetProperties = searchProperties({
  city: "Gurugram",
  category: "Residential",
  minBudget: 200,
  maxBudget: 400,
});

console.log("\nBudget Properties:", budgetProperties);

// Test 5: Search by project name
const keywordResults = searchProperties({
  keyword: "M3M",
});

console.log("\nM3M Properties:", keywordResults);