import { Request, Response } from "express";
import { prisma } from "@workspace/db";
import Razorpay from "razorpay";

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { plan } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const planId =
      plan === "STARTER"
        ? process.env.RAZORPAY_STARTER_PLAN_ID
        : process.env.RAZORPAY_PRO_PLAN_ID;

    if (!planId) {
      return res.status(400).json({ error: "Invalid plan or missing environment variables." });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId as string,
      customer_notify: 1,
      total_count: 120, // E.g., 10 years of monthly billing
      notes: {
        userId,
        plan,
      },
    });

    return res.json({
      subscriptionId: subscription.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Checkout failed" });
  }
};

export const syncSubscription = async (req: Request, res: Response) => {
  // With Clerk, frontend handles its own session. Just return success.
  return res.status(200).json({ success: true });
};

export const getSuscriptionDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const subscription =  await prisma.subscription.findFirst({
      where: {
        userId,
      },
    });
  
    return res.status(200).json(subscription);
  } catch (error) {
    console.error("Failed to get subscription details", error);
    return res.status(500).json({ error: "Failed to get subscription details" });
  }
}
