import { Request, Response } from "express";
import coursesService from "./courses.service";
import { AuthRequest } from "../shared/middlewares";
import { z } from "zod";

const courseSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
});

export async function createCourse(req: AuthRequest, res: Response) {
  try {
    const data = courseSchema.parse(req.body);
    const creatorId = req.user?.id;
    if (!creatorId) return res.status(400).json({ message: "Creator ID missing" });

    const course = await coursesService.createCourse(data, creatorId);
    res.json(course);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function getAllCourses(req: Request, res: Response) {
  const courses = await coursesService.findAll();
  res.json(courses);
}

export async function getCourseById(req: Request, res: Response) {
  const course = await coursesService.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
}

export async function updateCourse(req: AuthRequest, res: Response) {
  const course = await coursesService.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  if (req.user?.role !== "ADMIN" && req.user?.id !== course.creatorId)
    return res.status(403).json({ message: "Forbidden" });

  try {
    const data = courseSchema.partial().parse(req.body);
    const updated = await coursesService.update(req.params.id, data);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteCourse(req: AuthRequest, res: Response) {
  const course = await coursesService.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  if (req.user?.role !== "ADMIN" && req.user?.id !== course.creatorId)
    return res.status(403).json({ message: "Forbidden" });

  await coursesService.delete(req.params.id);
  res.json({ message: "Deleted successfully" });
}
