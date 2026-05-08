const { createClerkClient } = require('@clerk/clerk-sdk-node');
const { Client } = require('pg');

async function main() {
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  
  await client.connect();
  
  try {
    const users = await clerk.users.getUserList();
    for (const user of users.data) {
      const email = user.emailAddresses[0]?.emailAddress || '';
      console.log('Syncing user:', user.id, email);
      
      await client.query(`
        INSERT INTO "User" (id, "firstName", "lastName", email)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING
      `, [user.id, user.firstName || '', user.lastName || '', email]);
    }
    console.log("Successfully synced users from Clerk to DB!");
  } catch (err) {
    console.error("Error syncing users:", err);
  } finally {
    await client.end();
  }
}

main();
