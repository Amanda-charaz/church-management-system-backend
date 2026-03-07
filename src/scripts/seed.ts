import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Get or create church
  let church = await prisma.church.findFirst()
  if (!church) {
    church = await prisma.church.create({
      data: {
        name: "AFM in Zimbabwe",
        address: "Southlea Park, Harare",
      },
    })
  }

  // 2️⃣ Create users
  const adminHash = await bcrypt.hash("0000", 10)
  const pastorHash = await bcrypt.hash("pastor", 10)
  const financeHash = await bcrypt.hash("finance", 10)

  await prisma.user.upsert({
    where: { email: "admin@church.com" },
    update: { password: adminHash },
    create: {
      name: "Admin User",
      email: "admin@church.com",
      password: adminHash,
      role: Role.ADMIN,
      church: { connect: { id: church.id } },
    },
  })

  await prisma.user.upsert({
    where: { email: "pastor@church.com" },
    update: { password: pastorHash },
    create: {
      name: "Pastor",
      email: "pastor@church.com",
      password: pastorHash,
      role: Role.PASTOR,
      church: { connect: { id: church.id } },
    },
  })

  await prisma.user.upsert({
    where: { email: "finance@church.com" },
    update: { password: financeHash },
    create: {
      name: "Finance",
      email: "finance@church.com",
      password: financeHash,
      role: Role.FINANCE,
      church: { connect: { id: church.id } },
    },
  })

  console.log("✅ All users created!")
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

