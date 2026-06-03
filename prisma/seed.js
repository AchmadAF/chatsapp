const { PrismaClient, UserRole } = require("../app/generated/prisma");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@chatsapp.local" },
    update: {},
    create: {
      email: "admin@chatsapp.local",
      name: "Admin",
      passwordHash: await hash("admin123", 10),
      role: UserRole.admin,
    },
  });

  await prisma.user.upsert({
    where: { email: "cs@chatsapp.local" },
    update: {},
    create: {
      email: "cs@chatsapp.local",
      name: "Customer Service",
      passwordHash: await hash("cs123456", 10),
      role: UserRole.cs,
    },
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
