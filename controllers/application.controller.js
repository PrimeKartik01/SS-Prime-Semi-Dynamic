import Application from "../models/application.model.js";

export const createApplication = async (req, res) => {

    try {

        const {

            email,

            phone

        } = req.body;

        const existingApplication = await Application.findOne({

            $or: [

                { email },

                { phone }

            ]

        });

        if (existingApplication) {

            return res.status(409).json({

                success: false,

                message: "You have already applied."

            });

        }

        const applicationData = { ...req.body };
        if (req.file) {
            applicationData.resume = req.file.filename;
        }

        await Application.create(applicationData);

        return res.status(201).json({

            success: true,

            message: "Application submitted successfully."

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal server error."

        });

    }

};