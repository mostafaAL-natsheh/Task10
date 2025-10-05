import { Router } from "express";
import { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } from "./courses.controller";
import { authenticateToken, authorizeRoles } from "../shared/middlewares";

const router = Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", authenticateToken, authorizeRoles("ADMIN", "COACH"), createCourse);
router.put("/:id", authenticateToken, authorizeRoles("ADMIN", "COACH"), updateCourse);
router.delete("/:id", authenticateToken, authorizeRoles("ADMIN", "COACH"), deleteCourse);

export default router;
