
import {
  searchPropertiesWithAI,
  generatePropertyChatResponse,
} from "./services/chatbot.service.js";

const testMessage =
  "Gurugram mein 3 BHK residential property 2 crore tak dikhao";

// Test 1: Property search
const testSearch = async () => {
  try {
    const result = await searchPropertiesWithAI(testMessage);

    console.log("\n========== PROPERTY SEARCH ==========");

    console.log("\nUser Message:", testMessage);
    console.log("\nExtracted Filters:");
    console.log(result.filters);

    console.log("\nTotal Matching Properties:", result.totalResults);

    console.log("\nMatching Properties:");

    result.properties.forEach((property, index) => {
      console.log(`\n${index + 1}. ${property.title}`);
      console.log("Builder:", property.builder);
      console.log("City:", property.city);
      console.log("BHK:", property.bhk);
      console.log("Price:", property.priceLabel);
    });
  } catch (error) {
    console.error("Search Test Error:", error.message);
  }
};

// Test 2: AI conversational response
const testChatbot = async () => {
  try {
    const result = await generatePropertyChatResponse(testMessage);

    console.log("\n========== AI CHATBOT RESPONSE ==========");

    console.log("\nAI Reply:\n");
    console.log(result.reply);

    console.log("\nTotal Properties:", result.totalResults);
  } catch (error) {
    console.error("Chatbot Test Error:", error.message);
  }
};

// Run tests one by one
const runTests = async () => {
  await testSearch();
  await testChatbot();
};

runTests();
