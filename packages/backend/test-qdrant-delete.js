const { QdrantClient } = require("@qdrant/js-client-rest");
require("dotenv").config();

async function main() {
  const client = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
  });

  const workspaceId = "7fc6ab56-070e-43e4-bcae-91442bb3d9a7";

  try {
    const res = await client.delete(workspaceId, {
      filter: {
        must: [
          {
            key: "metadata.resourceId",
            match: {
              value: "dummy-id",
            },
          },
        ],
      },
    });
    console.log("Delete success:", res);
  } catch (e) {
    console.error("Delete failed:", e);
  }
}
main();
