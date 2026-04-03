import { Router } from "express";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/user", authRoutes);

export default router;
