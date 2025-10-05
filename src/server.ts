import express from "express";
import cors from "cors";
import authRoutes from "./auth/auth.routes";
import courseRoutes from "./courses/courses.routes";
import userRoutes from "./users/users.routes"; // optional — create minimal users.routes or remove if not used
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/users", userRoutes); // optional

app.use((req, res) => res.status(404).json({ message: "Not Found" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
