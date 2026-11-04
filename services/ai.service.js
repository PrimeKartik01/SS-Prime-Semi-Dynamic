import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const generateAIResponse = async (message, maxTokens = 500) => {
    try {
        const response = await groq.chat.completions.create({
            model: process.env.GROQ_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful and professional real estate assistant for SS Prime Infra. Answer politely, clearly, and concisely.",
                },
                {
                    role: "user",
                    content: message,
                },
            ],
            temperature: 0.5,
            max_tokens: maxTokens,
        });

        return response.choices[0]?.message?.content || "No response generated.";
    } catch (error) {
        console.error("Groq API Error:", error.message);
        throw error;
    }
};