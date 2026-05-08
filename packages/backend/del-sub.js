const { Client } = require('pg');

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  
  await client.connect();
  
  try {
    await client.query(`DELETE FROM "Subscription"`);
    console.log("Successfully deleted subscriptions!");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

main();
