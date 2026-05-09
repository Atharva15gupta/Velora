const { prisma } = require("@workspace/db");

async function main() {
  const workspaceId = "7fc6ab56-070e-43e4-bcae-91442bb3d9a7";
  try {
    const w = await prisma.workspace.findUnique({
      where: { id: workspaceId }
    });
    console.log("Workspace:", w);
  } catch (e) {
    console.error("Failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
