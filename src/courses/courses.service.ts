import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

class CoursesService {
  async createCourse(data: { title: string; description: string; image?: string }, creatorId: string) {
    const course = await prisma.course.create({
      data: { id: uuid(), title: data.title, description: data.description, image: data.image || null, creatorId },
    });
    return course;
  }

  async findAll() {
    return prisma.course.findMany({ include: { creator: { select: { id: true, name: true, email: true } } } });
  }

  async findById(id: string) {
    return prisma.course.findUnique({ where: { id }, include: { creator: { select: { id: true, name: true } } } });
  }

  async update(id: string, data: Partial<{ title: string; description: string; image?: string }>) {
    return prisma.course.update({ where: { id }, data });
  }

  async delete(id: string) {
    await prisma.course.delete({ where: { id } });
    return true;
  }
}

export default new CoursesService();
