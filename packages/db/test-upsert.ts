import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.upsert({
      where: { id: 'test-id' },
      update: {
        firstName: 'test',
      },
      create: {
        id: 'test-id',
        firstName: 'test',
        lastName: 'test',
        email: 'test@example.com',
      },
    });
    console.log(user);
  } catch (e) {
    console.error(e);
  }
}

main();
