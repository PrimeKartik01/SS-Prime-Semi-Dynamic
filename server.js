import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
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

// Serve Frontend
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});