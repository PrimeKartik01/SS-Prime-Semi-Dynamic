import Enquiry from "../models/enquiry.model.js";

export const createEnquiry = async (req, res) => {

    try {

        const { email, phone } = req.body;

        const existingEnquiry = await Enquiry
            .findOne({
                $or: [
                    { email },
                    { phone }
                ]
            })
            .select("_id");

        if (existingEnquiry) {

            return res.status(409).json({
                success: false,
                message: "You have already submitted an enquiry."
            });

        }

        const enquiry = new Enquiry(req.body);

        await enquiry.save();

        return res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully."
        });

    } catch (error) {

        console.error("Create Enquiry Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};