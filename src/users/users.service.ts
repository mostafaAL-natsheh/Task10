//users.service.ts
import { User } from "../shared/types";
import { GenericRepository } from "../shared/generic.repository";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";

class UsersService extends GenericRepository<User> {
  createCoach(data: Partial<User>) {
    const now = new Date();
    const user: User = {
      id: uuid(),
      name: data.name!,
      email: data.email!,
      password: bcrypt.hashSync(data.password!, 10),
      role: "COACH",
      createdAt: now,
      updatedAt: now,
    };
    return this.create(user);
  }
}

export default new UsersService();