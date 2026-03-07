import bcryptjs from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function reset() {
  const hash = await bcryptjs.hash('admin123', 10)
  console.log('New hash:', hash)
  
  const result = await prisma.user.update({
    where: { email: 'admin@church.com' },
    data: { password: hash }
  })
  
  console.log('Updated user:', result.email)
  await prisma.$disconnect()
}

reset().catch(console.error)