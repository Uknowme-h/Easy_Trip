import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const gmailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export const sender = {
    email: process.env.GMAIL_USER,
    name: "EasyTrip",
};
