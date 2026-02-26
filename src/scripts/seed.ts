import { PrismaClient } from "../generated/prisma/client";
import { Role } from "../generated/prisma/enums";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Create church first
const church = await prisma.church.create({
  data: {
    name: "Main Church",
    address: "123 Church Street",
  },
});

  // 2️⃣ Hash password
  const passwordHash = await bcrypt.hash("admin123", 10);

  // 3️⃣ Create admin user linked to church
  const admin = await prisma.user.upsert({
    where: { email: "admin@church.com" },
    update: {},
    create: {
      email: "admin@church.com",
      password: passwordHash,
      role: Role.SUPER_ADMIN,
      church: {
        connect: { id: church.id },
      },
    },
  });

  console.log("✅ Admin user created:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
