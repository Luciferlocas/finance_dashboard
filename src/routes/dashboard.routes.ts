import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
import { authenticate } from "../middleware";

const router = Router();

router.use(authenticate);

router.get("/", DashboardController.getDashboardData);

export default router;
