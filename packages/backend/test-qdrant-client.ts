import { QdrantClient } from "@qdrant/js-client-rest";

async function main() {
  const url = "https://8dd9e3ee-deec-471f-97e3-5a28ecafae13.australia-southeast1-0.gcp.cloud.qdrant.io";
  const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwic3ViamVjdCI6ImFwaS1rZXk6ZDJiZmRhNDItY2Y1Mi00YjY2LWJkZmUtYWYzMDA4NGUzNzQyIn0.XH0NV3fOro5O4Ud3VCpF-qpXM6tHmBK1p2H5vDABJWc";
  
  try {
    const client = new QdrantClient({ url, apiKey });
    console.log("Client initialized. Fetching collections...");
    const res = await client.getCollections();
    console.log("Collections:", res);
  } catch (e) {
    console.error("QdrantClient error:", e.message);
  }
}
main();
