import { Router } from "express";
import { AuthController } from "../controllers/auth.contoller";
import { authenticate, authorize } from "../middleware";

const router = Router();

router.post("/login", AuthController.login);
router.get("/", AuthController.getAllUsers);
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  AuthController.register
);
router.put(
  "/role",
  authenticate,
  authorize(["admin"]),
  AuthController.updateRole
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  AuthController.removeUser
);

export default router;
