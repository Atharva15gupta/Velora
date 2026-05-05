import { Router } from "express";
import { clerkWebhook, razorpayWebhook } from "../controllers/webhook.controller";
import express from "express";

const route: Router = Router();

route.post('/clerk', express.raw({ type: "application/json" }), clerkWebhook);
route.post('/razorpay', express.raw({ type: "application/json" }), razorpayWebhook);

export default route;