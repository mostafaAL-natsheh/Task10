//users.controller.ts
import { Request, Response } from "express";
import usersService from "./users.service";
import { AuthRequest } from "../shared/middlewares";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().optional(),
  password: z.string().min(6).optional(),
});

export function getProfile(req: AuthRequest, res: Response) {
  res.json(req.user);
}

export function updateProfile(req: AuthRequest, res: Response) {
  try {
    const data = updateSchema.parse(req.body);
    const updated = usersService.update(req.user!.id, data);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export function createCoach(req: AuthRequest, res: Response) {
  try {
    const { name, email, password } = req.body;
    const coach = usersService.createCoach({ name, email, password });
    res.json(coach);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}