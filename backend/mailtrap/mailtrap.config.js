import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = new MailtrapClient({
    token: TOKEN,
});

export const sender = {
    email: "hello@nishantjswl.tech",
    name: "EasyTrip",
};