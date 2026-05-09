async function main() {
  try {
    await fetch("http://localhost:6333");
  } catch (e) {
    console.log("Error message:", e.message);
  }
}
main();
