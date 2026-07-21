import Enquiry from "../models/enquiry.model.js";
import { getLeadsTransporter } from "../config/mailer.js";

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

        // ── Send Lead Email ────────────────────────────────────────────────
        try {

            const { name, project, city, budget, propertyId, price, source } = req.body;

            await getLeadsTransporter().sendMail({
                from: `"SS Prime Leads" <${process.env.LEADS_EMAIL}>`,
                to: process.env.LEADS_EMAIL,
                subject: `🏠 New Lead: ${name} – ${project}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                        <div style="background: #1a3c6e; padding: 20px; text-align: center;">
                            <h2 style="color: #ffffff; margin: 0;">SS Prime Infra – New Lead</h2>
                        </div>
                        <div style="padding: 24px; background: #ffffff;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr style="border-bottom: 1px solid #f0f0f0;">
                                    <td style="padding: 10px 0; font-weight: bold; color: #555; width: 140px;">Name</td>
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
                                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Project</td>
                                    <td style="padding: 10px 0; color: #222;">${project}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f0f0f0;">
                                    <td style="padding: 10px 0; font-weight: bold; color: #555;">City</td>
                                    <td style="padding: 10px 0; color: #222;">${city}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f0f0f0;">
                                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Budget</td>
                                    <td style="padding: 10px 0; color: #222;">${budget}</td>
                                </tr>
                                ${propertyId ? `<tr style="border-bottom: 1px solid #f0f0f0;">
                                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Property ID</td>
                                    <td style="padding: 10px 0; color: #222;">${propertyId}</td>
                                </tr>` : ""}
                                ${price ? `<tr style="border-bottom: 1px solid #f0f0f0;">
                                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Price</td>
                                    <td style="padding: 10px 0; color: #222;">${price}</td>
                                </tr>` : ""}
                                <tr>
                                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Source</td>
                                    <td style="padding: 10px 0; color: #222;">${source}</td>
                                </tr>
                            </table>
                        </div>
                        <div style="background: #f5f5f5; padding: 12px; text-align: center; font-size: 12px; color: #888;">
                            SS Prime Infra &bull; Auto-generated lead notification
                        </div>
                    </div>
                `
            });

        } catch (mailErr) {
            console.error("Lead Email Error:", mailErr.message);
        }

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