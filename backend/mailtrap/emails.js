import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

import { gmailTransporter, sender } from "./mail.config.js";

const formatAddress = (name, email) => `"${name}" <${email}>`;

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const info = await gmailTransporter.sendMail({
            from: formatAddress(sender.name, sender.email),
            to: email,
            subject: "Account Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        });

        console.log("Verification email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Email not sent: " + error.message);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const html = `<h2>Welcome, ${name}!</h2><p>Thanks for joining EasyTrip. We’re excited to have you on board.</p>`;

    try {
        const info = await gmailTransporter.sendMail({
            from: formatAddress(sender.name, sender.email),
            to: email,
            subject: "Welcome to EasyTrip!",
            html,
        });

        console.log("Welcome email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Email not sent: " + error.message);
    }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
    try {
        const info = await gmailTransporter.sendMail({
            from: formatAddress(sender.name, sender.email),
            to: email,
            subject: "Password Reset",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetToken),
        });

        console.log("Password reset email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw new Error("Email not sent: " + error.message);
    }
};

export const sendPasswordResetSuccessEmail = async (email) => {
    try {
        const info = await gmailTransporter.sendMail({
            from: formatAddress(sender.name, sender.email),
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        });

        console.log("Password reset success email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending password reset success email:", error);
        throw new Error("Email not sent: " + error.message);
    }
};
