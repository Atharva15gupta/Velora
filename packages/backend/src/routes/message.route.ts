import { Router } from "express";
import {
  createMessage,
  getAllMessages,
  getConversationMessagesWithIdentityCheck,
  getLastMessage,
  sendHumanReply,
} from "../controllers/message.controller";
import {
  requireWorkspaceAccess,
  requireWorkspacePublic,
} from "../middlewares/requireWorkspace";
import { verifyAuth } from "../middlewares/auth.middleware";
import { subscribeToConversation } from "../services/conversationEvents.service";

const route: Router = Router();

// Widget-facing endpoints
route.post(
  "/:workspaceId/conversations/:conversationId/messages/create",
  requireWorkspacePublic,
  createMessage
);
route.get(
  "/:workspaceId/conversations/:conversationId/messages",
  requireWorkspacePublic,
  getConversationMessagesWithIdentityCheck
);
route.get(
  "/:workspaceId/conversations/:conversationId/messages/last",
  requireWorkspacePublic,
  getLastMessage
);
route.get(
  "/:workspaceId/conversations/:conversationId/events",
  requireWorkspacePublic,
  (req, res) => {
    const { conversationId } = req.params;
    if (!conversationId) {
      return res.status(400).json({ message: "Conversation ID is required" });
    }
    return subscribeToConversation(conversationId, res);
  }
);

// Dashboard/admin endpoints
route.get(
  "/:workspaceId/conversations/:conversationId/messages/all",
  verifyAuth,
  requireWorkspaceAccess,
  getAllMessages
);
route.post(
  "/:workspaceId/conversations/:conversationId/messages/create-human",
  verifyAuth,
  requireWorkspaceAccess,
  sendHumanReply
);

export default route;
