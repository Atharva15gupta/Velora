const { Client } = require('pg');

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  
  await client.connect();
  
  try {
    await client.query(`
      INSERT INTO "Subscription" (id, "userId", plan, status, "startedAt", "endsAt", "updatedAt")
      VALUES ('sub_test_01', 'user_3DJzjNd1kplOeWYjBtiy0HJwkQa', 'PRO', 'ACTIVE', NOW(), NOW() + interval '1 year', NOW())
      ON CONFLICT ("userId") DO UPDATE SET status = 'ACTIVE';
    `);
    console.log("Successfully gave user an active subscription!");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

main();
