import express from "express";

import { createApplication } from "../controllers/application.controller.js";
import upload from "../middleware/upload.js";

import {

    applicationValidation,

    validationError

} from "../middleware/application.validation.js";

const router = express.Router();

router.post(

    "/",

    upload.single("resume"),

    applicationValidation,

    validationError,

    createApplication

);

export default router;