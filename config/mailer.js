import nodemailer from "nodemailer";

// ─── LAZY INITIALIZATION ──────────────────────────────────────────────────────
// Transporters are created on first use (not at module load time) so that
// dotenv.config() has already run and process.env values are populated.

let _leadsTransporter = null;
let _hrTransporter = null;

// ─── Leads Transporter ────────────────────────────────────────────────────────
export function getLeadsTransporter() {
    if (!_leadsTransporter) {
        const port = Number(process.env.LEADS_SMTP_PORT) || 587;
        _leadsTransporter = nodemailer.createTransport({
            host: process.env.LEADS_SMTP_HOST,
            port: port,
            secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
            auth: {
                user: process.env.LEADS_EMAIL,
                pass: process.env.LEADS_EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false // allow self-signed certs on local
            }
        });
    }
    return _leadsTransporter;
}

// ─── HR Transporter ───────────────────────────────────────────────────────────
export function getHrTransporter() {
    if (!_hrTransporter) {
        const port = Number(process.env.HR_SMTP_PORT) || 587;
        _hrTransporter = nodemailer.createTransport({
            host: process.env.HR_SMTP_HOST,
            port: port,
            secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
            auth: {
                user: process.env.HR_EMAIL,
                pass: process.env.HR_EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false // allow self-signed certs on local
            }
        });
    }
    return _hrTransporter;
}
