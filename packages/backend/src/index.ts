import express from "express";
import type { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";
import workspaceRouter from "./routes/workspace.route";
import resourceRouter from "./routes/resource.route";
import conversationRouter from "./routes/conversation.route";
import customerRouter from "./routes/customer.route";
import messageRouter from "./routes/message.route";
import widgetSettingRouter from "./routes/widgetSetting.route";
import widgetRouter from "./routes/widget.routes";
import analyticsRouter from "./routes/analytics.route";
import subscriptionRouter from "./routes/subscription.route";
import notificationRouter from "./routes/notification.route";
import webhookRouter from "./routes/webhook.route";
import { prisma } from "@workspace/db";
import { clerkAuth } from "./middlewares/auth.middleware";

dotenv.config();

const app: Express = express();
const corsOrigins = (process.env.CORS_ORIGINS ??
  "http://localhost:3000,http://localhost:3001")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// CORS Configuration
app.use(
  cors({
    origin: corsOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use("/api/v1/webhooks", webhookRouter);

// Clerk auth middleware (parses auth state from Bearer tokens)
app.use(clerkAuth);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// Server Port
const PORT = process.env.PORT;

app.get("/", async (_req, res) => {
  let prismaUp = false;
  let qdrantUp = false;
  let langGraphInitialized = false;

  try {
    await prisma.$queryRawUnsafe("SELECT 1");
    prismaUp = true;
  } catch (error) {
    console.error("Prisma health check failed:", error);
  }

  try {
    const { getQdrantClient } = await import("./config/qdrant.js");
    const client = await getQdrantClient();
    await client.getCollections();
    qdrantUp = true;
  } catch (error) {
    console.error("Qdrant health check failed:", error);
  }

  try {
    const { getChatbot } = await import("./config/langgraph.js");
    await getChatbot();
    langGraphInitialized = true;
  } catch (error) {
    console.error("LangGraph init check failed:", error);
  }

  const allSystemsUp = prismaUp && qdrantUp && langGraphInitialized;

  res.status(allSystemsUp ? 200 : 503).json({
    message: "Welcome to Velora backend",
    status: allSystemsUp ? "ok" : "degraded",
    services: {
      prisma: prismaUp ? "up" : "down",
      qdrant: qdrantUp ? "up" : "down",
      langGraph: langGraphInitialized ? "initialized" : "not_initialized",
    },
  });
});

// Routes
app.get("/api/v1/debug-env", (req, res) => {
  res.json({
    qdrantUrlLength: process.env.QDRANT_URL?.length || 0,
    qdrantKeyLength: process.env.QDRANT_API_KEY?.length || 0,
    googleKeyLength: process.env.GOOGLE_API_KEY?.length || 0,
  });
});
app.get("/api/v1/test-fetch", async (req, res) => {
  const results: any = {};
  
  try {
    const qdrant = await fetch(process.env.QDRANT_URL as string);
    results.qdrant = `Success: ${qdrant.status}`;
  } catch (e: any) {
    results.qdrant = `Error: ${e.message} - ${e.stack}`;
  }

  try {
    const jina = await fetch("https://r.jina.ai/https://example.com");
    results.jina = `Success: ${jina.status}`;
  } catch (e: any) {
    results.jina = `Error: ${e.message} - ${e.stack}`;
  }

  try {
    const googleKey = process.env.GOOGLE_API_KEY;
    const googleRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${googleKey}`
    );
    results.googleAPI = `Success: ${googleRes.status}`;
  } catch (e: any) {
    results.googleAPI = `Error: ${e.message}`;
  }

  try {
    const { ChatGoogleGenerativeAI } = await import("@langchain/google-genai");
    const llm = new ChatGoogleGenerativeAI({ model: "gemini-2.5-flash-lite", temperature: 0 });
    const resp = await llm.invoke("Say hello in one word");
    results.geminiLLM = `Success: ${typeof resp.content === "string" ? resp.content.slice(0, 30) : "ok"}`;
  } catch (e: any) {
    results.geminiLLM = `Error: ${e.message}`;
  }

  results.nodeOptions = process.env.NODE_OPTIONS || "NOT SET";
  
  res.json(results);
});
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/workspace", workspaceRouter);
app.use("/api/v1/workspace", resourceRouter);
app.use("/api/v1/workspace", customerRouter);
app.use("/api/v1/workspace", conversationRouter);
app.use("/api/v1/workspace", messageRouter);
app.use("/api/v1/workspace", widgetSettingRouter);
app.use("/api/v1/workspace", analyticsRouter);
app.use("/api/v1/workspace", notificationRouter);
app.use("/api/v1/widget", widgetRouter);
app.use("/api/v1/subscription", subscriptionRouter);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
  });
}

export default app;
