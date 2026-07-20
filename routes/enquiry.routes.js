import express from "express";

import { createEnquiry } from "../controllers/enquiry.controller.js";
import { enquiryValidation, validationError } from "../middleware/enquiry.validation.js";

const router = express.Router();

router.post(
    "/",
    enquiryValidation,
    validationError,
    createEnquiry
);

export default router;