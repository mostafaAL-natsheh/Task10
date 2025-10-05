import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "JWT_SECRET_KEY";

class AuthService {
  async register(data: { name: string; email: string; password: string }) {
    const hashed = bcrypt.hashSync(data.password, 10);
    const user = await prisma.user.create({
      data: {
        id: uuid(),
        name: data.name,
        email: data.email,
        password: hashed,
        role: "STUDENT",
      },
      select: {
        password: false,
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");
    if (!bcrypt.compareSync(password, user.password)) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, SECRET, {
      expiresIn: "1h",
    });

    const { password: _p, ...rest } = user as any;
    return { token, user: rest };
  }
}

export default new AuthService();
