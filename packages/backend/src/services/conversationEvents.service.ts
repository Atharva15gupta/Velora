import { Response } from "express";

type ConversationEvent =
  | { type: "message"; conversationId: string }
  | { type: "status"; conversationId: string; status: string }
  | { type: "deleted"; conversationId: string };

const subscribers = new Map<string, Set<Response>>();

export const subscribeToConversation = (
  conversationId: string,
  res: Response,
) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  let conversationSubscribers = subscribers.get(conversationId);
  if (!conversationSubscribers) {
    conversationSubscribers = new Set();
    subscribers.set(conversationId, conversationSubscribers);
  }

  conversationSubscribers.add(res);
  res.write(`event: connected\ndata: ${JSON.stringify({ conversationId })}\n\n`);

  const heartbeat = setInterval(() => {
    res.write(`event: heartbeat\ndata: {}\n\n`);
  }, 25000);

  res.on("close", () => {
    clearInterval(heartbeat);
    conversationSubscribers?.delete(res);
    if (conversationSubscribers?.size === 0) {
      subscribers.delete(conversationId);
    }
  });
};

export const publishConversationEvent = (event: ConversationEvent) => {
  const conversationSubscribers = subscribers.get(event.conversationId);
  if (!conversationSubscribers) return;

  const payload = `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`;

  for (const subscriber of conversationSubscribers) {
    subscriber.write(payload);
  }
};
