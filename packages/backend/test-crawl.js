const { crawlWebsitePages } = require("./dist/utils/resources/crawlPage");

async function main() {
  try {
    console.log("Starting crawl...");
    const result = await crawlWebsitePages("https://velora-web-blond.vercel.app", ["/faq"]);
    console.log("Crawl succeeded! Pages:", result.length);
  } catch (e) {
    console.error("Crawl failed:", e);
  }
}
main();
