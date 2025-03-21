import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recepient = [{ email }];

    try {
        const response = await mailtrapClient.send(
            {
                from: sender,
                to: recepient,
                subject: "Account Verification",
                html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
                category: "Account Verification"
            }
        )
        console.log("Email sent succesfully!", response);
    } catch (error) {
        console.error("Email not sent", error);
        throw new Error("Email not sent: " + error.message);

    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recepient = [{ email }];

    try {
        const response = await mailtrapClient.send(
            {
                from: sender,
                to: recepient,
                template_uuid: "c879d110-25a3-4fbe-89e2-ec2b5b0396f5",
                template_variables: {
                    "name": name
                },
            }
        )
        console.log("Welcome Email sent succesfully!", response);
    } catch (error) {
        console.error("Email not sent", error);
        throw new Error("Email not sent: " + error.message);

    }
}

export const sendPasswordResetEmail = async (email, resetToken) => {
    const recepient = [{ email }];

    try {
        const response = await mailtrapClient.send(
            {
                from: sender,
                to: recepient,
                subject: "Password Reset",
                html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetToken),
                category: "Password Reset"
            }
        )
        console.log("Password reset email sent succesfully!", response);
    } catch (error) {
        console.error("Email not sent", error);
        throw new Error("Email not sent: " + error.message);

    }
}

export const sendPasswordResetSuccessEmail = async (email) => {

    const recepient = [{ email }];

    try {
        const response = await mailtrapClient.send(
            {
                from: sender,
                to: recepient,
                subject: "Password Reset Successful",
                html: PASSWORD_RESET_SUCCESS_TEMPLATE,
                category: "Password Reset"
            }
        )
        console.log("Password reset success email sent succesfully!", response);
    } catch (error) {
        console.error("Email not sent", error);
        throw new Error("Email not sent: " + error.message);

    }
}