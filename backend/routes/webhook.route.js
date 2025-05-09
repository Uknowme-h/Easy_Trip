import express from "express";
import bodyParser from "body-parser";
import { stripeWebhook } from "../controllers/booking.controller.js";

const router = express.Router();

// Parse raw body ONLY for this route
router.post("/", bodyParser.raw({ type: "application/json" }), stripeWebhook);

export default router;

//stripe listen --forward-to localhost:5000/webhook