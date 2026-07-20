import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
    {
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

        project: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        budget: {
            type: String,
            required: true,
            trim: true
        },

        propertyId: {
            type: String,
            default: ""
        },

        price: {
            type: String,
            default: ""
        },

        source: {
            type: String,
            enum: ["Contact Form", "Popup Form"],
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema, "enquiries");

export default Enquiry;