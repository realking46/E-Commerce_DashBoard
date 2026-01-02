const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function test() {
  await prisma.$connect();
  console.log("✅ Prisma connected successfully");
  await prisma.$disconnect();
}

test().catch(console.error);
