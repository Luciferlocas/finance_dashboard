import { Router } from "express";
import authRoutes from "./auth.routes";
import recordRoutes from "./record.routes";
import dashboardRoutes from "./dashboard.routes";

const router = Router();

router.use("/user", authRoutes);
router.use("/records", recordRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
