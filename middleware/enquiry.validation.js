import { body, validationResult } from "express-validator";

export const enquiryValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Name must be between 3 and 50 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .matches(/^[6-9]\d{9}$/)
        .withMessage("Please enter a valid 10 digit mobile number"),

    body("project")
        .trim()
        .notEmpty()
        .withMessage("Project is required"),

    body("city")
        .trim()
        .notEmpty()
        .withMessage("City is required"),

    body("budget")
        .trim()
        .notEmpty()
        .withMessage("Budget is required"),

    body("source")
        .trim()
        .notEmpty()
        .withMessage("Source is required")
        .isIn(["Contact Form", "Popup Form"])
        .withMessage("Invalid source")

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