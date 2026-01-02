import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "iPhone 15",
        description: "Apple smartphone",
        price: 79999,
        stock: 10,
        imageUrl: "",
      },
      {
        name: "MacBook Air M3",
        description: "Apple laptop",
        price: 124999,
        stock: 5,
        imageUrl: "",
      },
    ],
  });
}

main()
  .then(async () => {
    console.log("🌱 Seed data inserted");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
