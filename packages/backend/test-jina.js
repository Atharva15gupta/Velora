async function main() {
  try {
    const res = await fetch("https://r.jina.ai/https://example.com");
    console.log("Jina success:", res.status);
  } catch (e) {
    console.error("Jina error:", e.message);
  }
}
main();
