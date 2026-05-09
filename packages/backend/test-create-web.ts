import { crawlWebsitePages } from "./src/utils/resources/crawlPage";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "langchain";
import { getWorkspaceVectorStore } from "./src/utils/file-processing/workspaceVectorStore";

async function main() {
  try {
    const url = "https://velora-web-blond.vercel.app";
    const paths = ["/faq", "/docs", "/support"];
    const workspaceId = "7fc6ab56-070e-43e4-bcae-91442bb3d9a7";
    const resourceId = "dummy-resource-id";

    console.log("Crawling...");
    const crawled = await crawlWebsitePages(url, paths);
    console.log("Crawled pages:", crawled.length);

    const docsWithMeta = crawled.map(({ page, content }) => {
      return new Document({
        pageContent: content,
        metadata: {
          workspaceId,
          resourceId,
          source: "web",
          url,
          pagePath: page,
        },
      });
    });

    console.log("Splitting...");
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 700,
      chunkOverlap: 200,
    });
    const splitDocs = await splitter.splitDocuments(docsWithMeta);
    console.log("Split into docs:", splitDocs.length);

    console.log("Getting vector store...");
    const vectorStore = await getWorkspaceVectorStore(workspaceId);
    
    console.log("Adding documents...");
    await vectorStore.addDocuments(splitDocs);
    console.log("Success!");

  } catch (e) {
    console.error("Simulation failed:", e);
  }
}
main();
