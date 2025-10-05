import { Router } from "express";
import { authenticateToken } from "../shared/middlewares";
const router = Router();

router.get("/", authenticateToken, (req, res) => res.json({ message: "Users list endpoint (implement as needed)" }));

export default router;
