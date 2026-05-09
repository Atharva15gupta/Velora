async function main() {
  const url1 = "https://8dd9e3ee-deec-471f-97e3-5a28ecafae13.australia-southeast1-0.gcp.cloud.qdrant.io";
  const url2 = "https://8dd9e3ee-deec-471f-97e3-5a28ecafae13.australia-southeast1-0.gcp.cloud.qdrant.io:6333";
  
  console.log("Fetching URL 1...");
  try {
    const res1 = await fetch(url1);
    console.log("URL 1 success:", res1.status);
  } catch (e) {
    console.error("URL 1 error:", e.message);
  }

  console.log("Fetching URL 2...");
  try {
    const res2 = await fetch(url2);
    console.log("URL 2 success:", res2.status);
  } catch (e) {
    console.error("URL 2 error:", e.message);
  }
}
main();
