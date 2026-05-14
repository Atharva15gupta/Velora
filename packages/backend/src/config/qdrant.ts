import dotenv from "dotenv";

type QdrantClientType = any;

dotenv.config();

let client: QdrantClientType | null = null;

export const getQdrantClient = async (): Promise<QdrantClientType> => {
  if (!client) {
    const { QdrantClient } = await import("@qdrant/js-client-rest");
    const url = process.env.QDRANT_URL;
    const apiKey = process.env.QDRANT_API_KEY;

    if (!url) {
      throw new Error("QDRANT_URL is not set");
    }

    client = new QdrantClient({
      url,
      apiKey,
    });
  }

  return client;
};

