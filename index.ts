import { userAgent } from 'next/server'
import { prisma } from './lib/prisma'

async function main() {
  // ... you will write your Prisma ORM queries here
  const user = await prisma.product.create({
    data: {
      name: 'Alice',
      description: "vjb",
      price: 55,
      stock: 68
    },
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })