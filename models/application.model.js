import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        jobId: {
            type: String,
            required: true,
            trim: true
        },

        jobTitle: {
            type: String,
            required: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        experience: {
            type: String,
            required: true,
            trim: true
        },

        linkedin: {
            type: String,
            default: ""
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        resume: {
            type: String,
            default: ""
        },

        source: {
            type: String,
            default: "Careers Apply"
        }
    },
    {
        timestamps: true
    }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;