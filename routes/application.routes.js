import express from "express";
import multer from "multer";

import { createApplication } from "../controllers/application.controller.js";
import upload from "../middleware/upload.js";

import {

    applicationValidation,

    validationError

} from "../middleware/application.validation.js";

const router = express.Router();

// Wraps multer so errors return JSON instead of an HTML error page
function handleUpload(req, res, next) {
    upload.single("resume")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // e.g. file too large
            return res.status(400).json({ success: false, message: err.message });
        } else if (err) {
            // e.g. wrong file type
            return res.status(400).json({ success: false, message: err.message });
        }
        next();
    });
}

router.post(

    "/",

    handleUpload,

    applicationValidation,

    validationError,

    createApplication

);

export default router;