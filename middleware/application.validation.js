import { body, validationResult } from "express-validator";

export const applicationValidation = [

    body("jobId")
        .trim()
        .notEmpty()
        .withMessage("Job ID is required"),

    body("jobTitle")
        .trim()
        .notEmpty()
        .withMessage("Job title is required"),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone number must be 10 digits"),

    body("experience")
        .trim()
        .notEmpty()
        .withMessage("Experience is required"),

    body("message")
        .trim()
        .notEmpty()
        .withMessage("Message is required")
        .isLength({ min: 20 })
        .withMessage("Message should be at least 20 characters")

];

export const validationError = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({

            success: false,

            errors: errors.array()

        });

    }

    next();

};