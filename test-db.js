const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function test() {
  const count = await prisma.product.count();
  console.log("Product count:", count);
}

test()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
