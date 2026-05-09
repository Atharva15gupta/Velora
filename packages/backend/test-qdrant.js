const { QdrantClient } = require("@qdrant/js-client-rest");
require("dotenv").config();

async function main() {
  const client = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
  });

  try {
    const collections = await client.getCollections();
    console.log("Collections:", collections);
  } catch (e) {
    console.error("Failed to get collections:", e);
  }
}
main();
