import { tool } from "@langchain/core/tools";
import * as z from "zod";
import { getWorkspaceVectorStore } from "../utils/file-processing/workspaceVectorStore";
import { prisma } from "@workspace/db";
import { escalateConversation } from "../services/notification.service";

export const vectorSearchTool = tool(
  async ({
    query,
    workspaceId,
  }: {
    query: string;
    workspaceId?: string;
  }) => {
    try {
      if (!workspaceId) {
        return "Workspace context is missing, so the knowledge base cannot be searched right now.";
      }

      const vectorStore = await getWorkspaceVectorStore(workspaceId);
      if (!vectorStore) {
        return "Vector store not found for the specified workspace.";
      }

      const activeResources = await prisma.resource.findMany({
        where: { workspaceId, active: true },
        select: { id: true },
      });

      const activeIds = new Set(activeResources.map((resource) => resource.id));

      const results = await vectorStore.similaritySearch(query, 6);

      const filtered = results.filter(
        d => d.metadata?.resourceId && activeIds.has(d.metadata.resourceId)
      );

      return filtered
        .map((doc, idx) => `Result ${idx + 1}:\n${doc.pageContent}`)
        .join("\n\n");
    } catch (e: any) {
      console.error("vectorSearchTool error:", e?.message ?? String(e));
      return "I could not search the knowledge base right now. Please answer based on general knowledge.";
    }
  },
  {
    name: "search_tool",
    description: "Search company knowledge base for relevant information",
    schema: z.object({
      query: z.string().describe("Search query text"),
    }),
  }
);

export const escalateConversationTool = tool(
  async ({
    conversationId,
    workspaceId,
  }: {
    conversationId?: string;
    workspaceId?: string;
  }) => {
    if (!workspaceId || !conversationId) {
      return "Conversation context is missing, so this chat could not be escalated.";
    }

    await escalateConversation(workspaceId, conversationId);

    return "Conversation has been escalated to a human agent.";
  },
  {
    name: "escalate_conversation",
    description:
      "Escalate the conversation to a human agent when the user asks for human help or is unhappy.",
    schema: z.object({}),
  }
);

export const resolveConversationTool = tool(
  async ({ conversationId }: { conversationId?: string }) => {
    if (!conversationId) {
      return "Conversation context is missing, so this chat could not be resolved.";
    }

    await prisma.conversation.update({
      where: { id: conversationId },
      data: { status: "resolved" },
    });

    return "Conversation has been marked as resolved.";
  },
  {
    name: "resolve_conversation",
    description:
      "Mark the conversation as resolved when the user confirms their issue is solved.",
    schema: z.object({}),
  }
);

export const toolsByName = {
  search_tool: vectorSearchTool,
  escalate_conversation: escalateConversationTool,
  resolve_conversation: resolveConversationTool,
};
