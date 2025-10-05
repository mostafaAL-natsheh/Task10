export type Role = "ADMIN" | "COACH" | "STUDENT";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image?: string;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}
