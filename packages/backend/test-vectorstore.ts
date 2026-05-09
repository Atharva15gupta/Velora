import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const url = "https://8dd9e3ee-deec-471f-97e3-5a28ecafae13.australia-southeast1-0.gcp.cloud.qdrant.io";
  const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwic3ViamVjdCI6ImFwaS1rZXk6ZDJiZmRhNDItY2Y1Mi00YjY2LWJkZmUtYWYzMDA4NGUzNzQyIn0.XH0NV3fOro5O4Ud3VCpF-qpXM6tHmBK1p2H5vDABJWc";
  
  const client = new QdrantClient({ url, apiKey });
  
  const embedding = new GoogleGenerativeAIEmbeddings({
      model: "gemini-embedding-001",
      apiKey: process.env.GOOGLE_API_KEY
  });

  try {
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embedding, {
      client,
      collectionName: "test_workspace_id",
    });
    console.log("VectorStore created successfully:", !!vectorStore);
  } catch (e) {
    console.error("VectorStore Error:", e);
  }
}
main();
