import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import chatbotRoutes from "./routes/chatbot.routes.js";
import enquiryRoutes from "./routes/enquiry.routes.js";
import applicationRoutes from "./routes/application.routes.js";

import connectDB from "./config/db.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

// __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/chatbot", chatbotRoutes);

// Serve Frontend with Browser Caching & ETag optimization for ultra-fast load times
app.use(express.static(path.join(__dirname, "public"), {
    maxAge: "7d",
    etag: true,
    setHeaders(res, filePath) {
        if (/\.(?:html|css|js)$/i.test(filePath)) {
            res.setHeader("Cache-Control", "no-cache, must-revalidate");
        }
    }
}));

// Routes
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});