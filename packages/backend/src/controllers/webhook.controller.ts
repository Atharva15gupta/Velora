import { Request, Response } from "express";
import { prisma } from "@workspace/db";
import { Webhook } from "svix";
import crypto from "crypto";

export const clerkWebhook = async (req: Request, res: Response) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ error: "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env" });
  }

  // Get the headers
  const svix_id = req.headers["svix-id"] as string;
  const svix_timestamp = req.headers["svix-timestamp"] as string;
  const svix_signature = req.headers["svix-signature"] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: "Error occured -- no svix headers" });
  }

  // express.raw() passes buffer, so convert it to string
  const payload = req.body.toString("utf8");
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).json({ error: "Error verifying" });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses[0]?.email_address;
    
    if (email) {
      await prisma.user.upsert({
        where: { id },
        update: {
          firstName: first_name || "",
          lastName: last_name || "",
          email,
        },
        create: {
          id,
          firstName: first_name || "",
          lastName: last_name || "",
          email,
        },
      });
    }
  }

  if (eventType === "user.deleted") {
    await prisma.user.delete({ where: { id } }).catch(() => {});
  }

  return res.status(200).json({ success: true });
};

export const razorpayWebhook = async (req: Request, res: Response) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    return res.status(500).send("Webhook secret missing");
  }

  const signature = req.headers["x-razorpay-signature"] as string;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(req.body.toString("utf8"))
    .digest("hex");

  if (expectedSignature !== signature) {
    return res.status(400).send("Invalid signature");
  }

  const event = JSON.parse(req.body.toString("utf8"));
  
  if (event.event === "subscription.charged") {
    const subscriptionId = event.payload.subscription.entity.id;
    // Razorpay subscription webhooks contain the notes we pass during creation
    const userId = event.payload.subscription.entity.notes?.userId;
    const plan = event.payload.subscription.entity.notes?.plan;
    
    if (userId && plan) {
      const endsAt = new Date(event.payload.subscription.entity.current_end * 1000);
      
      await prisma.subscription.upsert({
        where: { userId },
        update: {
          status: "ACTIVE",
          endsAt,
          razorpaySubscriptionId: subscriptionId,
        },
        create: {
          userId,
          plan: plan === "PRO" ? "PRO" : "STARTER",
          status: "ACTIVE",
          razorpaySubscriptionId: subscriptionId,
          startedAt: new Date(),
          endsAt,
        },
      });
    }
  } else if (event.event === "subscription.halted" || event.event === "subscription.cancelled") {
    const subscriptionId = event.payload.subscription.entity.id;
    await prisma.subscription.updateMany({
      where: { razorpaySubscriptionId: subscriptionId },
      data: { status: event.event === "subscription.cancelled" ? "CANCELLED" : "PAST_DUE" },
    });
  }

  return res.status(200).send("OK");
};
