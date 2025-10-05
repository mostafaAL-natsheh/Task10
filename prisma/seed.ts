import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

async function main() {
  const hashed = bcrypt.hashSync("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@no.com" },
    update: {},
    create: {
      id: uuid(),
      name: "Admin",
      email: "admin@no.com",
      password: hashed,
      role: "ADMIN",
    },
  });

  await prisma.course.upsert({
    where: { id: "course-sample-1" },
    update: {},
    create: {
      id: "course-sample-1",
      title: "Intro to Task8",
      description: "Sample seeded course",
      image: null,
      creatorId: admin.id,
    },
  });

  console.log("Seed finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
