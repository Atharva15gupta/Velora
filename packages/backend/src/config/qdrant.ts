import { QdrantClient } from "@qdrant/js-client-rest";
import dotenv from "dotenv";

dotenv.config();

let client: QdrantClient | null = null;

export const getQdrantClient = async (): Promise<QdrantClient> => {
  if (!client) {
    const url = process.env.QDRANT_URL;
    const apiKey = process.env.QDRANT_API_KEY;

    if (!url) {
      console.warn("QDRANT_URL is not set!");
    }

    client = new QdrantClient({
      url: url,
      apiKey: apiKey,
    });
  }

  return client;
};

