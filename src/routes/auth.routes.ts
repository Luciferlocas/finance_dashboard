import { Router } from "express";
import { AuthController } from "../controllers/auth.contoller";
import { authenticate, authorize } from "../middleware";

const router = Router();

router.post("/login", AuthController.login);
router.get(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  AuthController.getAllUsers
);
router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  AuthController.register
);
router.put(
  "/role",
  authenticate,
  authorize(["ADMIN"]),
  AuthController.updateRole
);
router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  AuthController.removeUser
);
router.put(
  "/status",
  authenticate,
  authorize(["ADMIN"]),
  AuthController.updateStatus
);

export default router;
