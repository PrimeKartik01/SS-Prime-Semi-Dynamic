import dotenv from "dotenv";
import { generateAIResponse } from "./services/ai.service.js";

dotenv.config();

const testAI = async () => {
  try {
    const response = await generateAIResponse(
      "Introduce SS Prime Infra in 2 sentences."
    );

    console.log("AI Response:", response);
  } catch (error) {
    console.error("Test Failed:", error.message);
  }
};

testAI();