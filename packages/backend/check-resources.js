const { prisma } = require("@workspace/db");

async function main() {
  const workspaceId = "7fc6ab56-070e-43e4-bcae-91442bb3d9a7";
  try {
    const resources = await prisma.resource.findMany({
      where: { workspaceId }
    });
    console.log("Resources:", resources);
  } catch (e) {
    console.error("Failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
