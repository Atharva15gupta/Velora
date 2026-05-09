import type { QdrantClient } from "@qdrant/js-client-rest" with {
  "resolution-mode": "import"
};
import dotenv from "dotenv";

dotenv.config();

let clientPromise: Promise<QdrantClient> | null = null;

export const getQdrantClient = async (): Promise<QdrantClient> => {
  if (!clientPromise) {
    const url = process.env.QDRANT_URL;
    const apiKey = process.env.QDRANT_API_KEY;
    
    if (!url) {
      console.warn("QDRANT_URL is not set!");
    }

    clientPromise = import("@qdrant/js-client-rest").then(
      ({ QdrantClient }) =>
        new QdrantClient({
          url: url,
          apiKey: apiKey,
          port: url?.startsWith("https") ? 443 : 6333,
        }),
    );
  }

  return clientPromise;
};
