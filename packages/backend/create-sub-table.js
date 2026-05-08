const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  try {
    console.log("Creating SubscriptionStatus enum...");
    await client.query(`
      DO $$ BEGIN
          CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'PAST_DUE', 'CANCELLED');
      EXCEPTION
          WHEN duplicate_object THEN null;
      END $$;
    `);

    console.log("Creating Subscription table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Subscription" (
          "id" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "plan" "WorkspacePlan" NOT NULL,
          "status" "SubscriptionStatus" NOT NULL,
          "razorpaySubscriptionId" TEXT,
          "razorpayCustomerId" TEXT,
          "razorpayPlanId" TEXT,
          "startedAt" TIMESTAMP(3) NOT NULL,
          "endsAt" TIMESTAMP(3) NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL,

          CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
      );
    `);

    console.log("Creating indexes...");
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Subscription_userId_key" ON "Subscription"("userId");
    `);
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Subscription_razorpaySubscriptionId_key" ON "Subscription"("razorpaySubscriptionId");
    `);

    console.log("Creating foreign keys...");
    try {
      await client.query(`
        ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
      `);
    } catch (e) {
      if (!e.message.includes("already exists")) {
        throw e;
      }
    }

    console.log("Success!");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

main();
