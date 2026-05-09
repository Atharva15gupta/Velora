import { QdrantVectorStore } from "@langchain/qdrant";
import { getEmbedding } from "../../config/embedding";
import { getQdrantClient } from "../../config/qdrant";
import dotenv from "dotenv";

dotenv.config();

const storeCache = new Map<string, QdrantVectorStore>();

import { createCollection } from "./createCollection";

export const getWorkspaceVectorStore = async (workspaceId: string) => {
  if (!workspaceId) {
    throw new Error("workspaceId is required");
  }

  if (storeCache.has(workspaceId)) {
    return storeCache.get(workspaceId)!;
  }

  const client = await getQdrantClient();
  
  // Check if collection exists
  try {
    const collections = await client.getCollections();
    const exists = collections.collections.some(c => c.name === workspaceId);
    
    if (!exists) {
      console.log(`Collection ${workspaceId} not found. Creating it now...`);
      await createCollection(workspaceId);
    }
  } catch (error) {
    console.error("Error checking/creating Qdrant collection:", error);
  }

  const vectorStore = await QdrantVectorStore.fromExistingCollection(getEmbedding(), {
    client,
    collectionName: workspaceId,
  });

  storeCache.set(workspaceId, vectorStore);
  return vectorStore;
};
