import Application from "../models/application.model.js";
import { getHrTransporter } from "../config/mailer.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

        // ── Send HR Email ──────────────────────────────────────────────────
        try {

            const {
                name,
                jobTitle,
                jobId,
                experience,
                linkedin,
                message
            } = req.body;

            const mailOptions = {
                from: `"SS Prime HR" <${process.env.HR_EMAIL}>`,
                to: process.env.HR_EMAIL,
                subject: `📋 New Application: ${name} – ${jobTitle}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                        <div style="background: #2d6a4f; padding: 20px; text-align: center;">
                            <h2 style="color: #ffffff; margin: 0;">SS Prime Infra – Job Application</h2>
                        </div>
                        <div style="padding: 24px; background: #ffffff;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr style="border-bottom: 1px solid #f0f0f0;">
                                    <td style="padding: 10px 0; font-weight: bold; color: #555; width: 140px;">Candidate</td>
                                    <td style="padding: 10px 0; color: #222;">${name}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f0f0f0;">
                                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Email</td>
                                    <td style="padding: 10px 0; color: #222;">${email}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f0f0f0;">
                                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Phone</td>
                                    <td style="padding: 10px 0; color: #222;">${phone}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f0f0f0;">
                                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Job Title</td>
                                    <td style="padding: 10px 0; color: #222;">${jobTitle}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f0f0f0;">
                                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Job ID</td>
                                    <td style="padding: 10px 0; color: #222;">${jobId}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f0f0f0;">
                                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Experience</td>
                                    <td style="padding: 10px 0; color: #222;">${experience}</td>
                                </tr>
                                ${linkedin ? `<tr style="border-bottom: 1px solid #f0f0f0;">
                                    <td style="padding: 10px 0; font-weight: bold; color: #555;">LinkedIn</td>
                                    <td style="padding: 10px 0;"><a href="${linkedin}" style="color: #0a66c2;">${linkedin}</a></td>
                                </tr>` : ""}
                                ${message ? `<tr style="border-bottom: 1px solid #f0f0f0;">
                                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Message</td>
                                    <td style="padding: 10px 0; color: #222;">${message}</td>
                                </tr>` : ""}
                                <tr>
                                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Resume</td>
                                    <td style="padding: 10px 0; color: #222;">${req.file ? "Attached" : "Not Provided"}</td>
                                </tr>
                            </table>
                        </div>
                        <div style="background: #f5f5f5; padding: 12px; text-align: center; font-size: 12px; color: #888;">
                            SS Prime Infra &bull; Auto-generated HR notification
                        </div>
                    </div>
                `,
                attachments: []
            };

            // Attach resume if uploaded
            if (req.file) {
                mailOptions.attachments.push({
                    filename: req.file.originalname || req.file.filename,
                    path: path.join(__dirname, "..", "uploads", "resumes", req.file.filename)
                });
            }

            await getHrTransporter().sendMail(mailOptions);

        } catch (mailErr) {
            console.error("HR Email Error:", mailErr.message);
        }

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