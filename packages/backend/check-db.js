const { Client } = require('pg');

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  
  await client.connect();
  
  try {
    const res = await client.query('SELECT * FROM "Subscription"');
    console.log("Subscriptions:", res.rows);
    const users = await client.query('SELECT * FROM "User"');
    console.log("Users:", users.rows);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

main();
