import express from "express";
import { generatePropertyChatResponse } from "../services/chatbot.service.js";

const router = express.Router();

// POST /api/chatbot/message
router.post("/message", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid message.",
      });
    }

    const result = await generatePropertyChatResponse(message.trim());

    return res.status(200).json({
      success: true,
      reply: result.reply,
      totalResults: result.totalResults,
      properties: result.properties,
    });
  } catch (error) {
    console.error("Chatbot Route Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
});

export default router;