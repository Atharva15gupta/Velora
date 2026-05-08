import { prisma } from "./src";

async function main() {
  try {
    const userId = "test-user-id";
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: "ACTIVE",
        endsAt: { gt: new Date() },
      },
    });
    console.log(subscription);
  } catch (e) {
    console.error("ERROR CAUGHT:");
    console.error(e);
  }
}

main();
